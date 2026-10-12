# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'C:\\Users\\JOSEPH\\OneDrive\\Desktop\\for IM project\\app\\api\\schemas\\user.py'
# Bytecode version: 3.11a7e (3495)
# Source timestamp: 2026-10-11 15:47:17 UTC (1791733637)

from datetime import date, datetime
from pydantic import BaseModel, EmailStr
class UserBase(BaseModel):
    username: str
    email: EmailStr
class UserCreate(UserBase):
    password: str
class UserRead(UserBase):
    # return None
    pass