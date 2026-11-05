# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'C:\\Users\\JOSEPH\\OneDrive\\Desktop\\for IM project\\app\\api\\routes\\user.py'
# Bytecode version: 3.11a7e (3495)
# Source timestamp: 2026-10-11 15:49:19 UTC (1791733759)

from typing import Annotated

<<<<<<< HEAD
from fastapi import APIRouter, Depends, Response, status
=======
from fastapi import APIRouter, Depends
>>>>>>> backend
from fastapi.security import OAuth2PasswordRequestForm

from ..schemas.token import Token

from app.api.schemas.user import UserCreate, UserRead
from app.core.security import get_current_user, oa2_scheme
from app.database.models import User
from app.api.dependencies import userDep

router = APIRouter(prefix="/user", tags=["User"])


@router.post("/signup", response_model=UserRead)
async def create_account(user: UserCreate, service: userDep):
    return await service.add(user)


@router.post("/login", response_model=None)
async def login_user(
    request_form: Annotated[OAuth2PasswordRequestForm, Depends()], service: userDep
):
    token, user = await service.login(request_form.username, request_form.password)
    return {"access_token": token, "token_type": "bearer", "id": user}

@router.post("/logout")
async def logout_user(
    token: Annotated[str, Depends(oa2_scheme)], service: userDep
):
    await service.logout(token)
    return {"detail": "Successfully logged out"}

@router.get("/dashboard")
async def get_dashboard(
    token: Annotated[str, Depends(oa2_scheme)],
    _current_user: Annotated[User, Depends(get_current_user)],
):
    return {"token": token}

@router.get("/{id}")
async def get_account(id: int, service: userDep):
    return await service.get_user(id)
