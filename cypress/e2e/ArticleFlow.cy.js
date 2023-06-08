import { faker } from "@faker-js/faker";
import { articleBody } from "../support/utils";

describe("template spec", () => {
  beforeEach(() => {
    cy.login("caiquedpfc@gmail.com", "test123");
    cy.visit("http://localhost:8081");
    cy.injectAxe();
  });

  it("Creating a new article", () => {
    const title = faker.hacker.phrase();
    cy.contains("New Article").click();

    cy.get('[placeholder="Article Title"]').type(title);
    cy.checkA11y(null, null, null, true);
    cy.get('[placeholder="What\'s this article about?"]').type(
      "This article is about why Caíque Coelho is the perfect candidate"
    );
    cy.get('[placeholder="Write your article (in markdown)"]').type(
      `## ${faker.hacker.phrase()}\n### ${faker.hacker.phrase()}`
    );
    cy.get('[placeholder="Enter tags"]')
      .type("hire{enter}")
      .type("Caique Coelho{enter}");
    cy.contains("button", "Publish Article").click();

    cy.contains(title).should("be.visible");
    cy.checkA11y(null, null, null, true);
  });

  it("Try to create article with an empty title", () => {
    const title = faker.hacker.phrase();
    cy.contains("New Article").click();
    cy.contains("button", "Publish Article").click();

    cy.contains("titlecan't be blank").should("be.visible");
  });

  it("Try to create an article with an already published article title", () => {
    const title = faker.hacker.phrase();
    cy.contains("New Article").click();
    cy.get('[placeholder="Article Title"]').type(
      "quantifying the matrix won't do anything, we need to parse the redundant PCI transmitter!"
    );
    cy.get('[placeholder="What\'s this article about?"]').type(
      "This article is about why Caíque Coelho is the perfect candidate"
    );
    cy.get('[placeholder="Write your article (in markdown)"]').type(
      `## ${faker.hacker.phrase()}\n### ${faker.hacker.phrase()}`
    );
    cy.get('[placeholder="Enter tags"]')
      .type("hire{enter}")
      .type("Caique Coelho{enter}");
    cy.contains("button", "Publish Article").click();

    cy.contains("titlemust be unique").should("be.visible");
  });

  it("Editing the last published article", () => {
    const title = faker.hacker.phrase();
    cy.createArticle(title);

    cy.contains("Caíque Coelho").click();

    cy.contains("Loading articles...").should("not.exist");

    cy.contains(title).click();

    cy.contains("span", "Edit Article").click();

    cy.get('[placeholder="Article Title"]')
      .clear()
      .type(`[EDITED]${title}`);
    cy.get('[placeholder="What\'s this article about?"]')
      .clear()
      .type(`[Edited] What\'s this article about - ${faker.hacker.phrase()}`);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .clear()
      .type(
        `# Edited\n## ${faker.hacker.phrase()}\n### ${faker.hacker.phrase()}`
      );
    cy.get('[placeholder="Enter tags"]').type("Edited Tag{enter}");
    cy.contains("button", "Publish Article").click();

    cy.contains(`[EDITED]${title}`, { timeout: 20000 }).should("be.visible");
  });

  it("Deleting the last published article", () => {
    const title = faker.hacker.phrase();
    cy.createArticle(title);

    cy.contains("Caíque Coelho").click();

    cy.contains("My Articles").should("be.visible");
    cy.contains("Loading articles...").should("not.exist");

    cy.contains(title).click(); // TODO Change to the generated article name

    cy.contains("span", "Delete Article").should("be.visible");

    cy.get("h1")
      .invoke("text")
      .then(title => {
        cy.contains("span", "Delete Article").click();

        cy.contains("Global Feed").should("be.visible");
        cy.contains("Loading articles...").should("not.exist");
        cy.contains(title).should("not.exist");
      });
  });
});
