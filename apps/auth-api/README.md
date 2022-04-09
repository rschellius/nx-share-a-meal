# Authentication API backend

Nestjs backend server that provides a login HTTP endpoint, and a microservice that provides JWT token validation.

## Installing and starting

Install this required dependencies for this server by running the following command in the root of this monorepo.

```
npm install
nx serve auth-api
```

## Testing

To run the tests:

```
nx test auth-api
```

## Docker

Building and running the server in a Docker container must be done from the root of the repository.

```
docker build . --file .\apps\auth-api\Dockerfile.web --tag auth-api

docker run
    -e AUTH_API_HTTP_PORT=3010
    -e AUTH_API_MICROSERVICE_PORT=4010
    -e AUTH_API_MICROSERVICE_HOSTNAME=localhost
    --publish 3010:3010
    --publish 4010:4010
    -i -t auth-api /bin/bash
```

Or shorter, from the repo root folder, using the `.env` file:

```
docker run --env-file=.env  --publish 3010:3010 --publish 4010:4010 -i -t auth-api /bin/bash
```

Notice that the Auth API sever requires the User API to run, in order to fully function.

## Docker Compose

To start all required services and frontend applications at once, run the `docker compose up` command from the root of the repo.
