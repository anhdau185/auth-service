# Auth Service

Reliable, lightweight, dedicated JWT authentication as a microservice that provides separation of authentication concerns and brings scalibility to a distributed system.

Built with ❤️ and the [NestJS](https://nestjs.com/) framework.

<!-- PROJECT SHIELDS - TBD -->

## Getting Started

The following is a guide to setting up the service locally.

### Prerequisites

- **Node.js 16** installed. You can use `v16.14.2` as recommended by the project.
- **Yarn** package manager. Install it with:

```sh
npm install -g yarn
```

- **PostgreSQL 13** installed, with the database server running on your `localhost`, port `5432`.

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

Create a `.env` file at the project's root directory with the following values:

```
MODE=dev
HOST=localhost
PORT=3000
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=auth_service_dev
JWT_SECRET_KEY=your_secret_key_of_choice
JWT_EXPIRATION_TIME=300
JWT_REFRESH_SECRET_KEY=your_refresh_secret_key_of_choice
JWT_REFRESH_EXPIRATION_TIME=1800
```

4. Set up the database

Create a development database:

```sh
createdb auth_service_dev
```

Build project and then run migrations:

```sh
yarn build && yarn migration:run
```

5. Run the service in _watch mode_

```sh
yarn start:dev
```

Now you should be ready to consume the service!

<!-- ## Alternative Setup: The Docker Way

This service can also run as a containerized application. In fact, this is the preferable way in which the service should be deployed and run in a production environment because of the portability (and many more advantages) that containers provide.

The following is an alternative setup guide using Docker containers.

(TBD) -->

## Usage

### API Endpoints

(TBD)

### Testing

[Postman](https://www.postman.com/), a popular API platform, is a helpful tool to get used to the endpoints exposed from the service. Here are some useful Postman collections for testing:

- APIs: (TBD)
- Environment variables: (TBD)

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
