describe('Tasks Management Flow', () => {
  const email = `cypress_tasks_${Date.now()}@test.com`;
  const password = 'Test123!';
  const name = 'Cypress Tasks User';

  before(() => {
    cy.registerViaApi(email, password, name);
  });

  beforeEach(() => {
    cy.loginViaUI(email, password);
    cy.clearAllTasks();
  });

  it("should create a new task successfully", () => {
    cy.contains("button", "+ New Task").click();
    cy.waitForModal();

    cy.get(".fixed.inset-0")
      .last()
      .within(() => {
        cy.get('input[placeholder="Task title"]')
          .first()
          .type("Test Task Title", { force: true });
        cy.get('textarea[placeholder="Task description (required)"]')
          .first()
          .type("This is a test task description", { force: true });
        cy.get('button[type="submit"]').first().click({ force: true });
      });

    cy.contains("Task created successfully!").should("be.visible");

    cy.contains("Test Task Title").should("be.visible");
    cy.contains("This is a test task description").should("be.visible");
    cy.contains("PENDING").should("be.visible");
  });

  it("should create a task with title and description (both required)", () => {
    cy.contains("button", "+ New Task").click();
    cy.waitForModal();

    cy.get(".fixed.inset-0")
      .last()
      .within(() => {
        cy.get('input[placeholder="Task title"]')
          .first()
          .type("Task with title and description", { force: true });
        cy.get('textarea[placeholder="Task description (required)"]')
          .first()
          .type("This is a required description", { force: true });
        cy.get('button[type="submit"]').first().click({ force: true });
      });

    cy.contains("Task created successfully!").should("be.visible");

    cy.contains("Task with title and description").should("be.visible");
    cy.contains("This is a required description").should("be.visible");
    cy.contains("PENDING").should("be.visible");
  });

  it("should show validation error when only title is provided", () => {
    cy.contains("button", "+ New Task").click();
    cy.waitForModal();

    cy.get(".fixed.inset-0")
      .last()
      .within(() => {
        cy.get('input[placeholder="Task title"]')
          .first()
          .type("Task with only title", { force: true });
        cy.get('button[type="submit"]').first().click({ force: true });
      });

    cy.contains("Description is required.", { timeout: 10000 }).should("exist");
  });

  it("should show validation errors for empty form", () => {
    cy.contains("button", "+ New Task").click();
    cy.waitForModal();

    cy.get(".fixed.inset-0")
      .last()
      .within(() => {
        cy.get('button[type="submit"]').first().click({ force: true });
      });

    cy.contains("Title and description cannot both be empty.", {
      timeout: 10000,
    }).should("exist");
  });

  it("should mark task as completed", () => {
    cy.contains("button", "+ New Task").click();
    cy.waitForModal();
    cy.get(".fixed.inset-0")
      .last()
      .within(() => {
        cy.get('input[placeholder="Task title"]')
          .first()
          .type("Task to complete", { force: true });
        cy.get('textarea[placeholder="Task description (required)"]')
          .first()
          .type("This task will be marked as completed", { force: true });
        cy.get('button[type="submit"]').first().click({ force: true });
      });
    cy.contains("Task created successfully!").should("be.visible");

    cy.contains("Task to complete")
      .closest("li")
      .within(() => {
        cy.get('button[title="Complete"]').click();
      });

    cy.contains("Task status updated!").should("be.visible");

    cy.contains("Task to complete").should("have.class", "line-through");
    cy.contains("COMPLETED").should("be.visible");
  });

  it("should mark completed task as pending", () => {
    cy.contains("button", "+ New Task").click();
    cy.waitForModal();
    cy.get(".fixed.inset-0")
      .last()
      .within(() => {
        cy.get('input[placeholder="Task title"]')
          .first()
          .type("Task to toggle", { force: true });
        cy.get('textarea[placeholder="Task description (required)"]')
          .first()
          .type("This task will be toggled", { force: true });
        cy.get('button[type="submit"]').first().click({ force: true });
      });
    cy.contains("Task created successfully!").should("be.visible");

    cy.contains("Task to toggle")
      .closest("li")
      .within(() => {
        cy.get('button[title="Complete"]').click();
      });
    cy.contains("Task status updated!").should("be.visible");

    cy.contains("Task to toggle")
      .closest("li")
      .within(() => {
        cy.get('button[title="Mark as Pending"]').click();
      });
    cy.contains("Task status updated!").should("be.visible");

    cy.contains("Task to toggle").should("not.have.class", "line-through");
    cy.contains("PENDING").should("be.visible");
  });

  it("should edit an existing task", () => {
    cy.contains("button", "+ New Task").click();
    cy.waitForModal();
    cy.get(".fixed.inset-0")
      .last()
      .within(() => {
        cy.get('input[placeholder="Task title"]')
          .first()
          .type("Original Title", { force: true });
        cy.get('textarea[placeholder="Task description (required)"]')
          .first()
          .type("Original description", { force: true });
        cy.get('button[type="submit"]').first().click({ force: true });
      });
    cy.contains("Task created successfully!").should("be.visible");

    cy.contains("Original Title")
      .closest("li")
      .within(() => {
        cy.get('button[title="Edit"]').click();
      });
    cy.waitForModal();

    cy.get(".fixed.inset-0")
      .last()
      .within(() => {
        cy.get('input[placeholder="Task title"]')
          .first()
          .clear({ force: true })
          .type("Updated Title", { force: true });
        cy.get('textarea[placeholder="Task description (required)"]')
          .first()
          .clear({ force: true })
          .type("Updated description", { force: true });
        cy.get('button[type="submit"]').first().click({ force: true });
      });

    cy.contains("Task updated!").should("be.visible");

    cy.contains("Updated Title").should("be.visible");
    cy.contains("Updated description").should("be.visible");
    cy.contains("Original Title").should("not.exist");
  });

  it("should delete a task", () => {
    cy.contains("button", "+ New Task").click();
    cy.waitForModal();
    cy.get(".fixed.inset-0")
      .last()
      .within(() => {
        cy.get('input[placeholder="Task title"]')
          .first()
          .type("Task to delete", { force: true });
        cy.get('textarea[placeholder="Task description (required)"]')
          .first()
          .type("This task will be deleted", { force: true });
        cy.get('button[type="submit"]').first().click({ force: true });
      });
    cy.contains("Task created successfully!").should("be.visible");

    cy.contains("Task to delete")
      .closest("li")
      .within(() => {
        cy.get('button[title="Delete"]').click();
      });
    cy.waitForModal();

    cy.contains("Delete Task").should("be.visible");
    cy.contains("Are you sure you want to delete this task?").should(
      "be.visible"
    );
    cy.get(".fixed.inset-0")
      .last()
      .within(() => {
        cy.get("button").contains("Delete").first().click({ force: true });
      });

    cy.contains("Task deleted successfully!").should("be.visible");

    cy.contains("Task to delete").should("not.exist");
  });

  it('should filter tasks by status', () => {

    cy.contains('button', '+ New Task').click();
    cy.waitForModal();
    cy.get('.fixed.inset-0').last().within(() => {
      cy.get('input[placeholder="Task title"]').first().type('Pending Task', { force: true });
      cy.get('textarea[placeholder="Task description (required)"]').first().type('This is a pending task', { force: true });
      cy.get('button[type="submit"]').first().click({ force: true });
    });
    cy.contains('Task created successfully!').should('be.visible');

    cy.contains('button', '+ New Task').click();
    cy.waitForModal();
    cy.get('.fixed.inset-0').last().within(() => {
      cy.get('input[placeholder="Task title"]').first().type('Completed Task', { force: true });
      cy.get('textarea[placeholder="Task description (required)"]').first().type('This is a completed task', { force: true });
      cy.get('button[type="submit"]').first().click({ force: true });
    });
    cy.contains('Task created successfully!').should('be.visible');

    cy.contains('Completed Task').closest('li').within(() => {
      cy.get('button[title="Complete"]').click();
    });
    cy.contains('Task status updated!').should('be.visible');

    cy.get('button').contains('All').click();
    cy.contains('button', 'Pending').click();
    cy.contains('Pending Task').should('be.visible');
    cy.contains('Completed Task').should('not.exist');

    cy.get('button').contains('Pending').click();
    cy.contains('button', 'Completed').click();
    cy.contains('Completed Task').should('be.visible');
    cy.contains('Pending Task').should('not.exist');

    cy.get('button').contains('Completed').click();
    cy.contains('button', 'All').click();
    cy.contains('Pending Task').should('be.visible');
    cy.contains('Completed Task').should('be.visible');
  });

  it('should show empty state when no tasks exist', () => {

    cy.contains('No tasks found. Enjoy your free time!').should('be.visible');
  });

  it('should handle task creation with special characters', () => {
    cy.contains('button', '+ New Task').click();
    cy.waitForModal();

    cy.get('.fixed.inset-0').last().within(() => {
      cy.get('input[placeholder="Task title"]').first().type('Task with special chars: @#$%^&*()', { force: true });
      cy.get('textarea[placeholder="Task description (required)"]').first().type('Description with emojis: 🚀 📝 ✅ and symbols: <>&"', { force: true });
      cy.get('button[type="submit"]').first().click({ force: true });
    });

    cy.contains('Task created successfully!').should('be.visible');

    cy.contains('Task with special chars: @#$%^&*()').should('be.visible');
    cy.contains('Description with emojis: 🚀 📝 ✅ and symbols: <>&"').should('be.visible');
  });

  it('should handle long task titles and descriptions', () => {
    cy.contains('button', '+ New Task').click();
    cy.waitForModal();

    const longTitle = 'This is a very long task title that should be handled properly by the application without breaking the UI layout or causing any issues with the display';
    const longDescription = 'This is a very long task description that contains multiple sentences and should be handled properly by the application. It should wrap correctly and not cause any layout issues. The text should be readable and the UI should remain functional.';

    cy.get('.fixed.inset-0').last().within(() => {
      cy.get('input[placeholder="Task title"]').first().type(longTitle, { force: true });
      cy.get('textarea[placeholder="Task description (required)"]').first().type(longDescription, { force: true });
      cy.get('button[type="submit"]').first().click({ force: true });
    });

    cy.contains('Task created successfully!').should('be.visible');
    cy.contains(longTitle).should('be.visible');
    cy.contains(longDescription).should('be.visible');
  });

  it('should cancel task creation', () => {
    cy.contains('button', '+ New Task').click();
    cy.waitForModal();

    cy.get('.fixed.inset-0').last().within(() => {
      cy.get('input[placeholder="Task title"]').first().type('Task to cancel', { force: true });
      cy.get('textarea[placeholder="Task description (required)"]').first().type('This task will be cancelled', { force: true });
      
      cy.get('button').contains('Cancel').first().click({ force: true });
    });

    cy.get('.fixed.inset-0').should('not.exist');
    cy.contains('Task to cancel').should('not.exist');
  });

  it('should cancel task editing', () => {
    cy.contains('button', '+ New Task').click();
    cy.waitForModal();
    cy.get('.fixed.inset-0').last().within(() => {
      cy.get('input[placeholder="Task title"]').first().type('Original Task', { force: true });
      cy.get('textarea[placeholder="Task description (required)"]').first().type('Original description', { force: true });
      cy.get('button[type="submit"]').first().click({ force: true });
    });
    cy.contains('Task created successfully!').should('be.visible');

    cy.contains('Original Task').closest('li').within(() => {
      cy.get('button[title="Edit"]').click();
    });
    cy.waitForModal();

    cy.get('.fixed.inset-0').last().within(() => {
      cy.get('input[placeholder="Task title"]').first().clear({ force: true }).type('Modified Title', { force: true });
      cy.get('textarea[placeholder="Task description (required)"]').first().clear({ force: true }).type('Modified description', { force: true });
      
      cy.get('button').contains('Cancel').first().click({ force: true });
    });

    cy.get('.fixed.inset-0').should('not.exist');
    cy.contains('Original Task').should('be.visible');
    cy.contains('Modified Title').should('not.exist');
  });
});
