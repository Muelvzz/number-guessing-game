# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'C:\\Users\\JOSEPH\\OneDrive\\Desktop\\for IM project\\app\\service\\user.py'
# Bytecode version: 3.11a7e (3495)
# Source timestamp: 2026-10-11 15:50:23 UTC (1791733823)

from datetime import date, datetime, timedelta, timezone

import jwt
from fastapi import HTTPException, status
from pwdlib import PasswordHash
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.api.schemas.user import UserCreate

from app.config import security_setting
from app.database.models import User

pass_context = PasswordHash.recommended()


class UserService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def add(self, credentials: UserCreate) -> User:
        result = await self.session.execute(select(User).where(User.email == credentials.email))
        already_user = result.scalar()

        if already_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="That email already has an account.")
        
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

    async def login(self, email, password) -> str:
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
            return token

    async def get_user(self, id: int):
        result = await self.session.execute(select(User.username, User.email).where(User.id == id))
        user = result.mappings().all()

        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="That id is not available in the database")
        else:
            return user

