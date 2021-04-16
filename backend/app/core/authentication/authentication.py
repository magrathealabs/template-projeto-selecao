import json
import requests
import os
from fastapi import Security, HTTPException, status
from fastapi.security.api_key import APIKeyHeader
from functools import wraps
from jose import jwt

AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN", "Auth0 Domain undefined")
API_AUDIENCE = os.getenv("API_AUDIENCE", "Auth0 Api audience undefined")
ALGORITHMS = os.getenv("ALGORITHMS", "Algorithms undefined")

api_key = APIKeyHeader(name="authorization")


def required_auth(token: str = Security(api_key)):
    if 'BEARER ' not in token[0:7].upper():
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="""invalid_token:
                            Could not validate credentials""")
    url_api = f'{AUTH0_DOMAIN}.well-known/jwks.json'
    jwks = requests.get(url_api).json()
    token = token.split(' ')[1]
    try:
        unverified_header = jwt.get_unverified_header(token)
    except jose_exceptions.JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="""invalid_decode_token:
                            Error decoding token headers""")
    rsa_key = {}
    for key in jwks["keys"]:
        if key["kid"] == unverified_header["kid"]:
            rsa_key = {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"]
            }
    if rsa_key:
        try:
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=ALGORITHMS,
                audience=API_AUDIENCE,
                issuer=AUTH0_DOMAIN
            )
        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="token_expired: Token espired")
        except jwt.JWTClaimsError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="""incorrect_claims:
                                Check the audience and issuer""")
        except Exception:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="""invalid_header:
                                Unable to parse authentication""")

    return payload
