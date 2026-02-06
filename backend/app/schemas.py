from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class UserBase(BaseModel):
    username: str
    role: Optional[int] = None
    date_of_birth: Optional[date] = None
    height: Optional[int] = None
    weight: Optional[int] = None
    entrance_date: Optional[date] = None
    do_have_chronic_medications: Optional[bool] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    role: Optional[int] = None
    date_of_birth: Optional[date] = None
    height: Optional[int] = None
    weight: Optional[int] = None
    entrance_date: Optional[date] = None
    do_have_chronic_medications: Optional[bool] = None
    password: Optional[str] = None

class UserResponse(UserBase):
    id: int
    game_currency: int
    height: Optional[int] = None
    weight: Optional[int] = None
    role: Optional[int] = None
    entrance_date: Optional[date] = None
    do_have_chronic_medications: Optional[bool] = None
    date_of_registration: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
