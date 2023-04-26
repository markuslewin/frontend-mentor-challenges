import { faker } from "@faker-js/faker";

describe("advice", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("matches the design initially", () => {
    cy.fixture("initial-slip").then((slip) => {
      cy.findByRole("heading", { name: new RegExp(slip.id.toString()) });
      cy.findByText(slip.advice);
    });
  });

  it("generates new advice on button click", () => {
    const slip = buildSlip();
    cy.intercept("GET", "https://api.adviceslip.com/advice", {
      statusCode: 200,
      body: {
        slip,
      },
    });

    cy.findByRole("button", { name: /new/i }).click();

    cy.findByRole("heading", { name: new RegExp(slip.id.toString()) });
    cy.findByText(slip.advice);
  });
});

function buildSlip() {
  return {
    id: faker.datatype.number(),
    advice: faker.lorem.paragraph(),
  };
}
