# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'C:\\Users\\JOSEPH\\OneDrive\\Desktop\\for IM project\\app\\api\\schemas\\user.py'
# Bytecode version: 3.11a7e (3495)
# Source timestamp: 2026-10-11 15:47:17 UTC (1791733637)

from datetime import date, datetime

from pydantic import BaseModel, EmailStr, Field, field_validator


class UserBase(BaseModel):
    username: str = Field()
    email: EmailStr

    @field_validator("username", "email", mode="before")
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

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("password must not contain only whitespace")
        if len(value) < 8:
            raise ValueError("password must be at least 8 characters long")
        return value


class UserRead(UserBase):
    # return None
    pass
