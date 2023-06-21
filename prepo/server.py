import json
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()
origins = [
    # local dev frontend is hosted on 3000
    "http://localhost:3000",
    # server is hosted on 8000
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the static files we want to serve so that FastAPI knows where to find them.
app.mount("/static", StaticFiles(directory="prepo/static"), name="static")


# When we navigate to the root url, we serve the static index.html,
# which will load the rest of the frontend app itself.
@app.get("/")
async def read_index():
    return FileResponse("prepo/static/index.html")


# The rest of your server implementation can go here
# and is accessible from the frontend as normal.
@app.get("/runs")
async def get_runs():
    load_dir = "./prompt_tests/runs"
    with os.scandir(load_dir) as it:
        return [
            file_entry.name.replace(".json", "")
            for file_entry in it
            if file_entry.is_file()
        ]


@app.get("/runs/{name}")
async def get_run(name: str):
    load_dir = "./prompt_tests/runs"
    with open(f"{load_dir}/{name}.json", "r") as f:
        return json.load(f)
