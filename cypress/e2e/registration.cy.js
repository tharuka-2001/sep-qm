describe('User Registration Form', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the registration form', () => {
    cy.get('h1').should('contain', 'User Registration');
    cy.get('form').should('exist');
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
    cy.get('[data-cy="username-input"]').type('testuser');
    cy.get('[data-cy="email-input"]').type('test@example.com');
    cy.get('[data-cy="password-input"]').type('password123');
    cy.get('[data-cy="confirm-password-input"]').type('password123');
    
    cy.get('[data-cy="submit-button"]').click();
    
    cy.get('.success-message').should('exist');
    cy.get('.success-message h2').should('contain', 'Registration Successful!');
    cy.get('.success-message p').should('contain', 'Welcome, testuser!');
  });

  it('should validate email format', () => {
    cy.get('[data-cy="email-input"]').type('invalid-email');
    cy.get('[data-cy="submit-button"]').click();
    
    cy.get('.error').should('contain', 'Email is required');
  });
}); 