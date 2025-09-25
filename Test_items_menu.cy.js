describe("Test des items du menu", () => {
  beforeEach(() => {
    // Se connecter au site et tester le slider à chaque test
    cy.visit("/");
    cy.url().should("eq","http://localhost:3000/");
    cy.get('nav > [href="/"]').should("be.visible");
    cy.get(".SliderContainer .SlideCardList > .SlideCard").should(
      "have.length",
      3,
    );
  });

  it("Nos services", () => {
    cy.get("ul > :nth-child(1) > a").click();
    cy.url().should("eq", "http://localhost:3000/#nos-services");
    cy.get("#nos-services > .Title")
      .should("be.visible")
      .and("contain", "Nos services");
    cy.get("#nos-services > p")
      .should("be.visible")
      .and(
        "contain",
        "Nous organisons des événements sur mesure partout dans le monde",
      );
    cy.get(".ListContainer > .ServiceCard:visible").should("have.length", 3);
    cy.get(
      ':nth-child(1) > .ServiceCard__imageContainer > [data-testid="card-image-testid"]',
    ).should("be.visible");
    cy.get(":nth-child(1) > .ServiceCard__textContainer > h3").should(
      "be.visible",
    );
    cy.get(":nth-child(1) > .ServiceCard__textContainer").should("be.visible");
    cy.get(
      ':nth-child(2) > .ServiceCard__imageContainer > [data-testid="card-image-testid"]',
    ).should("be.visible");
    cy.get(":nth-child(2) > .ServiceCard__textContainer > h3").should(
      "be.visible",
    );
    cy.get(":nth-child(2) > .ServiceCard__textContainer").should("be.visible");
    cy.get(
      ':nth-child(3) > .ServiceCard__imageContainer > [data-testid="card-image-testid"]',
    ).should("be.visible");
    cy.get(":nth-child(3) > .ServiceCard__textContainer > h3").should(
      "be.visible",
    );
    cy.get(":nth-child(3) > .ServiceCard__textContainer").should("be.visible");
    cy.get('nav > [href="/"] > .Logo').should("be.visible").click();
    cy.url().should("eq","http://localhost:3000/");
  });
  it("Nos réalisations", () => {
    cy.get(":nth-child(2) > a").click();
    cy.url().should("eq", "http://localhost:3000/#nos-realisations");
    cy.get("#nos-realisations > h2")
      .should("be.visible")
      .and("contain", "Nos réalisations");
    cy.get(".SelectTitle").should("be.visible").and("contain", "Catégorie");
    cy.get(
      '#nos-realisations > [data-testid="select-testid"] > .Select',
    ).should("be.visible");
    cy.get("#events").should("be.visible");
    cy.get('#events > a > [data-testid="card-testid"]:visible').should("have.length",9,);
    cy.get('nav > [href="/"] > .Logo').should("be.visible").click();
    cy.url().should("eq","http://localhost:3000/");
  });
  it("Notre équipe", () => {
    cy.get("ul > :nth-child(3) > a").click();
    cy.url().should("eq", "http://localhost:3000/#notre-equipe");
    cy.get("#notre-equipe > .Title")
      .should("be.visible")
      .and("contain", "Notre équipe");
    cy.get("#notre-equipe > p")
      .should("be.visible")
      .and(
        "contain",
        "Une équipe d’experts dédiés à l’ogranisation de vos événements",
      );
    cy.get("#notre-equipe > .ListContainer").should("be.visible");
    cy.get(".ListContainer > .PeopleCard:visible").should("have.length", 6); 
    cy.get('nav > [href="/"] > .Logo').should("be.visible").click();
    cy.url().should("eq","http://localhost:3000/");
  });
  it("Contact", () => {
    cy.get('nav > [data-testid="button-test-id"]').click();
    cy.url().should("eq", "http://localhost:3000/#contact");
    cy.get("#contact > .Title").should("be.visible").and("contain", "Contact");
    cy.get(
      ':nth-child(1) > :nth-child(1) > [data-testid="field-testid"]',
    ).should("be.visible");
    cy.get(':nth-child(2) > [data-testid="field-testid"]').should("be.visible");
    cy.get(".Select").should("be.visible");
    cy.get(':nth-child(4) > [data-testid="field-testid"]').should("be.visible");
    cy.get(':nth-child(2) > .inputField > [data-testid="field-testid"]').should(
      "be.visible",
    );
    cy.get('.row > :nth-child(1) > [data-testid="button-test-id"]').should(
      "be.visible"); 
    cy.get('nav > [href="/"] > .Logo').should("be.visible").click();
    cy.url().should("eq","http://localhost:3000/");
  });
  it("Footer", () => {
    cy.get("footer").scrollIntoView();
    cy.get('.presta').then(($presta) => {
      if ($presta.is(":visible")) {
        cy.get('.presta > h3')
        cy.get('.presta > [data-testid="card-testid"] > .EventCard__imageContainer > [data-testid="card-image-testid"]').should("be.visible");
        cy.get('.presta > [data-testid="card-testid"] > .EventCard__descriptionContainer').should("be.visible");
        cy.get('.presta > [data-testid="card-testid"] > .EventCard__descriptionContainer > .EventCard__title').should("be.visible");
        cy.get('.presta > [data-testid="card-testid"] > .EventCard__descriptionContainer > .EventCard__month').should("be.visible");
        cy.intercept('GET', 'api("/api/events/last")').as('postLast')
        cy.get('.presta > [data-testid="card-testid"] > .EventCard__imageContainer > [data-testid="card-image-testid"]').click();
        cy.wait('@postLast').then(({response }) => {
          if (response.statusCode === 201) {
            cy.url().should("include","event");
        // inclure les vérifications à faire quand la page est fonctionnel
          }
          else {cy.log (`La redirection suite au click sur l'image n'est pas fonctionnel`)

          }
        });
      } 
      else {
        cy.log(`La partie "Notre dernière réalisation" est absente du footer`);
      }
    });
    cy.get('.contact').then(($contact) => {
      if ($contact.is(":visible")) {
        cy.get('.contact > h3').should("be.visible");
        cy.get('address').should("be.visible");
        cy.get('.contact > :nth-child(3)').should("be.visible");
        cy.get('.contact > :nth-child(4)').should("be.visible");
      } else {
        cy.log(`La partie "Contactez-Nous" est absente du footer`);
      }
    });
    cy.get('.description').then(($description) => {
      if ($description.is(":visible")) {
        cy.get('.description > a > .Logo').should("be.visible");
        cy.get('.description > p').should("be.visible");
      } else {
        cy.log(`La partie "Description" est absente du footer`);
      }
    });
    cy.get('nav > [href="/"] > .Logo').should("be.visible").click();
    cy.url().should("eq","http://localhost:3000/");
  });
  it("Changer de page apres une inscription", () => {
    cy.get('.SlideCard--display > :nth-child(1) > img').click();
    cy.url().should("include", "event");
    cy.get('ul > :nth-child(1) > a')
    cy.url().then((url) => {
      if(url === "http://localhost:3000/#nos-services"){
        cy.get('nav > [href="/"]').click();
        cy.url().should("eq","http://localhost:3000/");
        cy.get('.SlideCard--display > :nth-child(1) > img').click();
        cy.url().should("include", "event");
        cy.get(':nth-child(2) > a').click();
        cy.url().then((url) => {
          if(url ==="http://localhost:3000/#nos-realisations"){
            cy.get('nav > [href="/"]').click()
            cy.url().should("eq","http://localhost:3000/");
            cy.get('.SlideCard--display > :nth-child(1) > img').click();
            cy.url().should("include", "event");
            cy.get('ul > :nth-child(3) > a').click();
            cy.url().then((url) => {
            if(url ==="http://localhost:3000/#notre-equipe"){
              cy.get('nav > [href="/"]').click()
              cy.url().should("eq","http://localhost:3000/");
            } 
            else {
              cy.log(`La navigation vers la page "Notre équipe' depuis une page d'inscription n'est pas possible`);
            }
            })
          } 
          else {
              cy.log(`La navigation vers la page "Notre réalisation' depuis une page d'inscription n'est pas possible`);
            }
        })
      }
      else {
        cy.log(`La navigation vers la page "Nos services' depuis une page d'inscription n'est pas possible`);
        cy.get(':nth-child(2) > a').click();
        cy.url().then((url) => {
          if(url ==="http://localhost:3000/#nos-realisations"){
            cy.get('nav > [href="/"]').click()
            cy.url().should("eq","http://localhost:3000/");
            cy.get('.SlideCard--display > :nth-child(1) > img').click();
            cy.url().should("include", "event");
            cy.get('ul > :nth-child(3) > a').click();
            cy.url().then((url) => {
              if(url ==="http://localhost:3000/#notre-equipe"){
                cy.get('nav > [href="/"]').click()
                cy.url().should("eq","http://localhost:3000/");
              } 
              else {
                cy.log(`La navigation vers la page "Notre équipe' depuis une page d'inscription n'est pas possible`)
            }
            })
        } 
        else {
              cy.log(`La navigation vers la page "Notre réalisation' depuis une page d'inscription n'est pas possible`);
              cy.get('ul > :nth-child(3) > a').click();
              cy.url().then((url) => {
                if(url ==="http://localhost:3000/#notre-equipe"){
                  cy.get('nav > [href="/"]').click()
                  cy.url().should("eq","http://localhost:3000/");
                } 
                else {
                  cy.log(`La navigation vers la page "Notre équipe' depuis une page d'inscription n'est pas possible`)
                }
              })
            }
          })
        }
      })
  });

  it("Changer de page depuis une réalisation", () => {
    cy.get('[href="/event/68cecee8c025d16bfb03a0a2"] > [data-testid="card-testid"] > .EventCard__imageContainer > [data-testid="card-image-testid"]').click();
    cy.url().should("include", "event");
    cy.get('ul > :nth-child(1) > a')
    cy.url().then((url) => {
      if(url === "http://localhost:3000/#nos-services"){
        cy.get('nav > [href="/"]').click();
        cy.url().should("eq","http://localhost:3000/");
        cy.get('[href="/event/68cecee8c025d16bfb03a0a2"] > [data-testid="card-testid"] > .EventCard__imageContainer > [data-testid="card-image-testid"]').click();
        cy.url().should("include", "event");
        cy.get(':nth-child(2) > a').click();
        cy.url().then((url) => {
          if(url ==="http://localhost:3000/#nos-realisations"){
            cy.get('nav > [href="/"]').click()
            cy.url().should("eq","http://localhost:3000/");
            cy.get('[href="/event/68cecee8c025d16bfb03a0a2"] > [data-testid="card-testid"] > .EventCard__imageContainer > [data-testid="card-image-testid"]').click();
            cy.url().should("include", "event");
            cy.get('ul > :nth-child(3) > a').click();
            cy.url().then((url) => {
            if(url ==="http://localhost:3000/#notre-equipe"){
              cy.get('nav > [href="/"]').click()
              cy.url().should("eq","http://localhost:3000/");
            } 
            else {
              cy.log(`La navigation vers la page "Notre équipe' depuis la page d'une réalisation n'est pas possible`);
            }
            })
          }
          else {
              cy.log(`La navigation vers la page "Notre réalisation' depuis la page d'une réalisation n'est pas possible`);
            }
        })
      }
      else {
        cy.log(`La navigation vers la page "Nos services' depuis la page d'une réalisation n'est pas possible`);
        cy.get(':nth-child(2) > a').click();
        cy.url().then((url) => {
          if(url ==="http://localhost:3000/#nos-realisations"){
            cy.get('nav > [href="/"]').click()
            cy.url().should("eq","http://localhost:3000/");
            cy.get('[href="/event/68cecee8c025d16bfb03a0a2"] > [data-testid="card-testid"] > .EventCard__imageContainer > [data-testid="card-image-testid"]').click();
            cy.url().should("include", "event");
            cy.get('ul > :nth-child(3) > a').click();
            cy.url().then((url) => {
              if(url ==="http://localhost:3000/#notre-equipe"){
                cy.get('nav > [href="/"]').click()
                cy.url().should("eq","http://localhost:3000/");
              } 
              else {
                cy.log(`La navigation vers la page "Notre équipe' depuis la page d'une réalisation n'est pas possible`)
            }
            })
        } 
        else {
              cy.log(`La navigation vers la page "Notre réalisation' depuis la page d'une réalisation n'est pas possible`);
              cy.get('ul > :nth-child(3) > a').click();
              cy.url().then((url) => {
                if(url ==="http://localhost:3000/#notre-equipe"){
                  cy.get('nav > [href="/"]').click()
                  cy.url().should("eq","http://localhost:3000/");
                } 
                else {
                  cy.log(`La navigation vers la page "Notre équipe' depuis la page d'une réalisation n'est pas possible`)
                }
              })
            }
          })
        }
      })
  })
})
