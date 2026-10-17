# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'C:\\Users\\JOSEPH\\OneDrive\\Desktop\\for IM project\\app\\main.py'
# Bytecode version: 3.11a7e (3495)
# Source timestamp: 2026-10-11 13:36:24 UTC (1791725784)


import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from scalar_fastapi import get_scalar_api_reference

from app.database.session import create_tables

from .api.router import master_router


origins: list[str] = ["http://localhost:5173", os.getenv("CLIENT_URL")]


@asynccontextmanager
async def lifespan_handler(app: FastAPI):
    await create_tables()
    yield


app = FastAPI(lifespan=lifespan_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(master_router)


@app.get("/scalar", include_in_schema=False)
def get_scalar_docs():
    return get_scalar_api_reference(openapi_url=app.openapi_url, title="Scalar API")
