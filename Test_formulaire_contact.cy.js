const api = (p) => `${Cypress.env("apiUrl")}${p}`;
describe("Test du formulaire de contact", () => {
  beforeEach(() => {
    // Test de la page contact à chaque test
    cy.visit("/#contact");
  });
  it("Formulaire vierge", () => {
    cy.get("#contact > .Title").should("be.visible");
    cy.get(":nth-child(1) > span").should("be.visible").and("contain", "Nom");
    cy.get(':nth-child(1) > [data-testid="field-testid"]')
      .should("be.visible")
      .clear();
    cy.get(":nth-child(2) > span")
      .should("be.visible")
      .and("contain", "Prénom");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .should("be.visible")
      .clear();
    cy.get(".label")
      .should("be.visible")
      .and("contain", "Personnel / Entreprise");
    cy.get(".Select").should("be.visible");
    cy.get(":nth-child(4) > span").should("be.visible").and("contain", "Email");
    cy.get(':nth-child(4) > [data-testid="field-testid"]')
      .should("be.visible")
      .clear();
    cy.get(":nth-child(2) > .inputField > span")
      .should("be.visible")
      .and("contain", "Message");
    cy.get(':nth-child(2) > .inputField > [data-testid="field-testid"]')
      .should("be.visible")
      .clear();
    cy.intercept('POST', 'api("/api/contact")').as('postContact');
    cy.get('.row > :nth-child(1) > [data-testid="button-test-id"]')
      .should("be.visible")
      .click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postContact').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ email: null });
    });   
  });
  it("Formulaire champ Personnel / Entreprise vide (caractères spéciales)", () => {
    cy.get(':nth-child(1) > :nth-child(1) > [data-testid="field-testid"]')
      .clear()
      .type("LE D'ARGENT");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear().type("Marie-Aimée");
    cy.get(':nth-child(4) > [data-testid="field-testid"]')
      .clear()
      .type("marie.dargent@test.fr");
    cy.get(':nth-child(2) > .inputField > [data-testid="field-testid"]')
      .clear()
      .type("Ceci est une message de test");
    cy.intercept('POST', 'api("/api/contact")').as('postContact');
    cy.get('.row > :nth-child(1) > [data-testid="button-test-id"]').click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postContact').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ contactType : null });
    }) 
  });
  it("Formulaire champ Personnel / Entreprise vide", () => {
    cy.get(':nth-child(1) > :nth-child(1) > [data-testid="field-testid"]')
      .clear()
      .type("Snow");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear().type("John");
    cy.get(':nth-child(4) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.get(':nth-child(2) > .inputField > [data-testid="field-testid"]')
      .clear()
      .type("Ceci est une message de test");
    cy.intercept('POST', 'api("/api/contact")').as('postContact');
    cy.get('.row > :nth-child(1) > [data-testid="button-test-id"]').click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postContact').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ contactType : null });
    }) 
  });
  it("[PERSONNEL] : Formulaire rempli OK", () => {
    cy.get(':nth-child(1) > :nth-child(1) > [data-testid="field-testid"]')
      .clear()
      .type("SNOW");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("John");
    cy.get(
      ':nth-child(1) > [data-testid="select-testid"] > .Select > [data-testid="collapse-button-testid"]',
    ).click();
    cy.get(':nth-child(2) > [name="selected"]').click();
    cy.get(':nth-child(4) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.get(':nth-child(2) > .inputField > [data-testid="field-testid"]')
      .clear()
      .type("Ceci est une message de test");
    cy.intercept('POST', 'api("/api/contact")').as('postContact');
    cy.get('.row > :nth-child(1) > [data-testid="button-test-id"]').click();
    //cy.containts('Merci de nous avoir contacté !').should('be.visible'); --> Ligne à ajouter quand le message de succes sera param
    cy.wait('@postContact').then(({ request, response }) => {
      expect(response.statusCode).to.eq(201);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ name : 'SNOW' });
    })  
  });
  it("[PERSONNEL] : Formulaire caractères spéciaux", () => {
    cy.get(':nth-child(1) > :nth-child(1) > [data-testid="field-testid"]')
      .clear()
      .type("LE D'ARGENT");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("Marie-Aimé");
    cy.get(
      ':nth-child(1) > [data-testid="select-testid"] > .Select > [data-testid="collapse-button-testid"]',
    ).click();
    cy.get(':nth-child(2) > [name="selected"]').click();
    cy.get(':nth-child(4) > [data-testid="field-testid"]')
      .clear()
      .type("marie.dargent@test.fr");
    cy.get(':nth-child(2) > .inputField > [data-testid="field-testid"]')
      .clear()
      .type(
        "Ceci est une message de test avec des caractères spéciaux (,?.:/!€-_^¨%*1]}. Il est généré automatiquement. Merci de ne pas le prendre en compte. Ou de supprimer l'entré en cas écheant. Il est généré automatiquement. Merci de ne pas le prendre en compte. Ou de supprimer l'entré en cas écheant",
      );
    cy.intercept('POST', 'api("/api/contact")').as('postContact');
    cy.get('.row > :nth-child(1) > [data-testid="button-test-id"]').click();
    //cy.containts('Merci de nous avoir contacté !').should('be.visible'); --> Ligne à ajouter quand le message de succes sera param
    cy.wait('@postContact').then(({ request, response }) => {
      expect(response.statusCode).to.eq(201);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ surname : 'Marie-Aimé' });
    }) 
  });
  it("[PERSONNEL] : Formulaire champ Nom vide", () => {
    cy.get(
      ':nth-child(1) > :nth-child(1) > [data-testid="field-testid"]',
    ).clear();
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear().type("John");
    cy.get(
      ':nth-child(1) > [data-testid="select-testid"] > .Select > [data-testid="collapse-button-testid"]',
    ).click();
    cy.get(':nth-child(2) > [name="selected"]').click();
    cy.get(':nth-child(4) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.get(':nth-child(2) > .inputField > [data-testid="field-testid"]')
      .clear()
      .type("Ceci est une message de test");
    cy.intercept('POST', 'api("/api/contact")').as('postContact');
    cy.get('.row > :nth-child(1) > [data-testid="button-test-id"]').click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postContact').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ name : 'null' });
    }) 
  });
  it("[PERSONNEL] : Formulaire champ Prénom vide", () => {
    cy.get(':nth-child(1) > :nth-child(1) > [data-testid="field-testid"]')
      .clear()
      .type("Snow");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear();
    cy.get(
      ':nth-child(1) > [data-testid="select-testid"] > .Select > [data-testid="collapse-button-testid"]',
    ).click();
    cy.get(':nth-child(2) > [name="selected"]').click();
    cy.get(':nth-child(4) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.get(':nth-child(2) > .inputField > [data-testid="field-testid"]')
      .clear()
      .type("Ceci est une message de test");
    cy.intercept('POST', 'api("/api/contact")').as('postContact');
    cy.get('.row > :nth-child(1) > [data-testid="button-test-id"]').click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postContact').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ surname : 'null' });
    }) 
  });
  it("[PERSONNEL] : Formulaire champ Email vide", () => {
    cy.get(':nth-child(1) > :nth-child(1) > [data-testid="field-testid"]')
      .clear()
      .type("Snow");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear();
    cy.get(
      ':nth-child(1) > [data-testid="select-testid"] > .Select > [data-testid="collapse-button-testid"]',
    ).click();
    cy.get(':nth-child(2) > [name="selected"]').click();
    cy.get(':nth-child(2) > .inputField > [data-testid="field-testid"]')
      .clear()
      .type("Ceci est une message de test");
    cy.intercept('POST', 'api("/api/contact")').as('postContact');
    cy.get('.row > :nth-child(1) > [data-testid="button-test-id"]').click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postContact').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ email : null });
    }) 
  });
  it("[PERSONNEL] : Formulaire champ Message vide", () => {
    cy.get(':nth-child(1) > :nth-child(1) > [data-testid="field-testid"]')
      .clear()
      .type("Snow");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear();
    cy.get(
      ':nth-child(1) > [data-testid="select-testid"] > .Select > [data-testid="collapse-button-testid"]',
    ).click();
    cy.get(':nth-child(2) > [name="selected"]').click();
    cy.get(':nth-child(4) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.intercept('POST', 'api("/api/contact")').as('postContact');
    cy.get('.row > :nth-child(1) > [data-testid="button-test-id"]').click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postContact').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ message : null });
    }) 
  });
  it("[ENTREPRISE] : Formulaire rempli OK", () => {
    cy.get(':nth-child(1) > :nth-child(1) > [data-testid="field-testid"]')
      .clear()
      .type("SNOW");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear().type("John");
    cy.get(
      ':nth-child(1) > [data-testid="select-testid"] > .Select > [data-testid="collapse-button-testid"]',
    ).click();
    cy.get(':nth-child(3) > [name="selected"]').click();
    cy.get(':nth-child(4) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.get(':nth-child(2) > .inputField > [data-testid="field-testid"]')
      .clear()
      .type("Ceci est une message de test");
    cy.intercept('POST', 'api("/api/contact")').as('postContact');
    cy.get('.row > :nth-child(1) > [data-testid="button-test-id"]').click();
    //cy.containts('Merci de nous avoir contacté !').should('be.visible'); --> Ligne à ajouter quand le message de succes sera param
    cy.wait('@postContact').then(({ request, response }) => {
      expect(response.statusCode).to.eq(201);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ surname : 'John' });
    }) 
  });
  it("[ENTREPRISE] : Formulaire caractères spéciaux", () => {
    cy.get(':nth-child(1) > :nth-child(1) > [data-testid="field-testid"]')
      .clear()
      .type("LE D'ARGENT");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("Marie-Aimé");
    cy.get(
      ':nth-child(1) > [data-testid="select-testid"] > .Select > [data-testid="collapse-button-testid"]',
    ).click();
    cy.get(':nth-child(3) > [name="selected"]').click();
    cy.get(':nth-child(4) > [data-testid="field-testid"]')
      .clear()
      .type("marie.dargent@test.fr");
    cy.get(':nth-child(2) > .inputField > [data-testid="field-testid"]')
      .clear()
      .type(
        "Ceci est une message de test avec des caractères spéciaux (,?.:/!€-_^¨%*1]}. Il est généré automatiquement. Merci de ne pas le prendre en compte. Ou de supprimer l'entré en cas écheant. Il est généré automatiquement. Merci de ne pas le prendre en compte. Ou de supprimer l'entré en cas écheant",
      );
    cy.intercept('POST', 'api("/api/contact")').as('postContact');
    cy.get('.row > :nth-child(1) > [data-testid="button-test-id"]').click();
    //cy.containts('Merci de nous avoir contacté !').should('be.visible'); --> Ligne à ajouter quand le message de succes sera param
    cy.wait('@postContact').then(({ request, response }) => {
      expect(response.statusCode).to.eq(201);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ name : "LE D'ARGENT" });
    }) 
  });
  it("[ENTREPRISE] : Formulaire champ Nom vide", () => {
    cy.get(
      ':nth-child(1) > :nth-child(1) > [data-testid="field-testid"]',
    ).clear();
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear().type("John");
    cy.get(
      ':nth-child(1) > [data-testid="select-testid"] > .Select > [data-testid="collapse-button-testid"]',
    ).click();
    cy.get(':nth-child(3) > [name="selected"]').click();
    cy.get(':nth-child(4) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.get(':nth-child(2) > .inputField > [data-testid="field-testid"]')
      .clear()
      .type("Ceci est une message de test");
    cy.intercept('POST', 'api("/api/contact")').as('postContact');
    cy.get('.row > :nth-child(1) > [data-testid="button-test-id"]').click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postContact').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ name : null });
    }) 
  });
  it("[ENTREPRISE] : Formulaire champ Prénom vide", () => {
    cy.get(':nth-child(1) > :nth-child(1) > [data-testid="field-testid"]')
      .clear()
      .type("Snow");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear();
    cy.get(
      ':nth-child(1) > [data-testid="select-testid"] > .Select > [data-testid="collapse-button-testid"]',
    ).click();
    cy.get(':nth-child(3) > [name="selected"]').click();
    cy.get(':nth-child(4) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.get(':nth-child(2) > .inputField > [data-testid="field-testid"]')
      .clear()
      .type("Ceci est une message de test");
    cy.intercept('POST', 'api("/api/contact")').as('postContact');
    cy.get('.row > :nth-child(1) > [data-testid="button-test-id"]').click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postContact').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ surname : null });
    }) 
  });
  it("[ENTREPRISE] : Formulaire champ Email vide", () => {
    cy.get(':nth-child(1) > :nth-child(1) > [data-testid="field-testid"]')
      .clear()
      .type("Snow");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear();
    cy.get(
      ':nth-child(1) > [data-testid="select-testid"] > .Select > [data-testid="collapse-button-testid"]',
    ).click();
    cy.get(':nth-child(3) > [name="selected"]').click();
    cy.get(':nth-child(2) > .inputField > [data-testid="field-testid"]')
      .clear()
      .type("Ceci est une message de test");
    cy.intercept('POST', 'api("/api/contact")').as('postContact');
    cy.get('.row > :nth-child(1) > [data-testid="button-test-id"]').click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postContact').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ email : null });
    }) 
  });
  it("[ENTREPRISE] : Formulaire champ Message vide", () => {
    cy.get(':nth-child(1) > :nth-child(1) > [data-testid="field-testid"]')
      .clear()
      .type("Snow");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear();
    cy.get(
      ':nth-child(1) > [data-testid="select-testid"] > .Select > [data-testid="collapse-button-testid"]',
    ).click();
    cy.get(':nth-child(3) > [name="selected"]').click();
    cy.get(':nth-child(4) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.intercept('POST', 'api("/api/contact")').as('postContact');
    cy.get('.row > :nth-child(1) > [data-testid="button-test-id"]').click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postContact').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ message : null });
    }) 
  })
});
