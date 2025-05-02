describe('API Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should handle username availability API calls', () => {
    // Intercept username validation API call
    cy.intercept('GET', '/api/validate-username*', {
      statusCode: 200,
      body: { available: false }
    }).as('validateUsername');

    // Type username and wait for API call
    cy.get('[data-cy="username-input"]').type('admin');
    cy.wait('@validateUsername');
    cy.get('.error').should('contain', 'Username is not available');

    // Test available username
    cy.intercept('GET', '/api/validate-username*', {
      statusCode: 200,
      body: { available: true }
    }).as('validateUsernameAvailable');

    cy.get('[data-cy="username-input"]').clear().type('newuser');
    cy.wait('@validateUsernameAvailable');
    cy.get('.error').should('not.contain', 'Username is not available');
  });

  it('should handle registration API success', () => {
    // Intercept registration API call
    cy.intercept('POST', '/api/register', {
      statusCode: 200,
      body: {
        success: true,
        data: {
          id: '123',
          username: 'testuser',
          email: 'test@example.com',
          createdAt: new Date().toISOString()
        }
      }
    }).as('registerUser');

    // Fill and submit form
    cy.get('[data-cy="username-input"]').type('testuser');
    cy.get('[data-cy="email-input"]').type('test@example.com');
    cy.get('[data-cy="password-input"]').type('password123');
    cy.get('[data-cy="confirm-password-input"]').type('password123');
    cy.get('[data-cy="submit-button"]').click();

    // Wait for API call and check success
    cy.wait('@registerUser');
    cy.get('.success-message').should('exist');
  });

  it('should handle registration API failure', () => {
    // Intercept registration API call with error
    cy.intercept('POST', '/api/register', {
      statusCode: 500,
      body: {
        success: false,
        error: 'Server error'
      }
    }).as('registerUserError');

    // Fill and submit form
    cy.get('[data-cy="username-input"]').type('testuser');
    cy.get('[data-cy="email-input"]').type('test@example.com');
    cy.get('[data-cy="password-input"]').type('password123');
    cy.get('[data-cy="confirm-password-input"]').type('password123');
    cy.get('[data-cy="submit-button"]').click();

    // Wait for API call and check error message
    cy.wait('@registerUserError');
    cy.get('.error-message').should('contain', 'Failed to register');
  });
}); 