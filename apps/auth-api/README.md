# Authentication API backend

Nestjs backend server that provides a login HTTP endpoint, and a microservice that provides JWT token validation.

## Installing and starting

Deze implementatie gebruikt een NX monorepo.
Om te installeren en runnen:

```
npm install
nx serve auth-api
```

## Testing

Om te testen run je:

```
nx test auth-api
```

## Docker

```
docker build --tag movies:1.0 .
docker run -e DB_HOST=192.168.178.20 -e DB_PASSWORD=secret --publish 3000:3000 --name movies movies:1.0
docker rm --force movies
```

## Docker Compose

SQL scripts must be in a folder; in this case 'mysql-dump'. This folder is linked as a volume into the mysql container. Only at very first startup this script is read. Prune your images until it is read.

```
docker system prune -a
docker-compose up --build
```

## RabbitMq - not in current repo

For a local Docker instance of RabbitMQ 3.9, the latest series, see
[https://www.rabbitmq.com/download.html](https://www.rabbitmq.com/download.html).

```
docker run -it --rm --name rabbitmq -e RABBITMQ_DEFAULT_USER=rmq_user -e RABBITMQ_DEFAULT_PASS=secret -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management
```
