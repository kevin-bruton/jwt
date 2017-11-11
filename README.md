# A project that uses JWT

This is a new project in nodejs which I'll be updating from time to time.
The JWT is stored in sessionStorage. This means that in a real, production app, we would need
to take care to protect ourselves against XSS.
CSRF (more complex) isn't an issue as sessionStorage/localStorage only works within the same
domain/subdomain.

## Routes

GET / : main public page

GET /setup : creates a sample user

POST /auth : authenticates username and password returning a jwt
  username and password must be sent as parameters in x-www-form-urlencoded in the body of the request

GET /api : calls to the api. All calls to the api require a valid jwt

GET /api/users : list all users
