# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'C:\\Users\\JOSEPH\\OneDrive\\Desktop\\for IM project\\app\\api\\dependencies.py'
# Bytecode version: 3.11a7e (3495)
# Source timestamp: 2026-10-11 15:29:19 UTC (1791732559)

from typing import Annotated
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.session import get_session
from app.service.game import GameService
from app.service.user import UserService
sessionDep = Annotated[AsyncSession, Depends(get_session)]
def get_game_service(session: sessionDep):
    return GameService(session)
def get_user_service(session: sessionDep):
    return UserService(session)
userDep = Annotated[UserService, Depends(get_user_service)]
gameDep = Annotated[GameService, Depends(get_game_service)]