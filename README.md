# A project that uses JWT

This is a new project in nodejs which I'll be updating from time to time.

## Routes

GET / : main public page

GET /setup : creates a sample user

POST /auth : authenticates username and password returning a jwt
  username and password must be sent as parameters in x-www-form-urlencoded in the body of the request

GET /api : calls to the api. All calls to the api require a valid jwt

GET /api/users : list all users
