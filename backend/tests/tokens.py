import time

import itsdangerous


SIGNER = itsdangerous.URLSafeTimedSerializer("SECRET", salt="authentication")

token = SIGNER.dumps({"user_id": 123456789})
print(token)

time.sleep(5.5)

try:
    data = SIGNER.loads(token, max_age=5)
except itsdangerous.BadSignature as exception:
    print(type(exception))
    print(exception.message)
    print(exception.payload)
else:
    print(data)
