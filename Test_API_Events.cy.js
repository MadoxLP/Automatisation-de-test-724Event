const api = (p) => `${Cypress.env("apiUrl")}${p}`;
describe("Test /api/events/last", () => {
  it("[GET] : 200 OK ", () => {
    cy.request({
      method: "GET",
      url: api("/api/events/last"),
      failOnStatusCode: false,
    }).then(function ({ status, body }) {
      expect(status).to.eq(200);
      expect(body).to.have.property("succes");
    });
  });
});
describe("Test /api/events", () => {
  it("[GET] : 200 OK ", () => {
    cy.request({
      method: "GET",
      url: api("/api/events"),
      failOnStatusCode: false,
    }).then(function ({ status, headers }) {
      expect(status).to.eq(200);
      expect(headers["content-type"]).to.match(/^application\/json\b/);
    });
  });
});
const eventid = [
  "68c56a2d21fddd208d4e5135",
  "68c56a2d21fddd208d4e5136",
  "68c56a2d21fddd208d4e5137",
  "68c56a2d21fddd208d4e5138",
  "68c56a2d21fddd208d4e513a",
  "68c56a2d21fddd208d4e513b",
  "68c56a2d21fddd208d4e513c",
  "68c56a2d21fddd208d4e513d",
  "68c56a2d21fddd208d4e513e",
  "68c56a2d21fddd208d4e513f",
  "68c56a2d21fddd208d4e5140",
  "68c56a2d21fddd208d4e5141",
  "68c56a2d21fddd208d4e5142",
  "68c56a2d21fddd208d4e5143",
  "68c56a2d21fddd208d4e5144",
  "68c56a2d21fddd208d4e5145",
  "68c56a2d21fddd208d4e5146",
  "68c56a2d21fddd208d4e5147",
  "68c56a2d21fddd208d4e5148",
  "68c56a2d21fddd208d4e5149",
];

describe("Test /api/events/{id}", () => {
  it("[GET] : 200 OK ", () => {
    cy.wrap(eventid).each((_id) => {
      cy.request({
        method: "GET",
        url: api(`/api/events/${_id}`),
        body: _id,
      }).then(function ({ status, body }) {
        expect(status).to.eq(200);
        expect(body).to.have.property("_id", _id);
      });
    });
  });
});
