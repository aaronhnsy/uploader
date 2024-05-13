import asyncio
import json
import pathlib
import tomllib
from typing import Awaitable, Callable

import aiohttp


CONFIG = tomllib.loads(pathlib.Path("client.config.toml").read_text())
API = "http://127.0.0.1:8000/api"
HEADERS = {"Authorization": f"{CONFIG["token"]}"}


async def wrapper(function: Callable[[aiohttp.ClientSession], Awaitable[None]]) -> None:
    session = aiohttp.ClientSession()
    await function(session)
    await session.close()


async def test_get_user(session: aiohttp.ClientSession) -> None:
    async with session.get(f"{API}/users/efghefghefghefgh", headers=HEADERS) as response:
        print(json.dumps(await response.json(), indent=4))


async def test_get_current_user(session: aiohttp.ClientSession) -> None:
    async with session.get(f"{API}/users/me", headers=HEADERS) as response:
        print(json.dumps(await response.json(), indent=4))


async def test_upload(session: aiohttp.ClientSession) -> None:
    data = aiohttp.FormData()
    data.add_field(
        "file",
        pathlib.Path(
            "/mnt/c/users/aaronhnsy/pictures/profile pictures/a9c4380e55ebb1c9f2f2c4b179545689.png"
        ).read_bytes(),
    )
    async with session.post(f"{API}/files", headers=HEADERS, data=data) as response:
        print(json.dumps(await response.json(), indent=4))


async def test_get_file(session: aiohttp.ClientSession) -> None:
    headers = {
        "Authorization": f"{CONFIG["token"]}"
    }
    async with session.get(f"{API}/files/e680eaea5a2240c5/png/a", headers=headers) as response:
        print(json.dumps(await response.json(), indent=4))


async def test_get_token(session: aiohttp.ClientSession) -> None:
    data = {
        "username": f"{CONFIG["username"]}",
        "password": f"{CONFIG["password"]}",
        "detail": "api token"
    }
    async with session.post(f"{API}/tokens", json=data) as response:
        print(json.dumps(await response.json(), indent=4))
        print(response.headers)


asyncio.run(wrapper(test_get_current_user))
