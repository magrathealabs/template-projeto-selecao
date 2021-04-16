import requests
from fastapi import HTTPException
from sqlalchemy.orm import Session
from core.models.table import RepoDB
from core.routers.logic.tag_logic import _get_all_tags_in_repo


def _request_github_api(user_name: str):
    """ Make a request to the github API searching for all
     starred repositories by passing a user name as a parameter.

    Args:
        user_name (str): Github username

    Raises:
        HTTPException: 404, Username not found

    Returns:
        list[Repository(dict)]: List with all starred repositories
    """

    url = 'https://api.github.com/users/{user_name}/starred'.format(
        user_name=user_name)
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(
            status_code=404, detail="Username not found")


def _get_repos_in_db(db: Session, user_id: int,
                     only_starred_repos: bool = False):
    """ Searches all repositories registered in the database.

    Filters repositories by star if the
     only_starred_repos parameter is True

    Args:
        db (Session): sqlAlchemy connection object
        user_id (int): User id
        only_starred_repos (bool, optional): Filters starred repositories.
         Defaults to False.

    Returns:
        sql_object : All repository data
    """
    if only_starred_repos:
        repos_db = db.query(RepoDB).filter(
            RepoDB.auth_id == user_id,
            RepoDB.is_starred_repo == True).all()
    else:
        repos_db = db.query(RepoDB).filter(
            RepoDB.auth_id == user_id).all()

    return repos_db


def _get_repos_in_github(user_name: str):
    """ Returns all starred repositories.
     Only the fields useful for the application are selected.

    Args:
        user_name (str): Github username

    Returns:
        list[Repository(dict)]: [
                "github_repo_id": (int),
                "name": (str),
                "description": (str),
                "html_url": (str)
                ]
    """
    api_data = _request_github_api(user_name)
    list_of_repos = []
    for repo in range(len(api_data)):
        starred_repo = {
            "github_repo_id": api_data[repo]['id'],
            "name": api_data[repo]['name'],
            "description": api_data[repo]['description'],
            "html_url": api_data[repo]['html_url']
        }
        list_of_repos.append(starred_repo)
    return list_of_repos


def _get_repo_by_id(db: Session, github_repo_id: int, user_id: int):
    """ Returns data from a repository

    Args:
        db (Session): sqlAlchemy connection object
        github_repo_id (int): Github repository id

    Returns:
        sql_object : Repository data
    """
    return db.query(RepoDB).filter(
        RepoDB.github_repo_id == github_repo_id,
        RepoDB.auth_id == user_id).first()


def _get_repos_info(db: Session, user_id: int):
    """Returns data for all starred repositories for a user.
     The return is in a good format for the frontend.

    Args:
        db (Session): sqlAlchemy connection object
        user_id (int): User id

    Returns:
        list[Repository(dict)]:repo_info = {
                "id": (int),
                "github_repo_id": (int),
                "name": (str),
                "description": (str),
                "html_url": (str),
                "tags": list[dict]
        }
    """
    repos = _get_repos_in_db(db=db, user_id=user_id,
                             only_starred_repos=True)
    list_of_repos = []
    for repo in repos:
        repo_info = {
            "id": repo.id,
            "github_repo_id":  repo.github_repo_id,
            "name": repo.name,
            "description": repo.description,
            "html_url": repo.html_url,
            "tags": _get_all_tags_in_repo(repo_id=repo.id, db=db)
        }
        list_of_repos.append(repo_info)

    return list_of_repos


def _verify_starred_repo(db: Session,
                         user_name: str,
                         user_id: int):
    """ Updates the repositories to be equivalent to github.
        Starless repositories are deactivated. Returns to the frontend
        a list of repositories with their tags and the reposDB id



        Args:
            db (Session): sqlAlchemy connection object
            user_name (str): Github username

        Returns:
            list[Repository(dict)]:repo_info = {
                    "id": (int),
                    "github_repo_id": (int),
                    "name": (str),
                    "description": (str),
                    "html_url": (str),
                    "tags": list[dict]
            }
    """
    repos_in_db = _get_repos_in_db(db=db, user_id=user_id)
    repos_in_github = _get_repos_in_github(user_name=user_name)

    for repo in repos_in_db:
        repo.is_starred_repo = False
        db.flush()

    for repo in repos_in_github:
        starred_repo = _get_repo_by_id(db=db,
                                       github_repo_id=repo['github_repo_id'],
                                       user_id=user_id)
        if starred_repo:
            starred_repo.is_starred_repo = True
            starred_repo.name = repo['name']
            starred_repo.description = repo['description']
            starred_repo.html_url = repo['html_url']
        else:
            db_repo = RepoDB(github_repo_id=repo['github_repo_id'],
                             auth_id=user_id,
                             is_starred_repo=True,
                             name=repo['name'],
                             description=repo['description'],
                             html_url=repo['html_url'])
            db.add(db_repo)
    db.commit()
    repos_info = _get_repos_info(db=db, user_id=user_id)

    return repos_info
