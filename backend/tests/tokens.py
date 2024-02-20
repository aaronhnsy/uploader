import itsdangerous


SIGNER = itsdangerous.Serializer("SECRET", salt="authentication")

token = SIGNER.dumps({"user_id": 123456789})
print(token)

try:
    data = SIGNER.loads(token + "a")
except itsdangerous.BadSignature as exception:
    print(type(exception))
    print(exception.message)
    print(exception.payload)
else:
    print(data)
