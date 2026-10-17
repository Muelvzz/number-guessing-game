# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'C:\\Users\\JOSEPH\\OneDrive\\Desktop\\for IM project\\app\\database\\models.py'
# Bytecode version: 3.11a7e (3495)
# Source timestamp: 2026-10-11 15:04:31 UTC (1791731071)

from datetime import datetime
from enum import Enum

from pydantic import EmailStr
from sqlmodel import Field, SQLModel


class Difficulty(str, Enum):
    easy = "easy"
    medium = "medium"
    hard = "hard"


class Game(SQLModel, table=True):
    game_id: int = Field(default=None, primary_key=True)
    is_complete: bool
    num_attempts: int
    difficulty: Difficulty
    date_played: datetime


class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    username: str
    email: EmailStr
    password_hash: str
