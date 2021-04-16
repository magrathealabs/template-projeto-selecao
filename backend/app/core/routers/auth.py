""" WIP
    For the authentication system I will use Auth0.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.models.database import get_db
from core.models.schema import Auth, AuthCreate, AuthCreateRequest
from core.authentication.authentication import required_auth
from core.routers.logic.auth_logic import (_get_auth,
                                           _create_auth,
                                           _get_user_auth0_id, _remove_auth)


router = APIRouter(prefix="/auth")


@router.post("/",
             name="Create a new user",
             description="""Binds the user with auth0 registration
             in the system""",
             response_model=Auth)
async def create_auth(auth_request: AuthCreateRequest,
                      db: Session = Depends(get_db),
                      token: dict = Depends(required_auth)):
    auth0_unique_id = _get_user_auth0_id(token)
    db_auth = _get_auth(db=db, auth0_unique_id=auth0_unique_id)
    if db_auth:
        raise HTTPException(
            status_code=400, detail="auth_unique_id already registered")
    auth = AuthCreate(github_nickname=auth_request.github_nickname,
                      auth0_unique_id=auth0_unique_id)
    return _create_auth(db=db, auth=auth)


@ router.delete("/",
                name="Removes a user from database",
                description="""Removes a user from database""",
                response_model=Auth)
async def remove_user(token: dict = Depends(required_auth),
                      db: Session = Depends(get_db)):

    auth0_unique_id = _get_user_auth0_id(token)
    db_auth = _remove_auth(auth0_unique_id=auth0_unique_id, db=db)
    return db_auth


@ router.get("/",
             name="Get user",
             description="""Finds user in db if exist""",
             responses={
                 200: {
                 }
             })
async def get_user(db: Session = Depends(get_db),
                   token: dict = Depends(required_auth)):
    auth0_unique_id = _get_user_auth0_id(token=token)
    user_db = _get_auth(db=db, auth0_unique_id=auth0_unique_id)
    if not user_db:
        raise HTTPException(
            status_code=404, detail="User not found")
    return user_db
