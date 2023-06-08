import { faker } from "@faker-js/faker";

Cypress.Commands.add("login", (email, password) => {
  cy.session([email, password], () => {
    cy.visit("http://localhost:8081");

    cy.contains("Sign in").click();

    cy.get('[placeholder="Email"]').type(email);
    cy.get('[type="password"]').type(password);
    cy.contains("button", "Sign in").click();

    cy.contains("Sign in").should("not.exist");
    cy.contains("Caíque Coelho").should("be.visible");
  });
});

Cypress.Commands.add("createArticle", title => {
  cy.visit("http://localhost:8081");

  cy.contains("New Article").click();

  cy.get('[placeholder="Article Title"]').type(title);
  cy.get('[placeholder="What\'s this article about?"]').type(
    faker.hacker.phrase()
  );
  cy.get('[placeholder="Write your article (in markdown)"]').type(
    `## ${faker.hacker.phrase()}\n### ${faker.hacker.phrase()}`
  );
  cy.get('[placeholder="Enter tags"]')
    .type("hire{enter}")
    .type("Caique Coelho{enter}");
  cy.contains("button", "Publish Article").click();

  cy.contains(title).should("be.visible");
});
