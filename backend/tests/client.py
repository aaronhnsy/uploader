import asyncio
import json
import pathlib
import tomllib
from pprint import pprint
from typing import Awaitable, Callable

import aiohttp
import orjson


CONFIG = tomllib.loads(pathlib.Path("client.config.toml").read_text())
URL = "http://127.0.0.1:8000"


async def wrapper(function: Callable[[aiohttp.ClientSession], Awaitable[None]]) -> None:
    session = aiohttp.ClientSession()
    await function(session)
    await session.close()


async def test_upload(session: aiohttp.ClientSession) -> None:
    headers = {
        "Authorization": f"{CONFIG["token"]}",
    }
    data = aiohttp.FormData()
    data.add_field(
        "file",
        pathlib.Path(
            "/mnt/c/users/aaronhnsy/pictures/profile pictures/a9c4380e55ebb1c9f2f2c4b179545689.png"
        ).read_bytes(),
        filename="file.png"
    )
    async with session.post(f"{URL}/api/upload", headers=headers, data=data) as response:
        pprint(await response.json())


async def test_login(session: aiohttp.ClientSession) -> None:
    headers = {
        "Content-Type":  "application/json",
        "Authorization": f"{CONFIG["token"]}",
    }
    data = {
        "email":    f"{CONFIG["email"]}",
        "password": f"{CONFIG["password"]}"
    }
    async with session.get(f"{URL}/login", headers=headers, data=orjson.dumps(data)) as response:
        pprint(await response.json())


async def test_get_files(session: aiohttp.ClientSession) -> None:
    headers = {
        "Authorization": f"{CONFIG["token"]}"
    }
    async with session.get(f"{URL}/api/files", headers=headers) as response:
        print(json.dumps(await response.json(), indent=4))


asyncio.run(wrapper(test_get_files))
