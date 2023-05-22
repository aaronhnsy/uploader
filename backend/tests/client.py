import asyncio
import pathlib

import aiohttp


async def main() -> None:
    session = aiohttp.ClientSession()
    headers = {
        "Authorization": "dfbjdasvbuwgb43jwrefbcvbj4wbgjkerbdq0-9we3r9013-0udfh"
    }
    data = aiohttp.FormData()
    data.add_field(
        "file",
        pathlib.Path("/mnt/c/Users/Axel/Pictures/Profile Pictures/1be6c88a71eea616f85814935e0df515.png").read_bytes(),
        filename="file.png"
    )
    async with session.post("https://axel.casa/api/upload", headers=headers, data=data) as response:
        print(await response.json())
    await session.close()


asyncio.run(main())
