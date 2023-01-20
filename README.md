# Auth Service

Reliable, lightweight, dedicated JWT authentication as a microservice that provides separation of authentication concerns and brings scalibility to a distributed system.

Built with ❤️ and the [NestJS](https://nestjs.com/) framework.

<!-- PROJECT SHIELDS - TBD -->

## Getting Started

The following is a guide to setting up Auth Service locally.

### Prerequisites

- **Node.js 16** installed. You can use `v16.14.2` as recommended by the project.
- **Yarn** package manager. Install it with:

```sh
npm install -g yarn
```

- **PostgreSQL 13** installed. Make sure the database server has been started on your `localhost`, port `5432`.

### Installation & Setup

1. Clone the repo

```sh
git clone https://github.com/anhdau185/auth-service.git
```

2. Install packages

```sh
yarn install
```

3. Configuration

Create a `.env` file by copying the project's sample file `.env.dev`:

```sh
cp .env.dev .env
```

and fill out all the empty fields in it with your own values.

4. Build the project

```sh
yarn build
```

5. Set up the database

Create a development database:

```sh
createdb auth_service_dev
```

and then run the schema migrations:

```sh
yarn migration:run
```

6. Run the service in _watch mode_

```sh
yarn start:dev
```

The service can now be accessed via `localhost:3000`.

## Setting up Using Docker

Auth Service can also run as a containerized application. In fact, this is the preferable way in which the service should be deployed and run in a production environment because of the portability (and many more advantages) that containers provide.

The following is an alternative setup guide using Docker containers.

### Prerequisites

- Latest version of [Docker Desktop](https://www.docker.com/products/docker-desktop) installed.
- Check if `docker` and `docker compose` are running:

```sh
docker version
docker compose version
```

### Installation & Setup

1. Configuration

Create a `.env` file by copying the project's sample file `.env.prod`:

```sh
cp .env.prod .env
```

and fill out all the empty fields in it with your own values.

2. Get the Docker images

Pull all the images needed to get the project up and running from Docker Hub:

```sh
# postgres image
docker pull postgres:13-alpine

# backend app image
docker pull anhdau185/auth-service:latest

# pgadmin4 image
docker pull dpage/pgadmin4:latest
```

3. Run the service

Run the service as containers in the background with `docker compose`:

```sh
docker compose up --detach
```

The service can now be accessed via `localhost:3000`.

4. Schema migrations

If you are running the service for the first time or anytime the database schema is changed (which leads to a generation of a new migration file), you will need to run schema migrations before the service becomes actually usable.

To do this with your backend app running inside a Docker container, run the command:

```sh
docker exec auth yarn migration:run
```

5. Stop the service

If you'd want to stop (and then remove) the service's running containers as a whole, run the command:

```sh
docker compose down
```

### Using pgAdmin 4 to manage PostgreSQL

**pgAdmin** is an open-source administration and development tool for PostgreSQL. The web-based pgAdmin 4 is included in this project as a container running in parallel with the main service's containers.

To manage, administer, or simply interact with your PostgresSQL databases:

1. Navigate to `localhost:5050` on your browser

2. Enter the admin credetials that you specified earlier in your `.env` file (`env.PGADMIN_DEFAULT_EMAIL` / `env.PGADMIN_DEFAULT_PASSWORD`)

3. Connect to your database server (a.k.a. `db` container in this case) with:

- Name: `db_container` (or whatever works for you)
- Hostname: `db`
- Port: can be obtained from `env.POSTGRES_PORT` (typically `5432`)
- Maintenance database: `postgres`
- Username: can be obtained from `env.POSTGRES_USER`
- Password: can be obtained from `env.POSTGRES_PASSWORD`

Happy managing your databases!

## Workflows

Check out [this doc](https://github.com/anhdau185/application-infrastructure/blob/main/docs/auth-service/workflows.md) for how to develop the service as well as how to deploy and monitor it on a production environment.

## Usage

This section lists out all the APIs exposed by the Auth Service as well as how to test them.

### API Documentation

| API Name/Purpose    | Endpoint               | Request Body                           | Bearer Token Required? | Comment             |
| ------------------- | ---------------------- | -------------------------------------- | ---------------------- | ------------------- |
| Register a New User | `POST /users/signup`   | `{ name; username; password; scope? }` | No                     |
| Get the User List   | `GET /users`           |                                        | Access Token           | Needs authorization |
| Get a User          | `GET /users/:id`       |                                        | Access Token           | Needs authorization |
| Update a User       | `PATCH /users/:id`     | `{ name; password }`                   | Access Token           | Needs authorization |
| Delete a User       | `DELETE /users/:id`    |                                        | Access Token           | Needs authorization |
| Sign In             | `POST /auth/login`     | `{ username; password }`               | No                     |
| Authenticate a User | `POST /auth/protected` |                                        | Access Token           |
| Refresh Tokens      | `POST /auth/refresh`   |                                        | Refresh Token          |
| Sign Out            | `POST /auth/logout`    |                                        | Refresh Token          |

### Testing

[Postman](https://www.postman.com/), a popular API platform, is a helpful tool to play around with and get used to the above APIs. Here are some sample collections that can be useful for testing these APIs:

- APIs: [Download here](https://gist.github.com/anhdau185/726c55cbf40cfef57a3ff377ee4576d9)
- Environment: [Download here](https://gist.github.com/anhdau185/11cbdbc976f7fc6de5b22564ef63b0ca)

## Roadmap

- [x] Authentication with Local Strategy
- [x] JWT Authentication with Refresh Tokens
- [x] Rotating & Invalidating Refresh Tokens
- [ ] User Authorization
  - [ ] Admin
  - [ ] User
  - [ ] Guest (Unauthorized)
- [ ] API versioning

See [open issues](https://github.com/anhdau185/auth-service/issues) for a full list of proposed features (and known issues).

## Contact

Hi I'm Anh Dau, author of this repo. You can reach out to me with the contact info at [thecodinglad.com/about](https://thecodinglad.com/about).

<!-- ## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request -->
