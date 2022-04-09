# User API backend

Nestjs backend server that provides user management HTTP endpoints, and a microservice that provides user lookup, for example when logging in a user via the Auth API.

## Installing and starting

Install this required dependencies for this server by running the following command in the root of this monorepo.

```
npm install
nx serve user-api
```

## Testing

To run the tests:

```
nx test user-api
```

## Docker

Building and running the server in a Docker container must be done from the root of the repository.

Make sure you have the lates build of the base image. Any code change requires a rebuild of this image.

```
docker build . -t my-base-image:nx-base
```

Then:

```
docker build . --file .\apps\user-api\Dockerfile.web --tag user-api

docker run
    -e USER_API_HTTP_PORT=3020
    -e USER_API_MICROSERVICE_PORT=4020
    -e USER_API_MICROSERVICE_HOSTNAME=localhost
    --publish 3020:3020
    --publish 4020:4020
    -i -t user-api /bin/bash
```

## Docker Compose

To start all required services and frontend applications at once, run the `docker compose up` command from the root of the repo.
