/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

const api = Cypress.env('apiUrl');

Cypress.Commands.add('registerViaApi', (email: string, password: string, name: string) => {
    cy.request('POST', `${api}/auth/register`, {
      email,
      password,
      name,
    });
  });
  
  Cypress.Commands.add('loginViaApi', (email: string, password: string) => {
    cy.request('POST', `${api}/auth/login`, {
      email,
      password,
    }).then((res) => {
      window.localStorage.setItem('token', res.body.accessToken);
    });
  });

  Cypress.Commands.add("loginViaUI", (email: string, password: string) => {
    cy.visit("/login");
    cy.get("input#email").type(email);
    cy.get("input#password").type(password);
    cy.get('button[type="submit"]').contains("Login").click();

    cy.window().its("localStorage.token").should("exist");

    cy.url().should("include", "/dashboard");

    cy.contains("Welcome", { timeout: 10000 }).should("be.visible");

    cy.contains("button", "+ New Task").should("be.visible");
    cy.contains("button", "Logout").should("be.visible");
  });

  Cypress.Commands.add("clearAllTasks", () => {
    cy.get("body").then(($body) => {
      if ($body.find(".fixed.inset-0").length > 0) {
        cy.get(".fixed.inset-0").each(($modal) => {
          cy.wrap($modal).within(() => {
            cy.get("button").contains("×").click({ force: true });
          });
        });
      }
    });

    cy.wait(500);

    cy.get("body").then(($body) => {
      if ($body.find('button[title="Delete"]').length > 0) {
        cy.get('button[title="Delete"]').each(($deleteBtn) => {
          cy.wrap($deleteBtn).click();
          cy.get(".fixed.inset-0").within(() => {
            cy.get("button").contains("Delete").should("be.visible").click();
          });
          cy.contains("Task deleted successfully!").should("be.visible");
        });
      }
    });
  });

  Cypress.Commands.add("waitForModal", () => {
    cy.get(".fixed.inset-0").should("be.visible");
    cy.wait(300);
  });

  Cypress.Commands.add("ensureSingleModal", () => {
    cy.get("body").then(($body) => {
      const modalCount = $body.find(".fixed.inset-0").length;
      if (modalCount > 1) {
        cy.get(".fixed.inset-0")
          .not(":last")
          .each(($modal) => {
            cy.wrap($modal).within(() => {
              cy.get("button").contains("×").click({ force: true });
            });
          });
        cy.wait(300);
      }
    });
  });
  


