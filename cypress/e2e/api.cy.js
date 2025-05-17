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

    // Ensure we're on the correct page before each test
    cy.visit('http://localhost:3000', {
      failOnStatusCode: false,
      timeout: 10000
    });
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

  // Login Tests
  describe('Login API', () => {
    it('should handle valid login credentials', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/api/login',
        body: {
          username: 'testuser',
          password: 'password123'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('success', true);
        expect(response.body.data).to.have.property('token');
      });
    });

    it('should handle invalid login credentials', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/api/login',
        body: {
          username: 'wronguser',
          password: 'wrongpass'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body).to.have.property('success', false);
        expect(response.body).to.have.property('message', 'Invalid username or password');
      });
    });

    it('should handle missing credentials', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/api/login',
        body: {},
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('success', false);
      });
    });
  });

  // Registration Tests
  describe('Registration API', () => {
    it('should handle valid registration data', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/api/register',
        body: {
          username: 'newuser',
          email: 'new@example.com',
          password: 'password123'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('success', true);
        expect(response.body).to.have.property('message', 'Registration successful! Please login.');
      });
    });

    it('should handle invalid email format', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/api/register',
        body: {
          username: 'newuser',
          email: 'invalid-email',
          password: 'password123'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('success', false);
      });
    });

    it('should handle short password', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/api/register',
        body: {
          username: 'newuser',
          email: 'new@example.com',
          password: '123'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('success', false);
      });
    });
  });

  // Username Availability Tests
  describe('Username Availability API', () => {
    it('should check available username', () => {
      // First ensure the page is loaded
      cy.url().should('not.include', 'about:blank');
      
      cy.request({
        method: 'GET',
        url: 'http://localhost:5000/api/check-username/newuser',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('available', true);
      });
    });

    it('should check unavailable username', () => {
      // First ensure the page is loaded
      cy.url().should('not.include', 'about:blank');
      
      cy.request({
        method: 'GET',
        url: 'http://localhost:5000/api/check-username/testuser',
        failOnStatusCode: false
      }).then((response) => {
        // Log the response for debugging
        cy.log('Response:', response.body);
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('available', false);
      });
    });

    it('should handle invalid username format', () => {
      // First ensure the page is loaded
      cy.url().should('not.include', 'about:blank');
      
      cy.request({
        method: 'GET',
        url: 'http://localhost:5000/api/check-username/a',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('success', false);
      });
    });
  });
});
