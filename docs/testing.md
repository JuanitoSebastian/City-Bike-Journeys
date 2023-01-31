# Testing
The application features unit and integration tests in the back end. There are also end-to-end tests that can be run with cypress.

## Unit and integration testing of the back end
These tests can be found in the [`/backend/src/tests`](https://github.com/JuanitoSebastian/City-Bike-Journeys/tree/main/backend/src/tests) directory. Testing includes:
- Checking data is validated correctly
- Checking that data from .csv files is saved correctly to the database
- Checking that the endpoints of the API return information as expected and in the correct format.

![Screenshot of testing report](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/images/backend_tests.png?raw=true)

### Running the tests
1. Start by setting up a [testing environment](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/dev_and_testing.md).
2. Open a terminal and run `npm run test` in the `/backend` directory.

## End-to-end testing of the application
These tests can be found in the [`/frontend/cypress/e2e`](https://github.com/JuanitoSebastian/City-Bike-Journeys/tree/main/frontend/cypress/e2e) directory.

![Screenshot of e2e tests](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/images/e2e_tests.png?raw=true)

### Running the tests
1. Start by setting up a [testing environment](https://github.com/JuanitoSebastian/City-Bike-Journeys/blob/main/docs/dev_and_testing.md).
2. Open a terminal and run `npm run test:e2e` in the `/backend` directory
3. Open a new terminal and run `npm run dev` in the `/frontend` directory
4. Open a new terminal and run `npm run cypress:open` in the `/frontend` directory
5. Once cypress opens, select E2E Testing and select you preferred browser
6. A browser window should open. From there you can run the tests by selecting the `city_bike_journeys_app.cy.ts` file.

