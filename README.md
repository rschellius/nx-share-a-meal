# NxShareAMeal

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="100"></p>

🔎 **Smart, Fast and Extensible Build System**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

```
nx s movies-ui
nx s share-a-meal-ui
nx s api
```

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

```
nx b movies-ui
nx b share-a-meal-ui
nx b api
```

## Docker

The root Dockerfile contains the base image for all apps in the monorepo. This image must be built at first. It is tagged so that the other Dockerfiles can find it.

### Images and containers

To build and run as separate images and containers, first build the base image

```
docker build . -t my-base-image:nx-base
```

Then:

```
// API
docker build . --file .\apps\api\Dockerfile.web --tag share-a-meal-api
docker run -i -t share-a-meal-api

// UI
docker build . --file .\apps\share-a-meal-ui\Dockerfile.web --tag share-a-meal-ui
docker run -p 4200:4200 -i -t share-a-meal-ui
```

### docker-compose

You could also use docker-compose to run `docker-compose build` and/or `docker-compose up`.

### Deploying Docker containers on Heroku

Navigate to the root folder and follow these commands:

```
heroku create shareameal-api
heroku container:login
heroku container:push web --recursive -a shareameal-api
heroku ps:scale web=1
heroku container:release web  -a shareameal-api
```

Heroku will ask which of the web applications you want to deploy. Do this for both the API backend and the WebUI frontend.

To inspect the logging, type `heroku logs -a shareameal-api`.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io). Run `nx affected:test` to execute the unit tests affected by a change.

```
nx test movies-ui
nx test share-a-meal-ui
nx test api
```

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io). Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

```
nx e2e movies-ui-e2e
nx e2e share-a-meal-ui-e2e
nx e2e api-e2e
```

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Sources

- [Nx, NestJs, React — Docker Deploys](https://medium.com/swlh/nx-nestjs-react-docker-deploys-928a55fc19fd)

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.
Visit [Nx Cloud](https://nx.app/) to learn more.
