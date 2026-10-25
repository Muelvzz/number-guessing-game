# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'C:\\Users\\JOSEPH\\OneDrive\\Desktop\\for IM project\\app\\service\\game.py'
# Bytecode version: 3.11a7e (3495)
# Source timestamp: 2026-10-11 14:51:38 UTC (1791730298)

from datetime import datetime, timezone

from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.api.schemas.game import GameCreate
from app.database.models import Game, User



class GameService:
    def __init__(self, session: AsyncSession, curr_user: int):
        self.session = session
        self.curr_user = curr_user

    async def get_all(self, limit, skip) -> Game: 
        result = await self.session.execute(select(Game).limit(limit).offset(skip))
        game = result.scalars().all()
        return game

    async def get(self, id: int) -> Game:
        return await self.session.get(Game, id)

    async def add(self, create_game: GameCreate) -> Game:


        new_game = Game(
            **create_game.model_dump(), date_played=datetime.now(timezone.utc),
            owner_id=self.curr_user.id
        )
        self.session.add(new_game)
        await self.session.commit()
        await self.session.refresh(new_game)
        return new_game

    async def update(self, id: int, game_update: dict) -> Game:
        game = await self.get(id)
        if game.owner_id == self.curr_user.id:
            game.sqlmodel_update(game_update)
            self.session.add(game)
            await self.session.commit()
            await self.session.refresh(game)
            return game
        else:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed to delete another user's game data.")
        

    async def delete(self, id: int) -> None:
        get_user = await self.get(id)
        if get_user.owner_id == self.curr_user.id:
            await self.session.delete(get_user)
            await self.session.commit()
        else:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed to delete another user's game data.")
