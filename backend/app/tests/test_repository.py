import json
import requests
from fastapi.testclient import TestClient
from app.main import app
from app.tests.logic import FakeUser

client = TestClient(app)
fake_user = FakeUser(client)


def test_add_starred_repos_in_db():
    fake_user.Create()

    repos = client.get(
        url="/repos/", headers=fake_user.headers)

    user_name = "Hawangledt"
    url = 'https://api.github.com/users/{user_name}/starred'.format(
        user_name=user_name)

    github_response = requests.get(url)
    assert github_response.status_code == 200

    github_response_payload = github_response.json()

    repos_in_db = fake_user.GetRepos()

    for github_repo in github_response_payload:
        found_repo = False
        for repo_db in repos_in_db:
            if github_repo['id'] == repo_db['github_repo_id']:
                found_repo = True
        assert found_repo, "{} Not Found".format(github_repo['id'])

    fake_user.Delete()
