# City Bike Journeys
A full stack application for viewing data about city bike journeys in the Helsinki region. This app is a submission for the [Solita Dev Academy 2023](https://github.com/solita/dev-academy-2023-exercise) pre-assignment. The assignment provided data on bike stations and bike trips in .csv format. This app parses the data and provides a web application for exploring statistics about trips and bike station usage. City Bike Journeys is written using Typescript. The back end is an Express application. The front end is a Svelte3 app. The app is containerized using Docker.

The app is running live on an Amazon EC2 instance, try it out:\
[http://journeys.juan.fi](http://journeys.juan.fi)

![Screenshot of City Bike Journeys app](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/images/station_view.png?raw=true)

## Running a production build
1. Clone the repository by running `git clone https://github.com/JuanitoSebastian/City-Bike-Journeys.git`
2. Create an .env file in the root of the repository with the following structure:

`/.env`:
```
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PW=example
```
The [.env.example](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/.env.example) file can be used as a starting point.

3. Open terminal at the root of the repository and run `docker compose up`
4. The application launches at `localhost:80`

Please note that when starting the app for the first time, the seeding of the database may take a few minutes. More information about seeding found [here](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/seeding.md).

## Documentation & links
**Docs**\
[✅ Completed Features](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/features.md)\
[🏛 Architecture](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/architecture.md)\
[🌱 Seeding](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/seeding.md)\
[📡 API](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/api.md)\
[🧑‍💻 Running Local Dev & Testing Environment](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/dev_and_testing.md)\
[🧪 Testing](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/testing.md)

**Links**\
[🌎 Deployment on AWS EC2](http://journeys.juan.fi)\
[💅 Initial Figma Designs](https://www.figma.com/file/TiDksTjWUzM8KkQDLLZt5Z/Page?node-id=0%3A1&t=xjSsGOedzQp3IOEv-1)