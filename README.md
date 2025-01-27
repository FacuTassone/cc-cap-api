## Description

This project is built with [NestJS](https://nestjs.com), [TypeORM](https://typeorm.io), and [PostgreSQL](https://www.postgresql.org). It uses a Dockerized environment with `docker-compose` for seamless deployment and includes integration with `.env` files to manage configuration for development and testing.

## Consideration

The only consideration that was taken was the following:
To keep the portfolio consistent for each stock purchase insert a CASH_OUT order, and for each sale insert a CASH_IN (in addition to the stock order).
When I found that if the price of a stock had a decimal I could not buy just one but a multiple that would make the decimal whole.
Through logic I capture that it is not possible to buy fractions of shares.
Then I modified the order size column to allow decimals.
I understand that this is a very complex decision, in this case I took this decision, I understand that in the case that this happens in the day to day business considerations must be taken before making the decision.

## Features

- Server-side application using NestJS
- Database management with PostgreSQL via TypeORM
- Environment-ready configuration using `.env`
- Unit and integration tests
- Dockerized setup for local development and testing
- Documented endpoints in Swagger

## Project setup use Azure DB

```bash
# Install dependencies
$ npm install

# Start in development mode
$ npm run start:dev
```

## Project setup with Docker (local database credentials)

```bash
# Docker compose
$ docker-compose up --build
```

## Running tests (with Azure DB)
```bash
# Run unit tests
$ npm run test
```

## Swagger API Documentation

The API documentation is available via [Swagger](http://localhost:3000/api-docs)

## Postman Collection

[Postman](postman_collection.json)

## Database Diagram

Below is the database schema used for this project:

![Database Diagram](database/cocos-db.jpeg)