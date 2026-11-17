# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'C:\\Users\\JOSEPH\\OneDrive\\Desktop\\for IM project\\app\\api\\schemas\\user.py'
# Bytecode version: 3.11a7e (3495)
# Source timestamp: 2026-10-11 15:47:17 UTC (1791733637)

import re
from fastapi import HTTPException, status
from pydantic import BaseModel, EmailStr, Field, field_validator

EMAIL_REGEX = r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}"
PASSWORD_REGEX = r"^(?=.*[0-9])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$"

class UserBase(BaseModel):
    username: str = Field()
    email: EmailStr

    @field_validator("email", mode="before")
    @classmethod
    def reject_blank_whitespace_and_na(cls, value: object) -> object:
        if isinstance(value, str):
            if not value.strip() or any(character.isspace() for character in value):
                raise ValueError("must not be empty or contain whitespace")
            if value.casefold() == "n/a":
                raise ValueError("must not be 'N/A'")
        return value


class UserCreate(UserBase):
    password: str

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        if not value and not value.strip():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email has no value.")

        lowercase_email: str = str.lower(value).strip()

        if not re.fullmatch(EMAIL_REGEX, lowercase_email):
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Email does not follow a specifc format.")

        if len(lowercase_email) > 254:
            raise HTTPException(status_code=status.HTTP_413_CONTENT_TOO_LARGE, detail="Email value is too long.")

        return lowercase_email

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        stripped_password = value.strip()
        if not value and not stripped_password:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password has no value.")
        
        if len(stripped_password) < 8:
            raise HTTPException(status_code=status.HTTP_411_LENGTH_REQUIRED, detail="Password is too short.")
        
        if not re.search(PASSWORD_REGEX, stripped_password):
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Password does not follow a specifc format.")
        
        return stripped_password

    @field_validator("username")
    @classmethod
    def validate_username(cls, value: str) -> str:
        stripped_username: str = value.strip()
        if not value and not stripped_username:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username has no value.")

        if len(stripped_username) > 25:
            raise HTTPException(status_code=status.HTTP_413_CONTENT_TOO_LARGE, detail="Username is too large.")

        return stripped_username


class UserRead(UserBase):
    # return None
    pass
