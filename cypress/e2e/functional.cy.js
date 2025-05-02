describe('Functional Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should validate form fields', () => {
    // Test empty form submission
    cy.get('[data-cy="submit-button"]').click();
    cy.get('.error').should('have.length', 3);
    
    // Test password mismatch
    cy.get('[data-cy="password-input"]').type('password123');
    cy.get('[data-cy="confirm-password-input"]').type('different123');
    cy.get('[data-cy="submit-button"]').click();
    cy.get('.error').should('contain', 'Passwords do not match');
  });

  it('should handle username availability check', () => {
    // Test unavailable username
    cy.get('[data-cy="username-input"]').type('admin');
    cy.get('.error').should('contain', 'Username is not available');
    
    // Test available username
    cy.get('[data-cy="username-input"]').clear().type('newuser');
    cy.get('.error').should('not.contain', 'Username is not available');
  });

  it('should handle form submission states', () => {
    // Fill form with valid data
    cy.get('[data-cy="username-input"]').type('testuser');
    cy.get('[data-cy="email-input"]').type('test@example.com');
    cy.get('[data-cy="password-input"]').type('password123');
    cy.get('[data-cy="confirm-password-input"]').type('password123');
    
    // Submit form
    cy.get('[data-cy="submit-button"]').click();
    
    // Check loading state
    cy.get('[data-cy="submit-button"]').should('be.disabled');
    cy.get('[data-cy="submit-button"]').should('contain', 'Registering...');
    
    // Check success state
    cy.get('.success-message').should('exist');
    cy.get('.success-message h2').should('contain', 'Registration Successful!');
  });
}); 