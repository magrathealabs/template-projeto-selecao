from fastapi import FastAPI
from fastapi import APIRouter
from core.routers import auth, repository, tag
from core.models.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(auth.router)
app.include_router(repository.router)
app.include_router(tag.router)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/")
async def root():
    return {"message": "Access /docs for API documentation"}


@app.get(
    "/ping",
    name="Ping Pong Test",
    description="""ping pong test to verify the functioning
     of the system routes""",
)
async def pong():
    return {"ping": "pong!"}
