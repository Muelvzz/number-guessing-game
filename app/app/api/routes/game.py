# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'C:\\Users\\JOSEPH\\OneDrive\\Desktop\\for IM project\\app\\api\\routes\\game.py'
# Bytecode version: 3.11a7e (3495)
# Source timestamp: 2026-10-11 14:51:35 UTC (1791730295)

from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.schemas.game import GameCreate, GameRead, GameUpd
from app.api.dependencies import gameDep
from app.core.security import get_current_user

router = APIRouter(prefix="/game", tags=["Game"])


@router.get("/all", response_model=list[GameRead])
async def get_all_game(service: gameDep, limit: int = 10, skip: int = 0):
    game = await service.get_all(limit, skip)

    return game

@router.get("/", response_model=GameRead)
async def get_game(id: int, service: gameDep):
    game = await service.get(id)
    if game is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="That game does not exist"
        )
    else:
        return game


@router.post("/", response_model=None)
async def create_game(game: GameCreate, service: gameDep):
    return await service.add(game)


@router.patch("/", response_model=GameRead)
async def update_game(id: int, game_update: GameUpd, service: gameDep):
    update = game_update.model_dump(exclude_none=True)
    if not update:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No values provided for difficulty, is complete, or number of attempts",
        )
    else:
        game = await service.update(id, update)
        return game


@router.delete("/")
async def delete_game(id: int, service: gameDep):
    await service.delete(id)
    return {"detail": f"The game with id = {id} has been deleted"}
