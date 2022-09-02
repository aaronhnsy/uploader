import snowflake


snowflake_generator = snowflake.SnowflakeGenerator(952)


def generate_snowflake() -> int:

    if not (x := next(snowflake_generator)):
        raise RuntimeError("could not generate new snowflake")

    return x
