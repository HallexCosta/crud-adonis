# Adonis fullstack application

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Postgre Database
9. Migrations and seeds

## Setup

Run the following command to install dependencies.

```bash
$ yarn
```

Run the following command to configure postgre database

```bash
$ cp .env-elephant-pg .env
```

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### Docker and Docker Compose

docker

```bash
# build
$ docker build -d <container-name> <directory-from-dockerfile>

# run
$ docker run -t  3333:3333 <container-name>

# Example: docker run -t  3333:3333 crud-adonis
```

docker-compose:

```bash
$ docker compose up
```
