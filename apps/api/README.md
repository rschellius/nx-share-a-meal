# Avans Programmeren 4 example server

Dit is voorbeeldcode bij de lessen Programmeren 4. Deze server gaat uit van een Movie-casus die niet beschreven staat in een functioneel ontwerp, maar aansluit bij bv de Samen Eten casus uit Programmeren 4.

## Installing and starting

Om te installeren run je:

```
npm install
npm run dev
```

## Testing

Om te testen run je:

```
npm test
```

## Codecoverage en Sonar analysis

Run:

```
npm run coverage
npm run sonar
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
