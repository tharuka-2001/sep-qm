// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.get('[data-cy="switch-to-login"]').click();
  cy.get('[data-cy="login-username-input"]').type(username);
  cy.get('[data-cy="login-password-input"]').type(password);
  cy.get('[data-cy="login-submit-button"]').click();
});

Cypress.Commands.add('register', (userData) => {
  cy.visit('/');
  cy.get('[data-cy="switch-to-register"]').click();
  cy.get('[data-cy="username-input"]').type(userData.username);
  cy.get('[data-cy="email-input"]').type(userData.email);
  cy.get('[data-cy="password-input"]').type(userData.password);
  cy.get('[data-cy="confirm-password-input"]').type(userData.confirmPassword);
  cy.get('[data-cy="submit-button"]').click();
});

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })