const api = (p) => `${Cypress.env("apiUrl")}${p}`;
describe("Test des formulaires d'inscription", () => {
  beforeEach(() => {
    // Se connecter au site et tester le slider à chaque test
    cy.visit("/");
    cy.get('nav > [href="/"]').should("be.visible");
    cy.get(".SliderContainer .SlideCardList > .SlideCard").should(
      "have.length",
      3,
    );
  });
  it("[SNEAKERCAZE MARKET] : Formulaire vide", () => {
    cy.visit("event/68cecee8c025d16bfb03a0b6");
    cy.get(".Event__titleLabel").should("be.visible");
    cy.get('.Event__imageContainer > [data-testid="card-image-testid"]').should(
      "be.visible",
    );
    cy.get(".Event__infocontainer > :nth-child(2) > :nth-child(1)").should(
      "be.visible",
    );
    cy.get(".Event__infocontainer > :nth-child(2) > div").should("be.visible");
    cy.get(".Event__infocontainer > :nth-child(2) > :nth-child(3)").should(
      "be.visible",
    );
    cy.get(".Event__infocontainer > :nth-child(2) > :nth-child(3)").should(
      "be.visible",
    );
    cy.get("iframe").should("be.visible");
    cy.get(".Event__infocontainer > :nth-child(3)").should("be.visible");
    cy.get(".Event__infocontainer > :nth-child(4)").should("be.visible");
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
    cy.get('[name="date"]').should("be.visible").clear();
    cy.get(":nth-child(4) > span").should("be.visible").and("contain", "Email");
    cy.get(':nth-child(4) > [data-testid="field-testid"]')
      .should("be.visible")
      .clear();
    cy.intercept('POST', 'api("/api/inscription")').as('postIncription');
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .and("contain", "Envoyer")
      .click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ email: null });
    }); 
  });
  it("[SNEAKERCAZE MARKET] : Rempli OK", () => {
    cy.visit("event/68cecee8c025d16bfb03a0b6");
    cy.get(':nth-child(1) > [data-testid="field-testid"]').clear().type("SNOW");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear().type("John");
    cy.get('[name="date"]').should("be.visible");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.intercept('POST', 'api("api/inscription")').as('postInscription')
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .click();
    //cy.containts('Merci de vous êtes inscrit !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(201);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ name : 'SNOW' });
    })
  });
  it("[SNEAKERCAZE MARKET] : Caractères spéciaux", () => {
    cy.visit("event/68cecee8c025d16bfb03a0b6");
    cy.get(':nth-child(1) > [data-testid="field-testid"]')
      .clear()
      .type("Le D'argent");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("Marie-Aimée");
    cy.get('[name="date"]').should("be.visible");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("marie.aime@test.fr");
    cy.intercept('POST', 'api("api/inscription")').as('postInscription')
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .click();
    //cy.containts('Merci de vous êtes inscrit !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(201);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ name : "Le D'argent" });
    })
  });
  it("[SNEAKERCAZE MARKET] : Champ Nom vide", () => {
    cy.visit("event/68cecee8c025d16bfb03a0b6");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear().type("John");
    cy.get('[name="date"]').should("be.visible");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.intercept('POST', 'api("/api/inscription")').as('postIncription');
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .and("contain", "Envoyer")
      .click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ name: null });
    }); 
  });
  it("[SNEAKERCAZE MARKET] : champ Prénom vide", () => {
    cy.visit("event/68cecee8c025d16bfb03a0b6");
    cy.get(':nth-child(1) > [data-testid="field-testid"]').clear().type("SNOW");
    cy.get('[name="date"]').should("be.visible");
    cy.intercept('POST', 'api("/api/inscription")').as('postIncription');
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .and("contain", "Envoyer")
      .click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ surname : null });
    }); 
  });
  it("[SNEAKERCAZE MARKET] : champs date vide", () => {
    cy.visit("event/68cecee8c025d16bfb03a0b6");
    cy.get(':nth-child(1) > [data-testid="field-testid"]').clear().type("SNOW");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear().type("John");
    cy.get('[name="date"]').should("be.visible").clear();
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.intercept('POST', 'api("/api/inscription")').as('postIncription');
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .and("contain", "Envoyer")
      .click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ date : null });
    }); 
  });
  it("[SNEAKERCAZE MARKET] : champs email vide", () => {
    cy.visit("event/68cecee8c025d16bfb03a0b6");
    cy.get(':nth-child(1) > [data-testid="field-testid"]').clear().type("SNOW");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear().type("John");
    cy.get('[name="date"]').should("be.visible").clear();
    cy.intercept('POST', 'api("/api/inscription")').as('postIncription');
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .and("contain", "Envoyer")
      .click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ email: null });
    }); 
  });
  it("[CONFERENCE] : Formulaire vide", () => {
    cy.visit("/event/68cecee8c025d16bfb03a0b5");
    cy.get(".Event__titleLabel").should("be.visible");
    cy.get('.Event__imageContainer > [data-testid="card-image-testid"]').should(
      "be.visible",
    );
    cy.get(".Event__infocontainer > :nth-child(2) > :nth-child(1)").should(
      "be.visible",
    );
    cy.get(".Event__infocontainer > :nth-child(2) > div").should("be.visible");
    cy.get(".Event__infocontainer > :nth-child(2) > :nth-child(3)").should(
      "be.visible",
    );
    cy.get(".Event__infocontainer > :nth-child(2) > :nth-child(3)").should(
      "be.visible",
    );
    cy.get("iframe").should("be.visible");
    cy.get(".Event__infocontainer > :nth-child(3)").should("be.visible");
    cy.get(".Event__infocontainer > :nth-child(4)").should("be.visible");
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
    cy.get('[name="date"]').should("be.visible").clear();
    cy.get(":nth-child(4) > span").should("be.visible").and("contain", "Email");
    cy.get(':nth-child(4) > [data-testid="field-testid"]')
      .should("be.visible")
      .clear();
    cy.intercept('POST', 'api("/api/inscription")').as('postIncription');
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .and("contain", "Envoyer")
      .click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ name : null });
    }); 
  });
  it("[CONFERENCE] : Rempli OK", () => {
    cy.visit("/event/68cecee8c025d16bfb03a0b5");
    cy.get(':nth-child(1) > [data-testid="field-testid"]').clear().type("SNOW");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear().type("John");
    cy.get('[name="date"]').should("be.visible");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.intercept('POST', 'api("api/inscription")').as('postInscription')
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .click();
    //cy.containts('Merci de vous êtes inscrit !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(201);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ name : 'SNOW' });
    })
  });
  it("[CONFERENCE] : Caractères spéciaux", () => {
    cy.visit("/event/68cecee8c025d16bfb03a0b5");
    cy.get(':nth-child(1) > [data-testid="field-testid"]')
      .clear()
      .type("Le D'argent");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("Marie-Aimée");
    cy.get('[name="date"]').should("be.visible");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("marie.aime@test.fr");
    cy.intercept('POST', 'api("api/inscription")').as('postInscription')
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .click();
    //cy.containts('Merci de vous êtes inscrit !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(201);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ name : 'SNOW' });
    })
  });
  it("[CONFERENCE] : Champ Nom vide", () => {
    cy.visit("/event/68cecee8c025d16bfb03a0b5");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear().type("John");
    cy.get('[name="date"]').should("be.visible");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.intercept('POST', 'api("/api/inscription")').as('postIncription');
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .and("contain", "Envoyer")
      .click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ name : null });
    }); 
  });
  it("[CONFERENCE] : champ Prénom vide", () => {
    cy.visit("/event/68cecee8c025d16bfb03a0b5");
    cy.get(':nth-child(1) > [data-testid="field-testid"]').clear().type("SNOW");
    cy.get('[name="date"]').should("be.visible");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.intercept('POST', 'api("/api/inscription")').as('postIncription');
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .and("contain", "Envoyer")
      .click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ surname : null });
    }); 
  });
  it("[CONFERENCE] : champs date vide", () => {
    cy.visit("/event/68cecee8c025d16bfb03a0b5");
    cy.get(':nth-child(1) > [data-testid="field-testid"]').clear().type("SNOW");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear().type("John");
    cy.get('[name="date"]').should("be.visible").clear();
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.intercept('POST', 'api("/api/inscription")').as('postIncription');
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .and("contain", "Envoyer")
      .click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ date : null });
    }); 
  });

  it("[CONFERENCE] : champs email vide", () => {
    cy.visit("/event/68cecee8c025d16bfb03a0b5");
    cy.get(':nth-child(1) > [data-testid="field-testid"]').clear().type("SNOW");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear().type("John");
    cy.get('[name="date"]').should("be.visible");
    cy.intercept('POST', 'api("/api/inscription")').as('postIncription');
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .and("contain", "Envoyer")
      .click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ email: null });
    }); 
  });
  it("[WORLD ECONOMIC FORUM] : Formulaire vide", () => {
    cy.visit("event/68cecee8c025d16bfb03a0b4");
    cy.get(".Event__titleLabel").should("be.visible");
    cy.get('.Event__imageContainer > [data-testid="card-image-testid"]').should(
      "be.visible",
    );
    cy.get(".Event__infocontainer > :nth-child(2) > :nth-child(1)").should(
      "be.visible",
    );
    cy.get(".Event__infocontainer > :nth-child(2) > div").should("be.visible");
    cy.get(".Event__infocontainer > :nth-child(2) > :nth-child(3)").should(
      "be.visible",
    );
    cy.get(".Event__infocontainer > :nth-child(2) > :nth-child(3)").should(
      "be.visible",
    );
    cy.get("iframe").should("be.visible");
    cy.get(".Event__infocontainer > :nth-child(3)").should("be.visible");
    cy.get(".Event__infocontainer > :nth-child(4)").should("be.visible");
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
    cy.get('[name="date"]').should("be.visible").clear();
    cy.get(":nth-child(4) > span").should("be.visible").and("contain", "Email");
    cy.get(':nth-child(4) > [data-testid="field-testid"]')
      .should("be.visible")
      .clear();
    cy.intercept('POST', 'api("/api/inscription")').as('postIncription');
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .and("contain", "Envoyer")
      .click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ surname: null });
    }); 
  });
  it("[WORLD ECONOMIC FORUM] : Rempli OK", () => {
    cy.visit("event/68cecee8c025d16bfb03a0b4");
    cy.get(':nth-child(1) > [data-testid="field-testid"]').clear().type("SNOW");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear().type("John");
    cy.get('[name="date"]').should("be.visible");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.intercept('POST', 'api("api/inscription")').as('postInscription')
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .click();
    //cy.containts('Merci de vous êtes inscrit !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(201);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ name : 'SNOW' });
    })
  });
  it("[WORLD ECONOMIC FORUM] : Caractères spéciaux", () => {
    cy.visit("event/68cecee8c025d16bfb03a0b4");
    cy.get(':nth-child(1) > [data-testid="field-testid"]')
      .clear()
      .type("Le D'argent");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("Marie-Aimée");
    cy.get('[name="date"]').should("be.visible");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("marie.aime@test.fr");
    cy.intercept('POST', 'api("api/inscription")').as('postInscription')
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .click();
    //cy.containts('Merci de vous êtes inscrit !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(201);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ name : 'SNOW' });
    })
  });
  it("[WORLD ECONOMIC FORUM] : Champ Nom vide", () => {
    cy.visit("event/68cecee8c025d16bfb03a0b4");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear().type("John");
    cy.get('[name="date"]').should("be.visible");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.intercept('POST', 'api("/api/inscription")').as('postIncription');
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .and("contain", "Envoyer")
      .click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ name : null });
    }); 
  });
  it("[WORLD ECONOMIC FORUM] : champ Prénom vide", () => {
    cy.visit("event/68cecee8c025d16bfb03a0b4");
    cy.get(':nth-child(1) > [data-testid="field-testid"]').clear().type("SNOW");
    cy.get('[name="date"]').should("be.visible");
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.intercept('POST', 'api("/api/inscription")').as('postIncription');
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .and("contain", "Envoyer")
      .click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ surname: null });
    }); 
  });
  it("[WORLD ECONOMIC FORUM] : champs date vide", () => {
    cy.visit("event/68cecee8c025d16bfb03a0b4");
    cy.get(':nth-child(1) > [data-testid="field-testid"]').clear().type("SNOW");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear().type("John");
    cy.get('[name="date"]').should("be.visible").clear();
    cy.get(':nth-child(2) > [data-testid="field-testid"]')
      .clear()
      .type("john.snow@test.fr");
    cy.intercept('POST', 'api("/api/inscription")').as('postIncription');
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .and("contain", "Envoyer")
      .click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ date : null });
    }); 
  });;
  it("[WORLD ECONOMIC FORUM] : champs email vide", () => {
    cy.visit("event/68cecee8c025d16bfb03a0b4");
    cy.get(':nth-child(1) > [data-testid="field-testid"]').clear().type("SNOW");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').clear().type("John");
    cy.get('[name="date"]').should("be.visible");
    cy.intercept('POST', 'api("/api/inscription")').as('postIncription');
    cy.get('.col > [data-testid="button-test-id"]')
      .should("be.visible")
      .and("contain", "Envoyer")
      .click();
    //cy.containts('Informations manquantes !').should('be.visible'); --> Ligne à ajouter quand le message d'erreur sera param
    cy.wait('@postIncription').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(request.method).to.eq('POST');
      expect(request.body).to.deep.include({ email: null });
    }); 
  })
});
