from fastapi import HTTPException
from sqlalchemy.orm import Session
from core.models.table import TagDB, TagInRepoDB, RepoDB
from core.models.schema import TagCreate
from core.models.schema import TagInRepoCreate


def _create_tag(db: Session, tag_name: str, user_id: int):
    """ Creates a new tag in the database

    Args:
        db (Session): sqlAlchemy connection object
        tag (TagCreate): Schema for creating a tag in database

    Raises:
        HTTPException: 422, Tag name cannot be empty

    Returns:
        sql_object : Tag data
    """
    if tag_name.strip() == "":
        raise HTTPException(
            status_code=422, detail="Tag name cannot be empty")

    db_tag = TagDB(name=tag_name, auth_id=user_id)
    db.add(db_tag)
    db.commit()
    db.refresh(db_tag)
    return db_tag


def _get_tag_by_name(tag_name: str, auth_id: int, db: Session):
    """ Returns tag data by passing the tag name

    Args:
        tag_name (str): Tag Name
        auth_id (int): User Id
        db (Session): sqlAlchemy connection object

    Returns:
        sql_object : Tag data
    """
    return db.query(TagDB).filter(TagDB.name == tag_name,
                                  TagDB.auth_id == auth_id).first()


def _get_tag_by_id(tag_id: int, db: Session):
    """ Returns tag data by passing the tag id

    Args:
        tag_id (int): Tag id
        db (Session): sqlAlchemy connection object

    Returns:
        sql_object : Tag data
    """
    return db.query(TagDB).filter(TagDB.id == tag_id).first()


def _get_all_tags(db: Session, auth_id: int):
    """ Returns data for all tags

    Args:
        db (Session): sqlAlchemy connection object
        auth_id (int): User id

    Returns:
        sql_object : All tags data
    """
    return db.query(TagDB).filter(auth_id == auth_id).all()


def _add_tag_in_repo(tag_in_repo: TagInRepoCreate, db: Session):
    """ Adds a tag's link to a repository

    Args:
        tag_in_repo (TagInRepoCreate): Schema for creating a relationship
         between a tag and a repository
        db (Session): sqlAlchemy connection object

    Returns:
        sql_object: Tag associated with the repository
    """
    db_tag_in_repo = _get_tag_in_repo(repo_id=tag_in_repo.repo_id,
                                      tag_id=tag_in_repo.tag_id,
                                      db=db)
    if db_tag_in_repo:
        raise HTTPException(
            status_code=400, detail="Tag is already associated")

    db_tag_in_repo = TagInRepoDB(repo_id=tag_in_repo.repo_id,
                                 tag_id=tag_in_repo.tag_id)
    db.add(db_tag_in_repo)
    db.commit()
    db.refresh(db_tag_in_repo)
    return db_tag_in_repo


def _get_tag_in_repo(repo_id: int, tag_id: int, db: Session):
    """ Returns a tag's link data to a repository

    Args:
        repo_id (int): Repository ID
        tag_id (int): Tag ID
        db (Session): sqlAlchemy connection object

    Returns:
        sql_object: Tag associated with the repository

    Raises:
        HTTPException: 404, Tag not found
        HTTPException: 404, Repository not found

    Returns:
        sql_object: Tag associated with the repository
    """
    tag_in_repo_db = db.query(TagInRepoDB).filter(
        TagInRepoDB.repo_id == repo_id,
        TagInRepoDB.tag_id == tag_id).first()

    user_has_the_tag = db.query(TagDB).filter(
        TagDB.id == tag_id).first()
    user_has_the_repo = db.query(RepoDB).filter(
        RepoDB.id == repo_id).first()

    if not user_has_the_tag:
        raise HTTPException(
            status_code=404, detail="Tag not found")
    elif not user_has_the_repo:
        raise HTTPException(
            status_code=404, detail="Repository not found"
        )
    else:
        return tag_in_repo_db


def _get_all_tags_in_repo(repo_id: int, db: Session):
    """ Returns data for all tag's link data to a repository

    Args:
        repo_id (int): Repository ID
        db (Session): sqlAlchemy connection object

    Returns:
        sql_object: All tag relationships associated with the repository
    """
    tags_in_repo = db.query(TagInRepoDB).filter(
        TagInRepoDB.repo_id == repo_id).all()
    tags = []
    for tag in tags_in_repo:
        tag_data = _get_tag_by_id(
            tag_id=tag.tag_id, db=db)
        tag_info = {
            "id": tag_data.id,
            "name": tag_data.name
        }
        tags.append(tag_info)
    return tags


def _remove_tag_in_repo(tag_in_repo_id: int, db: Session):
    """ Removes a tag's link to a repository

    Args:
        tag_in_repo_id (int): Relationship id between a tag and a repository
        db (Session): sqlAlchemy connection object
    """
    db_tag_in_repo = db.query(TagInRepoDB).filter(
        TagInRepoDB.id == tag_in_repo_id).first()
    db.delete(db_tag_in_repo)
    db.commit()
