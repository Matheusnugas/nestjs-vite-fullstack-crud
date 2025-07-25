declare namespace Cypress {
  interface Chainable {
    registerViaApi(email: string, password: string, name: string): Chainable<void>;
    loginViaApi(email: string, password: string): Chainable<void>;
    loginViaUI(email: string, password: string): Chainable<void>;
    clearAllTasks(): Chainable<void>;
    waitForModal(): Chainable<void>;
    ensureSingleModal(): Chainable<void>;
  }
}