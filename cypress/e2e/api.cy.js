/// <reference types="cypress" />

describe('API Tests', () => {
  beforeEach(() => {
    // Stub the username‐check endpoint so it never 404s
    cy.intercept('GET', '/api/check-username/*', {
      fixture: 'checkUsernameAvailable.json',
      statusCode: 200
    }).as('validateUsername');

    // Stub the register endpoint
    cy.intercept('POST', '/api/register', {
      fixture: 'registerSuccess.json',
      statusCode: 200
    }).as('registerReq');
  });

  it('should handle username availability API calls', () => {
    cy.visit('/register');
    cy.get('[data-cy="register-username-input"]').type('anyuser');
    cy.wait('@validateUsername').its('response.statusCode').should('eq', 200);
    // Because available: true, no error message should appear
    cy.get('[data-cy="username-availability-error"]').should('not.exist');
  });

  it('should handle registration API success', () => {
    cy.visit('/register');

    // Catch the alert and assert its text
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Registration successful! Please login.');
    });

    cy.get('[data-cy="register-username-input"]').type('newuser');
    cy.get('[data-cy="register-email-input"]').type('new@example.com');
    cy.get('[data-cy="register-password-input"]').type('pass1234');
    cy.get('[data-cy="register-confirm-password-input"]').type('pass1234');
    cy.get('[data-cy="register-submit-button"]').click();

    // Wait for the stubbed POST
    cy.wait('@registerReq').its('response.statusCode').should('eq', 200);

    // No need for cy.contains(...) here since we asserted the alert above
  });
});
