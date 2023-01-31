# Running a development build locally
The development environment of the application is not yet containerized and it requires a few steps to get started. Make sure you have docker and docker-compose installed since the database is run inside a container.

1. Clone the repository `git clone https://github.com/JuanitoSebastian/City-Bike-Journeys.git`
2. Configure details for the development database. A database instance for development can be launched using [`docker-compose.dev.yml`](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docker-compose.dev.yml) at the root of the repository. You can change the password, user and name of the database by editing the .yml file. Start the development database by running `docker-compose -f docker-compose.dev.yml up` in the root of the repository.
3. Create an `.env.development` file in the `/backend` directory with the following structure:

`/backend/.env.development:`
```
POSTGRES_URI=postgresql://localhost:8000
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PW=example
PORT=3000
```
- `POSTGRES_URI`: PostgreSQL connection URI. Format: postgresql://host:port
- `POSTGRES_DB`: Name of Postgres database
- `POSTGRES_USER`: Name of Postgres user
- `POSTGRES_PW`: Password for Postgres user
- `PORT`: What port the back end should use

Make sure the details in the `.env.development` file match the ones in the `docker-compose.dev.yml` file.

4. Create an `.env` file in the `/frontend` directory with the following structure:

`/frontend/.env`:
```
API_URL=http://localhost:3000
```
- `API_URL`: Url to the back end service.

5. Open a terminal and run `npm install` in the `/backend` directory.
6. In the same terminal run `npm run dev` in the `/backend` directory.
7. Open another terminal and run `npm install` in the `/frontend` directory.
8. In the same terminal run `npm run dev` in the `/frontend` directory.
9. The back end should now be running on `localhost:3000` and the front end on `localhost:8080`.

# Testing the app locally
## Back end unit & integration tests
Make sure you have docker and docker-compose installed since the database is run inside a container.

1. Clone the repository `git clone https://github.com/JuanitoSebastian/City-Bike-Journeys.git`
2. Configure details for the testing database. A database instance for testing can be launched using [`docker-compose.dev.yml`](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docker-compose.dev.yml) at the root of the repository. You can change the password, user and name of the database by editing the .yml file. Start the testing database by running `docker-compose -f docker-compose.dev.yml up` in the root of the repository.
3. Create an `.env.test` file in the `/backend` directory with the following structure:

`/backend/.env.test:`
```
POSTGRES_URI=postgresql://localhost:8000
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PW=example
PORT=3000
```
- `POSTGRES_URI`: PostgreSQL connection URI. Format: postgresql://host:port
- `POSTGRES_DB`: Name of Postgres database
- `POSTGRES_USER`: Name of Postgres user
- `POSTGRES_PW`: Password for Postgres user
- `PORT`: What port the back end should use

Make sure the details in the `.env.test` file match the ones in the `docker-compose.dev.yml` file.

5. Open a terminal and run `npm install` in the `/backend` directory.
6. In the same terminal run `npm run test` in the `/backend` directory.