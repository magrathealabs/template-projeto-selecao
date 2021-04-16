from sqlalchemy import Column, Integer, ForeignKey, String, Boolean
from .database import Base


class AuthDB(Base):
    __tablename__ = "auth"

    id = Column(Integer, primary_key=True, index=True)
    auth0_unique_id = Column(String)
    github_nickname = Column(String)


class TagDB(Base):
    __tablename__ = "tag"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    auth_id = Column(Integer, ForeignKey("auth.id"))


class RepoDB(Base):
    __tablename__ = "repository"

    id = Column(Integer, primary_key=True, index=True)
    github_repo_id = Column(Integer)
    auth_id = Column(Integer, ForeignKey("auth.id"))
    is_starred_repo = Column(Boolean)
    name = Column(String)
    description = Column(String)
    html_url = Column(String)


class TagInRepoDB(Base):
    __tablename__ = "tag_in_repository"

    id = Column(Integer, primary_key=True, index=True)
    tag_id = Column(Integer, ForeignKey("tag.id"))
    repo_id = Column(Integer, ForeignKey("repository.id"))
