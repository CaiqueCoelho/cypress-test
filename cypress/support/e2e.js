import "./commands";
import "cypress-axe";

import addContext from "mochawesome/addContext";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

Cypress.on("test:after:run", (test, runnable) => {
  const path = Cypress.spec.relative.split("/")[2];
  const screenshot = `screenshots/${path}/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;

  const video = `videos/${path}/${Cypress.spec.name}.mp4`;
  addContext({ test }, screenshot);
  addContext({ test }, video);
});
