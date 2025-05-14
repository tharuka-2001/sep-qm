/// <reference types="cypress" />

describe('Registration Flow', () => {
  beforeEach(() => {
    // Stub username‐availability checks so they never 404
    cy.intercept('GET', '/api/check-username/*', {
      fixture: 'checkUsernameAvailable.json',
      statusCode: 200
    }).as('checkUsername');

    // Visit and open the register form
    cy.visit('/');
    cy.contains('Register').click();
  });

  it('Member 2: valid registration', () => {
    // Stub the POST /api/register to always succeed
    cy.intercept('POST', '/api/register', {
      fixture: 'registerSuccess.json',
      statusCode: 200
    }).as('registerReq');

    // Catch and assert the JS alert
    cy.on('window:alert', (txt) => {
      expect(txt).to.equal('Registration successful! Please login.');
    });

    // Fill out the form fields
    cy.get('[data-cy="register-username-input"]').type('newuser');
    cy.wait('@checkUsername');

    cy.get('[data-cy="register-email-input"]').type('new@example.com');
    cy.get('[data-cy="register-password-input"]').type('pass1234');
    cy.get('[data-cy="register-confirm-password-input"]').type('pass1234');

    // Submit and verify the stubbed request
    cy.get('[data-cy="register-submit-button"]').click();
    cy.wait('@registerReq').its('response.statusCode').should('eq', 200);
  });

  it('Member 2: password mismatch', () => {
    // Fill out username and email so the fields aren't blank
    cy.get('[data-cy="register-username-input"]').type('newuser');
    cy.wait('@checkUsername');

    cy.get('[data-cy="register-email-input"]').type('new@example.com');

    // Intentionally mismatch passwords
    cy.get('[data-cy="register-password-input"]').type('pass1234');
    cy.get('[data-cy="register-confirm-password-input"]').type('wrongpass');

    // Submit and verify the error message
    cy.get('[data-cy="register-submit-button"]').click();
    cy.get('[data-cy="password-mismatch-error"]')
      .should('contain', 'Passwords do not match');
  });
});
