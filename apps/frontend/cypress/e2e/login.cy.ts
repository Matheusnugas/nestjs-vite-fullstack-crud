describe('Auth - Login Flow', () => {
    const email = `cypress_${Date.now()}@test.com`;
    const password = 'Test123!';
    const name = 'Cypress Login User';
  
    before(() => {
      cy.registerViaApi(email, password, name);
    });
  
    it('should login successfully and redirect to dashboard', () => {
      cy.loginViaUI(email, password);

      cy.contains(`Welcome, ${name}`, { timeout: 10000 }).should("be.visible");
    });

    it('should handle authentication state correctly', () => {
      cy.loginViaUI(email, password);
      
      cy.window().its("localStorage.token").should("exist");

      cy.contains(`Welcome, ${name}`).should("be.visible");

      cy.url().should("include", "/dashboard");
      
      cy.contains('button', '+ New Task').should('be.visible');
      cy.contains('button', 'Logout').should('be.visible');
    });
  
    it('should logout successfully after login', () => {
      cy.loginViaUI(email, password);
      
      cy.wait(1000);
      
      cy.get('button').then(($buttons) => {
        const logoutButton = $buttons.filter((i, el) => 
          el.textContent?.includes('Logout') || false
        );
        
        if (logoutButton.length > 0) {
          cy.wrap(logoutButton.first()).click();
        } else {
          throw new Error('Logout button not found');
        }
      });
      
      cy.contains('Tem certeza que deseja sair?').should('be.visible');
      
      cy.get('.fixed.inset-0').within(() => {
        cy.contains('button', 'Logout').click();
      });

      cy.url().should('include', '/login');
      
      cy.window().its('localStorage.token').should('not.exist');
    });
  });
  