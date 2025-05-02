describe('Registration Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="switch-to-register"]').click();
  });

  it('should display the registration form', () => {
    cy.get('h1').should('contain', 'Authentication Demo');
    cy.get('form').should('exist');
    cy.get('[data-cy="username-input"]').should('exist');
    cy.get('[data-cy="email-input"]').should('exist');
    cy.get('[data-cy="password-input"]').should('exist');
    cy.get('[data-cy="confirm-password-input"]').should('exist');
  });

  it('should show error messages for empty form submission', () => {
    cy.get('[data-cy="submit-button"]').click();
    
    cy.get('.error').should('have.length', 3);
    cy.get('.error').should('contain', 'Username is required');
    cy.get('.error').should('contain', 'Email is required');
    cy.get('.error').should('contain', 'Password is required');
  });

  it('should show error when passwords do not match', () => {
    cy.get('[data-cy="username-input"]').type('testuser');
    cy.get('[data-cy="email-input"]').type('test@example.com');
    cy.get('[data-cy="password-input"]').type('password123');
    cy.get('[data-cy="confirm-password-input"]').type('differentpassword');
    cy.get('[data-cy="submit-button"]').click();
    
    cy.get('.error').should('contain', 'Passwords do not match');
  });

  it('should successfully submit the form with valid data', () => {
    // Fill form with valid data
    cy.get('[data-cy="username-input"]').type('testuser');
    cy.get('[data-cy="email-input"]').type('test@example.com');
    cy.get('[data-cy="password-input"]').type('password123');
    cy.get('[data-cy="confirm-password-input"]').type('password123');
    
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

    // Submit form
    cy.get('[data-cy="submit-button"]').click();
    
    // Check loading state
    cy.get('[data-cy="submit-button"]').should('be.disabled');
    cy.get('[data-cy="submit-button"]').should('contain', 'Registering...');
    
    // Check success state
    cy.get('.success-message').should('exist');
    cy.get('.success-message h3').should('contain', 'Registration Successful!');
  });

  it('should validate email format', () => {
    cy.get('[data-cy="username-input"]').type('testuser');
    cy.get('[data-cy="email-input"]').type('invalid-email');
    cy.get('[data-cy="password-input"]').type('password123');
    cy.get('[data-cy="confirm-password-input"]').type('password123');
    cy.get('[data-cy="submit-button"]').click();
    
    cy.get('.error').should('contain', 'Email is required');
  });
}); 