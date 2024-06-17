import asyncio
import json
import pathlib
import tomllib
from typing import Awaitable, Callable

import aiohttp


CONFIG = tomllib.loads(pathlib.Path("client.config.toml").read_text())
API = "http://localhost/api"
HEADERS = {"Authorization": f"{CONFIG["token"]}"}


async def wrapper(function: Callable[[aiohttp.ClientSession], Awaitable[None]]) -> None:
    session = aiohttp.ClientSession()
    await function(session)
    await session.close()


async def test_get_other_user(session: aiohttp.ClientSession) -> None:
    async with session.get(f"{API}/users/efghefghefghefgh", headers=HEADERS) as response:
        print(json.dumps(await response.json(), indent=4))


async def test_get_current_user(session: aiohttp.ClientSession) -> None:
    async with session.get(f"{API}/users/me", headers=HEADERS) as response:
        print(json.dumps(await response.json(), indent=4))


async def test_get_token(session: aiohttp.ClientSession) -> None:
    data = {
        "username": f"{CONFIG["username"]}",
        "password": f"{CONFIG["password"]}",
        "detail": "api token"
    }
    async with session.post(f"{API}/tokens", json=data) as response:
        print(json.dumps(await response.json(), indent=4))


async def test_get_users_file(session: aiohttp.ClientSession) -> None:
    headers = {
        "Authorization": f"{CONFIG["token"]}"
    }
    async with session.get(f"{API}/users/efghefghefghefgh/files/574c57da4a9b4219.png", headers=headers) as response:
        print(json.dumps(await response.json(), indent=4))


async def test_get_users_files(session: aiohttp.ClientSession) -> None:
    headers = {
        "Authorization": f"{CONFIG["token"]}"
    }
    async with session.get(f"{API}/users/efghefghefghefgh/files", headers=headers) as response:
        print(json.dumps(await response.json(), indent=4))


async def test_get_current_users_file(session: aiohttp.ClientSession) -> None:
    headers = {
        "Authorization": f"{CONFIG["token"]}"
    }
    async with session.get(f"{API}/users/me/files/574c57da4a9b4219.png", headers=headers) as response:
        print(json.dumps(await response.json(), indent=4))


async def test_get_current_users_files(session: aiohttp.ClientSession) -> None:
    headers = {
        "Authorization": f"{CONFIG["token"]}"
    }
    async with session.get(f"{API}/users/me/files", headers=headers) as response:
        print(json.dumps(await response.json(), indent=4))


async def test_upload(session: aiohttp.ClientSession) -> None:
    for file in pathlib.Path("/mnt/c/users/aaronhnsy/downloads/unsamples (5)").iterdir():
        data = aiohttp.FormData()
        data.add_field(
            "file",
            file.read_bytes(),
            filename=file.name,
        )
        async with session.post(f"{API}/users/me/uploads", headers=HEADERS, data=data) as response:
            print(json.dumps(await response.json(), indent=4))


asyncio.run(wrapper(test_upload))
