import asyncio
import pathlib
import tomllib

import aiohttp
import orjson


config = tomllib.loads(pathlib.Path("client.config.toml").read_text())


async def test_upload() -> None:
    session = aiohttp.ClientSession()
    headers = {
        "Authorization": f"{config["token"]}",
    }
    data = aiohttp.FormData()
    data.add_field(
        "file",
        pathlib.Path("/mnt/c/Users/Axel/Pictures/Profile Pictures/1be6c88a71eea616f85814935e0df515.png").read_bytes(),
        filename="file.png"
    )
    async with session.post("http://127.0.0.1:12345/api/upload", headers=headers, data=data) as response:
        print(await response.json())
    await session.close()


async def test_login() -> None:
    session = aiohttp.ClientSession()
    headers = {
        "Content-Type":  "application/json",
        "Authorization": f"{config["token"]}",
    }
    data = {
        "email":    f"{config["email"]}",
        "password": f"{config["password"]}"
    }
    async with session.get("http://127.0.0.1:12345/login", headers=headers, data=orjson.dumps(data)) as response:
        print(await response.json())
    await session.close()


asyncio.run(test_login())
