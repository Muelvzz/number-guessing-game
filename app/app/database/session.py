# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'C:\\Users\\JOSEPH\\OneDrive\\Desktop\\for IM project\\app\\database\\session.py'
# Bytecode version: 3.11a7e (3495)
# Source timestamp: 2026-10-11 14:54:04 UTC (1791730444)

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel
from app.config import settings

engine = create_async_engine(url=settings.DATABASE_URL, echo=True)
from .models import Game
async def create_tables():
    async with engine.begin() as connection:
        await connection.run_sync(SQLModel.metadata.create_all)
async def get_session():
    async_session = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
    async with async_session() as session:
        yield session