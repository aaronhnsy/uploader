import asyncio
import pathlib
import tomllib

import aiohttp
import orjson


config = tomllib.loads(pathlib.Path("client.config.toml").read_text())
url = "http://127.0.0.1:10000"


async def test_upload() -> None:
    session = aiohttp.ClientSession()
    headers = {
        "Authorization": f"{config["token"]}",
    }
    data = aiohttp.FormData()
    data.add_field(
        "file",
        pathlib.Path("/mnt/c/users/aaronhnsy/pictures/profile pictures/a9c4380e55ebb1c9f2f2c4b179545689.png").read_bytes(),
        filename="file.png"
    )
    async with session.post(f"{url}/api/upload", headers=headers, data=data) as response:
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
    async with session.get(f"{url}/login", headers=headers, data=orjson.dumps(data)) as response:
        print(await response.json())
    await session.close()


asyncio.run(test_upload())
