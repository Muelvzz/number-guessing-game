# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'C:\\Users\\JOSEPH\\OneDrive\\Desktop\\for IM project\\app\\service\\user.py'
# Bytecode version: 3.11a7e (3495)
# Source timestamp: 2026-10-11 15:50:23 UTC (1791733823)

from datetime import date, datetime, timedelta, timezone, UTC
from typing import Any

import jwt
from fastapi import HTTPException, status
from pwdlib import PasswordHash
from sqlalchemy import delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import or_, select

from app.api.schemas.user import UserCreate

from app.config import security_setting
from app.core.security import hash_access_token
from app.database.models import RevokedToken, User

pass_context = PasswordHash.recommended()


class UserService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def add(self, credentials: UserCreate) -> User:
        result = await self.session.execute(select(User).where(or_(User.email == credentials.email, User.username == credentials.username)))
        already_user = result.scalar()

        if already_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="That email or username already has an account.")

        
        else:

            user = User(
                **credentials.model_dump(exclude=["password"]),
                created_at=date.today(),
                password_hash=pass_context.hash(credentials.password),
            )
            self.session.add(user)
            await self.session.commit()
            await self.session.refresh(user)
            return user

    async def login(self, email, password) -> Any:
        result = await self.session.execute(select(User).where(User.email == email))
        user = result.scalar()
        if user is None or not pass_context.verify(password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="That email or password is incorrect",
            )
        else:
            token = jwt.encode(
                payload={
                    "user": {"name": user.username, "email": user.email},
                    "exp": datetime.now(timezone.utc) + timedelta(days=1),
                },
                algorithm=security_setting.JWT_ALGORITHM,
                key=security_setting.JWT_SECRET,
            )
            return token, str(user.id)

    async def logout(self, token: str) -> None:
        try:
            payload = jwt.decode(
                token,
                key=security_setting.JWT_SECRET,
                algorithms=[security_setting.JWT_ALGORITHM],
            )
        except jwt.InvalidTokenError as exc:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Access token is invalid",
                headers={"WWW-Authenticate": "Bearer"},
            ) from exc

        expiration = payload.get("exp")
        if expiration is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Access token is invalid",
                headers={"WWW-Authenticate": "Bearer"},
            )

        expires_at = datetime.fromtimestamp(expiration, UTC)
        token_hash = hash_access_token(token)
        await self.session.execute(
            delete(RevokedToken).where(
                RevokedToken.expires_at <= datetime.now(UTC)
            )
        )
        revoked_token = await self.session.execute(
            select(RevokedToken.token_hash).where(
                RevokedToken.token_hash == token_hash
            )
        )
        if revoked_token.scalar_one_or_none() is None:
            self.session.add(
                RevokedToken(token_hash=token_hash, expires_at=expires_at)
            )
        await self.session.commit()

    async def get_user(self, id: int):
        result = await self.session.execute(select(User.username, User.email).where(User.id == id))
        user = result.mappings().all()

        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="That id is not available in the database")
        else:
            return user
