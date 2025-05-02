describe('UI Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have correct form layout and styling', () => {
    // Check form container
    cy.get('.registration-form').should('be.visible');
    cy.get('.registration-form').should('have.css', 'background-color', 'rgb(58, 63, 75)');
    cy.get('.registration-form').should('have.css', 'border-radius', '8px');
    
    // Check form elements
    cy.get('h1').should('contain', 'User Registration');
    cy.get('form').should('exist');
    cy.get('input').should('have.length', 4);
    cy.get('button').should('have.length', 1);
  });

  it('should show proper error styling', () => {
    // Test error input styling
    cy.get('[data-cy="username-input"]').type('admin');
    cy.get('[data-cy="username-input"]').should('have.class', 'error-input');
    cy.get('.error').should('have.css', 'color', 'rgb(255, 107, 107)');
  });

  it('should show proper success message styling', () => {
    // Fill and submit form
    cy.get('[data-cy="username-input"]').type('testuser');
    cy.get('[data-cy="email-input"]').type('test@example.com');
    cy.get('[data-cy="password-input"]').type('password123');
    cy.get('[data-cy="confirm-password-input"]').type('password123');
    cy.get('[data-cy="submit-button"]').click();
    
    // Check success message styling
    cy.get('.success-message').should('be.visible');
    cy.get('.success-message').should('have.css', 'background-color', 'rgb(76, 175, 80)');
    cy.get('.success-message').should('have.css', 'border-radius', '8px');
  });

  it('should show proper button states', () => {
    // Check default button state
    cy.get('[data-cy="submit-button"]').should('not.be.disabled');
    cy.get('[data-cy="submit-button"]').should('have.css', 'background-color', 'rgb(97, 218, 251)');
    
    // Fill form and check button during submission
    cy.get('[data-cy="username-input"]').type('testuser');
    cy.get('[data-cy="email-input"]').type('test@example.com');
    cy.get('[data-cy="password-input"]').type('password123');
    cy.get('[data-cy="confirm-password-input"]').type('password123');
    cy.get('[data-cy="submit-button"]').click();
    
    // Check disabled button state
    cy.get('[data-cy="submit-button"]').should('be.disabled');
    cy.get('[data-cy="submit-button"]').should('have.css', 'background-color', 'rgb(204, 204, 204)');
  });
}); 