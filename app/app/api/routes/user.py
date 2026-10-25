# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'C:\\Users\\JOSEPH\\OneDrive\\Desktop\\for IM project\\app\\api\\routes\\user.py'
# Bytecode version: 3.11a7e (3495)
# Source timestamp: 2026-10-11 15:49:19 UTC (1791733759)

from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from app.api.schemas.user import UserCreate, UserRead
from app.api.schemas.token import TokenData
from app.core.security import get_current_user
from app.api.dependencies import userDep

router = APIRouter(prefix="/user", tags=["User"])


@router.post("/signup", response_model=UserRead)
async def create_account(user: UserCreate, service: userDep):
    return await service.add(user)


@router.post("/login")
async def login_user(
    request_form: Annotated[OAuth2PasswordRequestForm, Depends()], service: userDep
):
    token = await service.login(request_form.username, request_form.password)
    return {"access_token": token, "token_type": "bearer"}

@router.get("/dashboard")
async def get_dashboard(current_user: Annotated[TokenData, Depends(get_current_user)]):
    return {"username": current_user.id}

@router.get("/{id}")
async def get_account(id: int, service: userDep):
    return await service.get_user(id)
