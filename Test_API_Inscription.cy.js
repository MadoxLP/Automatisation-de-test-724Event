const api = (p) => `${Cypress.env("apiUrl")}${p}`;
const now = new Date().toISOString();
const event = [
  "68c13be5fdda902734e7f477",
  "68c13be5fdda902734e7f476",
  "68c13be5fdda902734e7f475",
];
const user = [
  {
    eventId: "",
    name: "John",
    surname: "SNOW",
    email: "snow.john@test.fr",
    date: now,
  },
  {
    eventId: "",
    name: "Marie-Aimée",
    surname: "D'argent",
    email: "dargent.marie-amiee@test.fr",
    date: now,
  },
];
const test = event.flatMap((id) => user.map((o) => ({ ...o, eventId: id })));
describe("Test /api/inscription : ", () => {
  before(function () {
    const apiup = {
      eventId: "68c13be5fdda902734e7f477",
      name: "test",
      surname: "test",
      email: "test.test@test.fr",
      date: now,
    };
    cy.request({
      method: "POST",
      url: api("/api/inscription"),
      body: test,
      failOnStatusCode: false,
    }).then(function ({ status }) {
      if (status === 500) {
        cy.log("Vérifier que l'API est bien démarré et relancer les tests");
        this.skip();
      }
    });
  });
  it("[POST] : 201 Created", () => {
    cy.wrap(test).each((JDD) => {
      cy.request({
        method: "POST",
        url: api("/api/inscription"),
        body: JDD,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(201);
        expect(body).to.have.property(
          "message",
          "Merci pour votre inscription !",
        );
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (eventId = null)", () => {
    cy.request({
      method: "POST",
      url: api("/api/inscription"),
      body: user,
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400);
      expect(body.error).to.exist;
    });
  });
  it("[POST] : 400 Error: Bad Request (name=null)", () => {
    cy.wrap(test).each((p) => {
      const body = { ...p, name: null };
      cy.request({
        method: "POST",
        url: api("/api/inscription"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (surname = null)", () => {
    cy.wrap(test).each((p) => {
      const body = { ...p, surname: null };
      cy.request({
        method: "POST",
        url: api("/api/inscription"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (email = null)", () => {
    cy.wrap(test).each((p) => {
      const body = { ...p, email: null };
      cy.request({
        method: "POST",
        url: api("/api/inscription"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (date = null)", () => {
    cy.wrap(test).each((p) => {
      const body = { ...p, date: null };
      cy.request({
        method: "POST",
        url: api("/api/inscription"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (name = chiffre)", () => {
    cy.wrap(test).each((p) => {
      const body = { ...p, name: 123456789 };
      cy.request({
        method: "POST",
        url: api("/api/inscription"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (surname = chiffre)", () => {
    cy.wrap(test).each((p) => {
      const body = { ...p, surname: 123456789 };
      cy.request({
        method: "POST",
        url: api("/api/inscription"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (email = format KO)", () => {
    cy.wrap(test).each((p) => {
      const body = { ...p, email: "test.fr" };
      cy.request({
        method: "POST",
        url: api("/api/inscription"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (date = caractères)", () => {
    cy.wrap(test).each((p) => {
      const body = { ...p, date: "test" };
      cy.request({
        method: "POST",
        url: api("/api/inscription"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
});
