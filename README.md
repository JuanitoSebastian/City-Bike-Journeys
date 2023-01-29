# City Bike Journeys
A full stack application for viewing data about city bike journeys in the Helsinki region. This app is a submission for the [Solita Dev Academy 2023](https://github.com/solita/dev-academy-2023-exercise) pre-assignment. The assignment provided data on bike stations and bike trips in .csv format. This app parses the data and provides a web application for exploring statistics about trips and bike station usage.

City Bike Journeys is written using Typescript. The back end is an Express application. The front end is a Svelte3 app. The app is containerized using docker.

![Screenshot of City Bike Journeys app](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/images/station_view.png?raw=true)

## Running locally
1. Clone the repository
2. Create an .env file in the root of the repository with the [following structure](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/.env.example)
3. Run `docker compose up` in the root of the repository

Please note that when starting the app for the first time, the seeding of the database may take a few minutes. More information about seeding found [here](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/seeding.md).

## Documentation
[🏛 Architecture](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/architecture.md)\
[🌱 Seeding](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/seeding.md)\
[📡 API](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/api.md)\
[🧪 Testing](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/testing.md)