describe('Auth - Registration Flow', () => {
    const email = `cypress_${Date.now()}@test.com`;
    const password = 'Test123!';
    const name = 'Cypress User';
  
    it('should register a new user and redirect to dashboard', () => {
      cy.visit('/register');

      cy.get('input#name').type(name);
      cy.get('input#email').type(email);
      cy.get('input#password').type(password);
  
      cy.get('button[type="submit"]').contains('Sign Up').click();
  
      cy.contains('Welcome', { timeout: 5000 }).should('be.visible');
      cy.url().should('include', '/dashboard');
  
      cy.contains('button', 'Logout').click();
      cy.contains('Tem certeza que deseja sair?').should('be.visible');
      cy.get('.fixed.inset-0').within(() => {
        cy.contains('button', 'Logout').click();
      });
      cy.url().should('include', '/login');
    });
  });
  