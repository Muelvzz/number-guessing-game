# Decompiled with PyLingual (https://pylingual.io)
# Internal filename: 'C:\\Users\\JOSEPH\\OneDrive\\Desktop\\for IM project\\app\\core\\security.py'
# Bytecode version: 3.11a7e (3495)
# Source timestamp: 2026-10-11 15:36:16 UTC (1791732976)

from fastapi.security import OAuth2PasswordBearer
oa2_scheme = OAuth2PasswordBearer(tokenUrl='/user/login')