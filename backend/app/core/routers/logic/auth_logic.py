""" User Logics

    Returns:
        function: _get_user_auth_id, _get_auth, _create_auth
"""
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from core.models.table import AuthDB, TagDB, RepoDB, TagInRepoDB
from core.models.schema import AuthCreate
from core.models.database import get_db
from core.routers.logic.tag_logic import _get_all_tags


def _get_user_auth_id(token: dict, db: Session):
    """ Function to get user by token
    Args:
        token (json): body with user info came from token.
    Raises:
        HTTPException: 404, When user not exists.
    Returns:
        (dict): Return user auth0 id
    """
    auth0_id = token['sub']
    user_db = db.query(AuthDB).filter(
        AuthDB.auth0_unique_id == auth0_id).first()

    if not user_db:
        raise HTTPException(
            status_code=404, detail="User not registered")

    return user_db.id


def _get_user_auth0_id(token):
    """ Function to get user by token
    Args:
        token (json): body with user info came from token.
    Raises:
        HTTPException: 404, When user not exists.
    Returns:
        (dict): Return user auth0 id
    """
    auth0_id = token['sub']

    return auth0_id


def _get_auth(db: Session, auth0_unique_id: str):
    """ Searching for the unique id of auth0 returns
     the user information in the database.

    Args:
        db (Session): sqlAlchemy connection object
        auth0_unique_id (str): auth0 id

    Returns:
       sql_object : User data saved to bd
    """
    response = db.query(AuthDB).filter(
        AuthDB.auth0_unique_id == auth0_unique_id).first()
    return db.query(AuthDB).filter(
        AuthDB.auth0_unique_id == auth0_unique_id).first()


def _create_auth(db: Session, auth: AuthCreate):
    """ If the user is not registered in the system,
     perform the operation.

    Args:
        db (Session): sqlAlchemy connection object
        auth (AuthCreate): Schema for creating a new user

    Returns:
        sql_object : User data saved to bd
    """
    db_auth = AuthDB(auth0_unique_id=auth.auth0_unique_id,
                     github_nickname=auth.github_nickname)
    db.add(db_auth)
    db.commit()
    db.refresh(db_auth)
    return db_auth


def _remove_auth(auth0_unique_id: str, db: Session):
    """ Remove a user registered in the database
    and all repositories, tags and database relationships.

    Args:
        db (Session): sqlAlchemy connection object
        auth0_unique_id (str): auth0 id
    Raises:
        HTTPException: 404, Auth not found

    Returns:
        sql_object : Removed user data on DB
    """
    auth_db = _get_auth(db=db, auth0_unique_id=auth0_unique_id)
    if not auth_db:
        raise HTTPException(
            status_code=404, detail="Auth not found")

    user_id = auth_db.id

    tag_db = db.query(TagDB).filter(TagDB.auth_id == user_id).all()
    repo_db = db.query(RepoDB).filter(
        RepoDB.auth_id == user_id).all()

    for repo in repo_db:
        tags_in_repo_db = db.query(TagInRepoDB).filter(
            TagInRepoDB.repo_id == repo.id).all()
        for tag_in_repo in tags_in_repo_db:
            db.query(TagInRepoDB).filter(
                TagInRepoDB.id == tag_in_repo.id).delete()

        db.query(RepoDB).filter(
            RepoDB.id == repo.id).delete()

    for tag in tag_db:
        db.query(TagDB).filter(TagDB.id == tag.id).delete()

    db.delete(auth_db)
    db.commit()

    return auth_db
