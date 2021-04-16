import os
import json
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


TEST_TOKEN = os.getenv("TEST_TOKEN", "Token undefined")
headers = {"Authorization": f'Bearer {TEST_TOKEN}'}


def test_create_new_user():
    test_request_payload = {
        "github_nickname": "Hawangledt"
    }
    test_response_payload = {
        "github_nickname": "Hawangledt"
    }

    url = "/auth/"

    # Create user
    response = client.post(
        url=url, json=test_request_payload, headers=headers)
    assert response.status_code == 200
    response_json = response.json()
    auth0_unique_id = response_json['auth0_unique_id']
    del response_json['id']
    del response_json['auth0_unique_id']
    assert response_json == test_response_payload

    # Delete created user
    response = client.delete(
        url=url, headers=headers)
    assert response.status_code == 200
    assert response.json()['auth0_unique_id'] == auth0_unique_id


def test_user_already_registered():
    test_request_payload = {
        "github_nickname": "Hawangledt"
    }
    test_response_payload = {
        "github_nickname": "Hawangledt"
    }

    url = "/auth/"

    # Create user
    response = client.post(
        url=url, json=test_request_payload, headers=headers)
    assert response.status_code == 200
    response_json = response.json()
    auth0_unique_id = response_json['auth0_unique_id']
    del response_json['id']
    del response_json['auth0_unique_id']
    assert response_json == test_response_payload

    # Create already user
    response = client.post(
        url=url, json=test_request_payload, headers=headers)
    assert response.status_code == 400

    # Delete created user
    response = client.delete(
        url=url, headers=headers)
    assert response.status_code == 200
    assert response.json()['auth0_unique_id'] == auth0_unique_id


# def test_delete_a_user_with_have_tags():
#     test_request_payload = {
#         "github_nickname": "Hawangledt"
#     }
#     test_response_payload = {
#         "github_nickname": "Hawangledt"
#     }

#     url = "/auth/"

#     # Create user
#     response = client.post(
#         url=url, json=test_request_payload, headers=headers)
#     assert response.status_code == 200
#     response_json = response.json()
#     auth0_unique_id = response_json['auth0_unique_id']
#     del response_json['id']
#     del response_json['auth0_unique_id']
#     assert response_json == test_response_payload

#     # Delete created user
#     response = client.delete(
#         url=url, headers=headers)
#     assert response.status_code == 200
#     assert response.json()['auth0_unique_id'] == auth0_unique_id
