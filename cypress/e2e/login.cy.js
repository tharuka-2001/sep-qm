/// <reference types="cypress" />

describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('Login').click();
  });

  it('Member 1: valid credentials', () => {
    cy.intercept('POST', '/api/login', { fixture: 'loginSuccess.json', statusCode: 200 }).as('loginReq');
    cy.get('[data-cy="login-username-input"]').type('testuser');
    cy.get('[data-cy="login-password-input"]').type('password123');
    cy.get('[data-cy="login-submit-button"]').click();
    cy.wait('@loginReq').its('response.statusCode').should('eq', 200);
  });

  it('Member 1: invalid credentials', () => {
    cy.intercept('POST', '/api/login', { fixture: 'loginFailure.json', statusCode: 401 }).as('loginFail');
    cy.get('[data-cy="login-username-input"]').type('wronguser');
    cy.get('[data-cy="login-password-input"]').type('wrongpass');
    cy.get('[data-cy="login-submit-button"]').click();
    cy.wait('@loginFail');
    cy.get('[data-cy="error-message"]').should('contain', 'Invalid username or password');
  });
});
