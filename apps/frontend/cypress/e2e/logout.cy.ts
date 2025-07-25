describe('Auth - Logout Flow', () => {
    const email = `cypress_${Date.now()}@test.com`;
    const password = 'Test123!';
    const name = 'Cypress Logout User';
  
    before(() => {
      cy.registerViaApi(email, password, name);
    });
  
    beforeEach(() => {
      cy.loginViaApi(email, password);
      cy.visit('/dashboard');
    });
  
    it('should logout the user through confirmation modal', () => {

      cy.contains('button', 'Logout').click();

      cy.contains('Tem certeza que deseja sair?').should('be.visible');

      cy.get('.fixed.inset-0').within(() => {
        cy.contains('button', 'Logout').click();
      });
  
      cy.url().should('include', '/login');

      cy.window().its('localStorage.token').should('be.undefined');
    });
  });
  