const api = (p) => `${Cypress.env("apiUrl")}${p}`;
const JDD = [
  {
    name: "SNOW",
    surname: "John",
    contactType: "PERSONNEL",
    email: "snow.john@test.fr ",
    message: "Ceci est un message de test automatiquement généré. Merci de ne pas le prendre en compte. Ou de supprimer l'entré en cas écheant",
  },
  {
    name: "La D'argent",
    surname: "Marie-Aimée",
    contactType: "PERSONNEL",
    email: "dargent.marie-amiee@test.fr ",
    message:
      "Ceci est une message de test avec des caractères spéciaux (,?.:/!€-_^¨%*1]}. Il est généré automatiquement. Merci de ne pas le prendre en compte. Ou de supprimer l'entré en cas écheant",
  },
  {
    name: "SNOW",
    surname: "John",
    contactType: "ENTREPRISE",
    email: "snow.john@test.fr ",
    message: "Ceci est un message de test automatiquement généré. Merci de ne pas le prendre en compte. Ou de supprimer l'entré en cas écheant",
  },
  {
    name: "La D'argent",
    surname: "Marie-Aimée",
    contactType: "ENTREPRISE",
    email: "dargent.marie-amiee@test.fr ",
    message:
      "Ceci est une message de test avec des caractères spéciaux (,?.:/!€-_^¨%*1]}. Il est généré automatiquement. Merci de ne pas le prendre en compte. Ou de supprimer l'entré en cas écheant",
  },
];

describe("Test /api/contact : ", () => {
  before(function () {
    const apiup = {
      name: "SNOW",
      surname: "John",
      contactType: "PERSONNEL",
      email: "snow.john@test.fr ",
      message: "Ceci est un message de test automatiquement généré. Merci de ne pas le prendre en compte. Ou de supprimer l'entré en cas écheant",
    };
    cy.request({
      method: "POST",
      url: api("/api/inscription"),
      body: apiup,
      failOnStatusCode: false,
    }).then(function ({ status }) {
      if (status === 500) {
        cy.log("Vérifier que l'API est bien démarré et relancer les tests");
        this.skip();
      }
    });
  });
  it("[POST] : 201 Created", () => {
    cy.wrap(JDD).each((body) => {
      cy.request("POST", api("/api/contact"), body).then(({ status, body }) => {
        expect(status).to.eq(201);
        expect(body).to.have.property(
          "message",
          "Merci de nous avoir contacté !",
        );
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (name = null)", () => {
    cy.wrap(JDD).each((p) => {
      const body = { ...p, name: null };
      cy.request({
        method: "POST",
        url: api("/api/contact"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (surname = null)", () => {
    cy.wrap(JDD).each((p) => {
      const body = { ...p, surname: null };
      cy.request({
        method: "POST",
        url: api("/api/contact"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (contactType = null)", () => {
    cy.wrap(JDD).each((p) => {
      const body = { ...p, contactType: null };
      cy.request({
        method: "POST",
        url: api("/api/contact"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (email = null)", () => {
    cy.wrap(JDD).each((p) => {
      const body = { ...p, email: null };
      cy.request({
        method: "POST",
        url: api("/api/contact"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (message = null)", () => {
    cy.wrap(JDD).each((p) => {
      const body = { ...p, message: null };
      cy.request({
        method: "POST",
        url: api("/api/contact"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (Formulaire vide)", () => {
    const fichvide = JDD.map((obj) =>
      Object.fromEntries(Object.keys(obj).map((k) => [k, null])),
    );
    cy.wrap(fichvide).each((body) => {
      cy.request({
        method: "POST",
        url: api("/api/contact"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (name = nombre)", () => {
    cy.wrap(JDD).each((p) => {
      const body = { ...p, name: 123456789 };
      cy.request({
        method: "POST",
        url: api("/api/contact"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (surname = nombre)", () => {
    cy.wrap(JDD).each((p) => {
      const body = { ...p, surname: 123456789 };
      cy.request({
        method: "POST",
        url: api("/api/contact"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (contactType = Valeur non attendu)", () => {
    cy.wrap(JDD).each((p) => {
      const body = { ...p, contactType: "TEST" };
      cy.request({
        method: "POST",
        url: api("/api/contact"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
  it("[POST] : 400 Error: Bad Request (email = format KO)", () => {
    cy.wrap(JDD).each((p) => {
      const body = { ...p, email: "test.fr" };
      cy.request({
        method: "POST",
        url: api("/api/contact"),
        body: body,
        failOnStatusCode: false,
      }).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
      });
    });
  });
});
