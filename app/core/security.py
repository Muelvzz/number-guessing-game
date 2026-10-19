# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'C:\\Users\\JOSEPH\\OneDrive\\Desktop\\for IM project\\app\\core\\security.py'
# Bytecode version: 3.11a7e (3495)
# Source timestamp: 2026-10-11 15:36:16 UTC (1791732976)

from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from api.schemas.token import TokenData
from config import security_setting

oa2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login")


def verify_access_token(token: str, credential_exp):
    try:
        payload = jwt.decode(
            token,
            key=security_setting.JWT_SECRET,
            algorithms=[security_setting.JWT_ALGORITHM],
        )

        user: str = payload.get("user", {}).get("name")

        if user is None:
            raise credential_exp

        token_data = TokenData(id=user)
    except JWTError:
        raise credential_exp

    return token_data


def get_current_user(token: str = Depends(oa2_scheme)):
    credential_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Access code is invalid",
        headers={"WWW-Authenticate": "Bearer"},
    )

    return verify_access_token(token, credential_exception)
