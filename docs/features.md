# Completed features
### Data validation
- Import data from .csv files and validate ✔️
  - Data used for seeding can be changed easily because of `seeding.yml`
  - See [seeding](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/seeding.md)

### Trips view
- Trips view lists all journeys in the database and provides pagination ✔️
- Trips view shows departure and return station names, covered distance in km and duration in minutes ✔️

### Stations view
- Stations view lists all stations in the database and provides pagination ✔️
- Stations can be ordered by id or by name. Order can be ascending or descending ✔️

### Single station view
- Single station view displays station name, address and city ✔️
- Single station view shows statistics: capacity, number of departures, number of arrivals, arrival avg. distance and departure avg. distance ✔️
- Single station view statistics can be filtered by a given time range ✔️

### Development and testing
- Application dockerized using docker-compose ✔️
- Application deployed to the cloud: AWS EC2 ✔️
- Unit, integration and e2e level testing ✔️
  - See [testing](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/testing.md)

### API
- Endpoints feature parameter for setting preferred language ✔️
  - Changing the language can be implemented in the front end in the future
  - See [API](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/api.md)

## Future improvements
- Sorting in Trips view
- Eliminate duplicate code from e2e tests
- Creation of Ci/Cd pipeline using GitHub Actions
  - On push to dev: Lint => Unit & Integration Tests => E2E Tests
  - On merge to main: Deployment to AWS EC2
Implement changing the language to front end