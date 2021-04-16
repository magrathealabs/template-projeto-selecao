# About

    For the challenge proposed by Magrathea an application was developed that saves the starred repositories of a github user and on top of the repositories the user can create tags, additional in the repositories and later can filter them by the added tags.

# BACKEND

https://github.com/Hawangledt/tag-generate-for-github
## It's uses the following technologies:

    FastAPI (Python)
    SQLAlchemy
    Postgress
    Uvicorn
    Swagger
    Auth0

## Setup Environment Variables

You need to define the following environment variables:

    AUTH0_DOMAIN: Auth0 Domain (Ex.:"https://example.us.auth0.com/")
    API_AUDIENCE: Auth0 Api Audience (Ex.: "https://example-auth0-api.com/")
    ALGORITHMS: Auth0 Algorithms url (Ex.: ['RS256']")  
    DATABASE_URL: Postgres url (Ex.: "postgres://user:password@localhost:5432/tag_generate")
## How to run the code

Go the backend directory, create a virtual environmnet and activate it.

    Run pip install -r requirements.txt

    Go the app directory

    and then run:

    uvicorn main:app --reload

## How to run the tests

Go the backend directory, activate virtual environmnet.

    Go the app directory

    and then run:

    python -m pytest

# FRONTEND

https://github.com/Hawangledt/tag-generate-for-github-front
## It's uses the following technologies:

    ReactJS (Javascript)
    React-toastify
    Styled-components
    Axios
    React-router-dom
    Auth0
    Material-UI

## Setup Environment Variables

You need to define the following environment variables:

    REACT_APP_API: http://127.0.0.1:8000/
    AUTH0_DOMAIN: Auth0 Domain (Ex.:"https://example.us.auth0.com/")
    AUTH0_CLIENT_ID: Auth0 clientID (Ex.: "dfsdfexemplo3erwe")
    AUTH0_AUDIENCE: Auth0 Api Audience (Ex.: "https://example-auth0-api.com/")

## How to run the code

Go the frontend directory, type yarn in terminal to install dependencies

    and then run:

    yarn start


## To see the version of Deploy, access the url:

https://romantic-euclid-b0c87d.netlify.app/