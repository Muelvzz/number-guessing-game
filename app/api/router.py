# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'C:\\Users\\JOSEPH\\OneDrive\\Desktop\\for IM project\\app\\api\\router.py'
# Bytecode version: 3.11a7e (3495)
# Source timestamp: 2026-10-11 15:42:34 UTC (1791733354)

from fastapi import APIRouter

from api.routes import game, user

master_router = APIRouter()
master_router.include_router(game.router)
master_router.include_router(user.router)
