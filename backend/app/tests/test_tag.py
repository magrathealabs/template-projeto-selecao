import json
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.tests.logic import FakeUser

client = TestClient(app)
fake_user = FakeUser(client)


def test_create_new_tag():
    fake_user.Create()

    test_request_payload = {
        "name": "Python"
    }

    response = client.post(
        url="/tags/", json=test_request_payload, headers=fake_user.headers)
    assert response.status_code == 200
    response_json = response.json()
    del response_json['id']
    del response_json['auth_id']
    assert response_json == test_request_payload
    fake_user.Delete()


def test_create_a_empty_tag():
    fake_user.Create()

    test_request_payload = {
        "name": ""
    }

    response = client.post(
        url="/tags/", json=test_request_payload, headers=fake_user.headers)
    assert response.status_code == 422
    fake_user.Delete()


def test_create_an_existing_tag():
    fake_user.Create()

    test_request_payload = {
        "name": "Python"
    }

    client.post(
        url="/tags/", json=test_request_payload, headers=fake_user.headers)

    response = client.post(
        url="/tags/", json=test_request_payload, headers=fake_user.headers)
    assert response.status_code == 400
    fake_user.Delete()


def test_get_user_tags():
    fake_user.Create()

    test_request_payload_1 = {
        'name': "Flask",
    }

    test_request_payload_2 = {
        'name': "Python",
    }

    client.post(
        url="/tags/", json=test_request_payload_1, headers=fake_user.headers)

    client.post(
        url="/tags/", json=test_request_payload_2, headers=fake_user.headers)

    response = client.get("/tags/", headers=fake_user.headers)
    assert response.status_code == 200
    response_json = response.json()
    assert len(response_json) == 2
    for resp_json in response_json:
        del resp_json['id']
        del resp_json['auth_id']
    assert response_json[0] == test_request_payload_1
    assert response_json[1] == test_request_payload_2

    fake_user.Delete()


def test_add_tag_in_repo():
    fake_user.Create()

    repos = fake_user.GetRepos()
    repo_id = repos[0]['id']
    tags = fake_user.GetTags()
    tag_id = tags[0]['id']

    test_request_payload = {
        "tag_id": tag_id,
        "repo_id": repo_id
    }

    response = client.post(
        url="/tags/repo",
        json=test_request_payload,
        headers=fake_user.headers)
    assert response.status_code == 200
    response_json = response.json()
    del response_json['id']
    assert response_json == test_request_payload
    fake_user.Delete()


def test_add_the_same_tag_to_a_repo():
    fake_user.Create()

    repos = fake_user.GetRepos()
    repo_id = repos[0]['id']
    tags = fake_user.GetTags()
    tag_id = tags[0]['id']

    test_request_payload = {
        "tag_id": tag_id,
        "repo_id": repo_id
    }

    client.post(
        url="/tags/repo",
        json=test_request_payload,
        headers=fake_user.headers)

    response = client.post(
        url="/tags/repo",
        json=test_request_payload,
        headers=fake_user.headers)
    assert response.status_code == 400

    fake_user.Delete()


def test_delete_tag_in_repo():
    fake_user.Create()

    repos = fake_user.GetRepos()
    repo_id = repos[0]['id']
    tags = fake_user.GetTags()
    tag_id = tags[0]['id']

    add_tag_in_repo_payload = {
        "repo_id": repo_id,
        "tag_id": tag_id
    }

    client.post(
        url="/tags/repo",
        json=add_tag_in_repo_payload,
        headers=fake_user.headers)

    url = "/tags/repo/{repo_id}/{tag_id}".format(repo_id=repo_id,
                                                 tag_id=tag_id)
    response = client.delete(
        url=url,
        headers=fake_user.headers)

    assert response.status_code == 200
    response_json = response.json()
    del response_json['id']
    assert response_json == add_tag_in_repo_payload
    fake_user.Delete()


def test_deleting_an_invalid_association():
    fake_user.Create()

    repos = fake_user.GetRepos()
    repo_id = repos[0]['id']
    tags = fake_user.GetTags()
    tag_id = tags[0]['id']

    add_tag_in_repo_payload = {
        "repo_id": repo_id,
        "tag_id": tag_id
    }

    client.post(
        url="/tags/repo",
        json=add_tag_in_repo_payload,
        headers=fake_user.headers)

    url_1 = "/tags/repo/{repo_id}/{tag_id}".format(repo_id=repo_id+1,
                                                   tag_id=tag_id)
    response = client.delete(
        url=url_1,
        headers=fake_user.headers)
    assert response.status_code == 404

    url_2 = "/tags/repo/{repo_id}/{tag_id}".format(repo_id=repo_id,
                                                   tag_id=tag_id+1)
    response = client.delete(
        url=url_2,
        headers=fake_user.headers)
    assert response.status_code == 404

    fake_user.Delete()
