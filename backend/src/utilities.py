import snowflake


__all__ = (
    "generate_snowflake",
)


snowflake_generator = snowflake.SnowflakeGenerator(0)


def generate_snowflake() -> int:

    if not (x := next(snowflake_generator)):
        raise RuntimeError("could not generate new snowflake")

    return x
