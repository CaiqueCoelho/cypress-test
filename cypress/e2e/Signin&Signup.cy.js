import { faker } from "@faker-js/faker";

describe("Signin and Sinup flow tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.injectAxe();
  });

  it("User registration", () => {
    const userName = faker.internet.userName();

    cy.contains("Sign up").click();

    cy.get('[placeholder="Username"]').type(userName);
    cy.checkA11y(null, null, null, true);
    cy.get('[placeholder="Email"]').type(faker.internet.email());
    cy.get('[type="password"]').type("teste123");
    cy.contains("button", "Sign up").click();

    cy.contains("Sign up").should("not.exist");
    cy.contains(userName).should("be.visible");
  });

  it("Try to create a user with the same e-mail and username already registered", () => {
    cy.contains("Sign up").click();

    cy.get('[placeholder="Username"]').type("Caique Coelho");
    cy.get('[placeholder="Email"]').type("caiquedpfc@gmail.com");
    cy.get('[type="password"]').type("teste123");
    cy.contains("button", "Sign up").click();
    cy.contains("email has already been taken").should("be.visible");
    cy.contains("username has already been taken").should("be.visible");
  });

  it("User login", () => {
    cy.checkA11y(null, null, null, true);
    cy.contains("Sign in").click();

    cy.get('[placeholder="Email"]').type("caiquedpfc@gmail.com");
    cy.get('[type="password"]').type("test123");
    cy.contains("button", "Sign in").click();

    cy.contains("Sign up").should("not.exist");
    cy.contains("Caíque Coelho").should("be.visible");
    cy.checkA11y(null, null, null, true);
  });

  it("Try to log in with incorrect credentials", () => {
    cy.checkA11y(null, null, null, true);
    cy.contains("Sign in").click();

    cy.get('[placeholder="Email"]').type("caiquedpfc@gmail.com");
    cy.get('[type="password"]').type("test12");
    cy.contains("button", "Sign in").click();

    cy.contains("email or password is invalid").should("be.visible");
  });
});
