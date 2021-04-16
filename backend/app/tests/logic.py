import json
import os


class FakeUser:
    def __init__(self, client):
        self.nick = "Hawangledt"
        TEST_TOKEN = os.getenv("TEST_TOKEN", "Token undefined")
        headers = {"Authorization": f'Bearer {TEST_TOKEN}'}
        self.headers = headers
        self.auth0 = ""
        self.url = "/auth/"
        self.client = client

    def Create(self):
        fake_user_payload = {
            "github_nickname": self.nick
        }
        self.client.post(
            url=self.url, json=fake_user_payload, headers=self.headers)

    def Delete(self):
        self.client.delete(
            url=self.url, headers=self.headers)

    def GetRepos(self):
        repos = self.client.get(
            url="/repos/", headers=self.headers)
        return repos.json()

    def GetTags(self):
        test_request_payload_1 = {
            'name': "Flask",
        }
        test_request_payload_2 = {
            'name': "Python",
        }
        self.client.post(
            url="/tags/", json=test_request_payload_1, headers=self.headers)
        self.client.post(
            url="/tags/", json=test_request_payload_2, headers=self.headers)
        response = self.client.get("/tags/", headers=self.headers)
        response_json = response.json()
        return response_json
