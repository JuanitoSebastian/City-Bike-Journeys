/// <reference types="cypress" />
import axios from 'axios';

afterEach(async () => {
  // Reset DB after each test
  await axios.post('http://localhost:3000/test/reset');
});

describe('City Bike Journeys', () => {
  describe('Initial startup', () => {
    it('Loading spinner shown when DB not seeded', () => {
      cy.visit('http://localhost:8080');
      cy.contains('City Bike Journeys');
      cy.contains('Database is seeding.');
    });
  });

  describe('Database seeded', () => {
    beforeEach(async () => {
      await axios.post('http://localhost:3000/test/trips');
      await axios.post('http://localhost:3000/test/seedings');
    });

    describe('Stations view', () => {
      it('Stations view is shown when opening page', () => {
        cy.visit('http://localhost:8080');
        cy.contains('City Bike Journeys');
        cy.contains('Stations');
      });

      it('Stations sorted by id ascending on default', () => {
        cy.visit('http://localhost:8080');
        cy.get('table > tbody > tr:nth-child(1) > td:nth-child(1)').contains('001');
        cy.get('table > tbody > tr:nth-child(2) > td:nth-child(1)').contains('036');
        cy.get('table > tbody > tr:nth-child(3) > td:nth-child(1)').contains('043');
      });

      it('Stations sorted by id descending when selected', () => {
        cy.visit('http://localhost:8080');
        cy.get('#order').select('Descending');
        cy.get('table > tbody > tr:nth-child(1) > td:nth-child(1)').contains('043');
        cy.get('table > tbody > tr:nth-child(2) > td:nth-child(1)').contains('036');
        cy.get('table > tbody > tr:nth-child(3) > td:nth-child(1)').contains('001');
      });

      it('Stations sorted by name when selected', () => {
        cy.visit('http://localhost:8080');
        cy.get('#order_by').select('Name');
        cy.get('table > tbody > tr:nth-child(1) > td:nth-child(2)').contains('Apollonkatu');
        cy.get('table > tbody > tr:nth-child(2) > td:nth-child(2)').contains('Kaivopark');
        cy.get('table > tbody > tr:nth-child(3) > td:nth-child(2)').contains('Karhupuisto');
      });

      it('Clicking table row takes user to station page', () => {
        cy.visit('http://localhost:8080');
        cy.get('table > tbody > tr:nth-child(1)').click();
        cy.location().should((location) => {
          expect(location.href).to.eq('http://localhost:8080/stations/001');
        });
      });
    });

    describe('Single station view', () => {
      it('Station id, name, address and city is displayed on page', () => {
        cy.visit('http://localhost:8080/stations/001');
        cy.contains('001 Kaivopark');
        cy.contains('Meritori 1, Helsinki');
      });

      it('Station statistics shown without filtering on default', () => {
        cy.visit('http://localhost:8080/stations/001');
        cy.get('#station-capacity').contains('30 bikes');
        cy.get('#station-departures-count').contains('2');
        cy.get('#station-arrivals-count').contains('1');
        cy.get('#station-departures-avg-distance').contains('2.85 km');
        cy.get('#station-arrivals-avg-distance').contains('2.04 km');
      });

      it('Setting dates filters statistics', () => {
        cy.visit('http://localhost:8080/stations/001');
        cy.get('#start').type('2021-06-30T00:00');
        cy.get('#end').type('2021-07-08T00:00');
        cy.get('#station-capacity').contains('30 bikes');
        cy.get('#station-departures-count').contains('1');
        cy.get('#station-arrivals-count').contains('0');
        cy.get('#station-departures-avg-distance').contains('4.01 km');
      });

      it('Setting invalid datetimerange does not affect statistics', () => {
        cy.visit('http://localhost:8080/stations/001');
        cy.get('#start').type('2021-06-30T00:00');
        cy.get('#end').type('2021-06-08T00:00');
        cy.get('#station-capacity').contains('30 bikes');
        cy.get('#station-departures-count').contains('2');
        cy.get('#station-arrivals-count').contains('1');
        cy.get('#station-departures-avg-distance').contains('2.85 km');
        cy.get('#station-arrivals-avg-distance').contains('2.04 km');
      });
    });

    describe('Trips view', () => {
      it('Trips sorted by start time from oldest to newest', () => {
        cy.visit('http://localhost:8080/trips');
        cy.get('table > tbody > tr:nth-child(1) > td:nth-child(1)').contains('23.53 31.5.2021');
        cy.get('table > tbody > tr:nth-child(2) > td:nth-child(1)').contains('23.57 31.5.2021');
        cy.get('table > tbody > tr:nth-child(3) > td:nth-child(1)').contains('23.59 30.6.2021');
        cy.get('table > tbody > tr:nth-child(4) > td:nth-child(1)').contains('23.59 31.7.2021');
        cy.get('table > tbody > tr:nth-child(5) > td:nth-child(1)').contains('23.59 31.7.2021');
        
      });
    });

  });

});