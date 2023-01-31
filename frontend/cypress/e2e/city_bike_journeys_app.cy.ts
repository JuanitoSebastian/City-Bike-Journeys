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
    
  });

});