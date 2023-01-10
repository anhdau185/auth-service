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

Create a `.env` file by copying the project's sample file `.env.dev` (for local development):

```sh
cp .env.dev .env
```

and fill out the empty fields in it with your values of choice.

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

## Using Docker

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

1. Pull the necessary images from Docker Hub to your local machine

```sh
# postgres image
docker pull postgres:13-alpine

# backend app image
docker pull anhdau185/auth-service:latest
```

2. Configuration

Create a `.env` file by copying the project's sample file `.env.prod` (for production deployment):

```sh
cp .env.prod .env
```

and fill out the empty fields in it with your values of choice.

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
docker exec app yarn migration:run
```

5. Stop the service

If you'd want to stop (and then remove) the service's running containers as a whole, run the command:

```sh
docker compose down
```

### How to build the backend app container locally to test your code changes

1. Remove the existing Docker image to avoid a duplicate

Run this command and get the image ID of `anhdau185/auth-service:latest`:

```sh
docker images
```

and then remove that image with the ID you obtained:

```sh
docker rmi <image_ID>
```

2. Rebuild the image

Rebuild the image under the name `anhdau185/auth-service:latest`:

```sh
docker build --tag anhdau185/auth-service:latest .
```

Run the service with `docker compose` as normal.

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

[Postman](https://www.postman.com/), a popular API platform, is a helpful tool to play around with and get used to the above APIs. Here are some useful collections for testing:

- APIs: [Download here](https://gist.github.com/anhdau185/726c55cbf40cfef57a3ff377ee4576d9)
- Environment: [Download here](https://gist.github.com/anhdau185/11cbdbc976f7fc6de5b22564ef63b0ca)

<!-- ## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com -->
