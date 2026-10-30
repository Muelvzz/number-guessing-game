# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'C:\\Users\\JOSEPH\\OneDrive\\Desktop\\for IM project\\app\\api\\schemas\\game.py'
# Bytecode version: 3.11a7e (3495)
# Source timestamp: 2026-10-11 14:43:50 UTC (1791729830)

from datetime import datetime

from pydantic import BaseModel, Field

from app.database.models import Difficulty

from .user import UserRead


class GameCreate(BaseModel):
    is_complete: bool = Field(default=False)
    num_attempts: int
    difficulty: Difficulty
    time: int = Field(gt=0)


class GameRead(GameCreate):
    date_played: datetime
    owner_id: int
    owner: UserRead


class GameUpd(BaseModel):
    is_complete: bool | None = Field(default=None)
    num_attempts: int | None = Field(default=None)
    time: int | None = Field(default=None, gt=0)
    difficulty: Difficulty | None = Field(default=None)
