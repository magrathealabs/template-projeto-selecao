import requests
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.models.database import get_db
from core.models.table import RepoDB, AuthDB
from core.routers.logic.auth_logic import _get_user_auth_id
from core.routers.logic.repository_logic import _verify_starred_repo
from core.routers.logic.tag_logic import _get_all_tags_in_repo
from core.authentication.authentication import required_auth

router = APIRouter(prefix="/repos")


@router.get(
    "/",
    name="Search Starred Repositories",
    description="""Search the github api for all
    starred repositories for the specified user""",
    responses={
        200: {
        }
    }
)
async def refresh_repos(db: Session = Depends(get_db),
                        token: dict = Depends(required_auth)):
    user_id = _get_user_auth_id(token=token, db=db)
    user_db = db.query(AuthDB).filter(
        AuthDB.id == user_id).first()
    repos = _verify_starred_repo(
        db=db, user_name=user_db.github_nickname,
        user_id=user_id)
    return repos
