describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="switch-to-login"]').click();
  });

  it('should validate login form fields', () => {
    // Test empty form submission
    cy.get('[data-cy="login-submit-button"]').click();
    cy.get('.error').should('have.length', 2);
    cy.get('.error').should('contain', 'Username is required');
    cy.get('.error').should('contain', 'Password is required');
  });

  it('should handle successful login', () => {
    // Fill form with valid credentials
    cy.get('[data-cy="login-username-input"]').type('testuser');
    cy.get('[data-cy="login-password-input"]').type('password123');
    
    // Intercept login API call
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: {
        success: true,
        data: {
          id: '123',
          username: 'testuser',
          token: 'mock-jwt-token'
        }
      }
    }).as('loginUser');

    // Submit form
    cy.get('[data-cy="login-submit-button"]').click();
    
    // Check loading state
    cy.get('[data-cy="login-submit-button"]').should('be.disabled');
    cy.get('[data-cy="login-submit-button"]').should('contain', 'Logging in...');
    
    // Check success state
    cy.get('.success-message').should('exist');
    cy.get('.success-message h3').should('contain', 'Welcome back, testuser!');
  });

  it('should handle failed login', () => {
    // Fill form with invalid credentials
    cy.get('[data-cy="login-username-input"]').type('wronguser');
    cy.get('[data-cy="login-password-input"]').type('wrongpass');
    
    // Intercept login API call with error
    cy.intercept('POST', '/api/login', {
      statusCode: 401,
      body: {
        success: false,
        message: 'Invalid username or password'
      }
    }).as('loginUserError');

    // Submit form
    cy.get('[data-cy="login-submit-button"]').click();
    
    // Check error message
    cy.get('.error-message').should('contain', 'Invalid username or password');
  });

  it('should handle API error', () => {
    // Fill form with valid credentials
    cy.get('[data-cy="login-username-input"]').type('testuser');
    cy.get('[data-cy="login-password-input"]').type('password123');
    
    // Intercept login API call with server error
    cy.intercept('POST', '/api/login', {
      statusCode: 500,
      body: {
        success: false,
        error: 'Server error'
      }
    }).as('loginUserServerError');

    // Submit form
    cy.get('[data-cy="login-submit-button"]').click();
    
    // Check error message
    cy.get('.error-message').should('contain', 'Failed to login');
  });
}); 