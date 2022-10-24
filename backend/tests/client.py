import asyncio

import aiohttp


async def main() -> None:

    session = aiohttp.ClientSession()

    async with session.get(
        "http://127.0.0.1:8000/api/",
        headers={"Authorization": "a"}
    ) as response:
        print(await response.json())

    await session.close()


asyncio.run(main())
