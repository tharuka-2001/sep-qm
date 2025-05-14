/// <reference types="cypress" />

describe('Navigation Flow', () => {
  it('Member 3: valid navigation', () => {
    cy.visit('/');
    cy.get('[data-cy="nav-login"]').click();
    cy.url().should('include', '/login');
    cy.get('[data-cy="nav-register"]').click();
    cy.url().should('include', '/register');
  });

  it('Member 3: invalid navigation', () => {
    cy.visit('/nonexistent');
    cy.contains('404 - Page Not Found').should('exist');
  });
});
