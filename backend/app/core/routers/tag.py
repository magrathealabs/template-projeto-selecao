from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.models.schema import Tag, TagCreateRequest
from core.models.schema import TagInRepo, TagInRepoCreate
from core.models.database import get_db
from core.routers.logic.tag_logic import (_add_tag_in_repo, _create_tag,
                                          _get_all_tags,
                                          _get_tag_by_name,
                                          _get_tag_in_repo,
                                          _remove_tag_in_repo)
from core.routers.logic.auth_logic import _get_user_auth_id
from core.authentication.authentication import required_auth


router = APIRouter(prefix="/tags")


@ router.post("/",
              name="Create a new tag",
              description="""Checks that there is no tag
              with the same name and then adds it to the system""",
              response_model=Tag)
async def create_tag(tag: TagCreateRequest,
                     db: Session = Depends(get_db),
                     token: dict = Depends(required_auth)):
    user_id = _get_user_auth_id(db=db, token=token)
    db_tag = _get_tag_by_name(db=db, tag_name=tag.name, auth_id=user_id)
    if db_tag:
        raise HTTPException(
            status_code=400, detail="Tag already registered")
    return _create_tag(db=db, tag_name=tag.name, user_id=user_id)


@ router.get("/",
             name="Get all user tags",
             description="""Finds all tags linked to the user""",
             responses={
                 200: {
                 }
             })
async def get_all_tags(db: Session = Depends(get_db),
                       token: dict = Depends(required_auth)):
    user_id = _get_user_auth_id(db=db, token=token)
    db_tag = _get_all_tags(db=db, auth_id=user_id)
    return db_tag


@ router.post("/repo",
              name="Adds a tag to a repository",
              description="""Associates a tag in a repository""",
              response_model=TagInRepo)
async def add_tag_in_repo(tag_in_repo: TagInRepoCreate,
                          db: Session = Depends(get_db),
                          token: dict = Depends(required_auth)):
    return _add_tag_in_repo(tag_in_repo=tag_in_repo,
                            db=db)


@ router.delete("/repo/{repo_id}/{tag_id}",
                name="Removes a tag from a repository",
                description="""Deletes a tag associated with a repository""",
                response_model=TagInRepo)
async def remove_tag_in_repo(repo_id: int,
                             tag_id: int,
                             db: Session = Depends(get_db),
                             token: dict = Depends(required_auth)):

    db_tag_in_repo = _get_tag_in_repo(tag_id=tag_id,
                                      repo_id=repo_id,
                                      db=db)
    if not db_tag_in_repo:
        raise HTTPException(
            status_code=404, detail="Tag not is associated")

    _remove_tag_in_repo(tag_in_repo_id=db_tag_in_repo.id, db=db)
    return db_tag_in_repo
