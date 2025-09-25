const api = (p) => `${Cypress.env("apiUrl")}${p}`;
const now = new Date().toISOString();
const JDD_contact = [  {
    name: "SNOW",
    surname: "John",
    contactType: "ENTREPRISE",
    email: "snow.john@test.fr ",
    message: "Le matin se lève sur un ciel encore pâle, et la ville respire doucement comme si elle synchronisait son rythme à la première gorgée de café. Dans cet entre-deux où la rue hésite entre silence et moteurs, je rallume l’écran qui veille dans l’ombre du bureau. Une liste de tâches surgit aussitôt, dense mais familière : audits de tests à finaliser, campagne d’automatisation à étendre, refonte de la stratégie QA pour un projet e-commerce encore fragile, et un message marqué d’une étoile qui me rappelle que le soir, scène différente : caméra, overlays, et l’univers de The BearM, le miel du divertissement. Deux vies, une même ligne directrice : construire avec méthode, partager avec sincérité./n/nJe commence par relire les scénarios critiques. Rien de spectaculaire à première vue : créer un compte, parcourir un catalogue, ajouter au panier, payer sans friction, recevoir une confirmation limpide. Pourtant, tout se joue là, dans la précision des flux, la clarté des messages d’erreur, l’élégance d’un délai maîtrisé. Je dresse les priorités : stabiliser la suite d’intégration continue, isoler les tests flaky, éclaircir les dépendances Docker qui s’entêtent à masquer les ports, consolider les fixtures et séparer nettement ce qui relève de l’unitaire, de l’intégration et de l’end-to-end. Pas de magie, seulement des couches de rigueur posées les unes sur les autres comme un sol solide sous les pas d’un utilisateur pressé./n/nCôté outillage, j’aime rappeler une vérité simple : les outils ne remplacent pas le jugement. Cypress, Selenium, Robot Framework, tous ont leur musique, leur tempo, leur utilité. La question n’est pas lequel est le meilleur ?, mais que veut-on protéger, prouver, accélérer ?. Pour un front réactif et des tests proches du réel, Cypress déploie une belle aisance ; pour des parcours distribués et des navigateurs variés, Selenium garde une polyvalence infatigable ; pour des équipes qui adorent la lisibilité et la structure déclarative, Robot Framework demeure un compagnon fiable. Chaque choix technique est une promesse : à quoi s’engage-t-on, et quelle dette assume-t-on demain ?/n/nSur le ticket principal du jour, un détail me chagrine : la validation client côté front passe, mais le serveur répond mollement, sans conviction. Je capture la requête, vérifie les en-têtes, rejoue l’appel avec un body propre. Le problème se niche où l’on s’y attend le moins : une transformation silencieuse de contenu qui altère un champ au format pourtant documenté. Je rédige un test d’API ciblé, pour qu’à l’avenir cette brèche se referme d’elle-même, tôt, avant que la régression ne se glisse jusqu’en production. Les tests sont des garde-fous, mais ils sont aussi des souvenirs : ils écrivent noir sur blanc ce que nous avons appris, et nous évitent de le réapprendre au pire moment./n/nL’après-midi, j’avance sur la stratégie. Elle ne tient pas seulement en un schéma et trois flèches ; elle vit dans la gouvernance des risques, le découpage en tranches livrables, l’alignement des parties prenantes. J’esquisse une pyramide de tests raisonnable, pas une cathédrale : beaucoup d’unitaires rapides et expressifs, une couche d’intégration pour valider le tissage des modules, des scénarios end-to-end qui ne s’éparpillent pas mais visent l’essentiel : paiement, authentification, panier, recherche. J’ajoute une checklist de qualité non-fonctionnelle : performance, accessibilité, sécurité de base, observabilité. Ce qui n’est pas mesuré n’est pas amélioré, me répète une petite voix. Alors je branche des métriques, je note des seuils, je propose des alarmes. L’équipe saura où elle va quand elle saura ce qu’elle voit./n/nLa journée technique se referme, mais l’autre scène s’allume. Je range le clavier des tests pour sortir celui des scènes, overlays, transitions. The BearM entre en piste avec son humour et ses racines, un pied dans la culture gaming, l’autre ancré dans les sonorités caribéennes. J’aime ce contraste : l’exigence de l’ingénierie d’un côté, la chaleur d’un live de l’autre. Au fond, ce n’est pas si différent. Dans les deux cas, je cherche la même chose : une expérience solide, accueillante, qui donne envie de rester. Ce soir, le programme est simple : découverte musicale, partage de tips pour débuter en automatisation, puis un moment Q&A où l’on parle Docker sans esbroufe, juste avec des exemples qui tiennent la route./n/nPendant l’échauffement, je relis quelques messages reçus. Beaucoup de personnes veulent apprendre vite. Je réponds que la vitesse naît de la clarté. Mieux vaut une base propre qu’un château de cartes. Mieux vaut comprendre d’où vient une erreur que d’empiler des contournements. Mieux vaut s’accorder sur une nomenclature, une arborescence, des conventions, plutôt que de courir sans boussole. La compétence, c’est l’accumulation d’habitudes fiables. On gagne du temps lorsqu’on n’a pas à réfléchir aux gestes simples./n/nLe live démarre. Première séquence : je montre comment dépanner un conteneur récalcitrant sans paniquer. On inspecte, on nettoie, on reconstruit, on documente. Je répète une phrase qui m’est chère : Un bon log vaut mieux qu’un long soupir. La seconde séquence traite de Cypress. J’explique la logique des commandes, la promesse implicite de chaque assertion, la différence entre un test qui vérifie et un test qui protège. J’insiste : un test qui passe parfois n’est pas un test, c’est une loterie. On veut des verdicts tranchés, reproductibles, explicites. Je montre comment isoler les fixtures, comment stubber un endpoint sans dénaturer le sens du parcours. Les regards s’illuminent dans le chat : la technique devient lisible, humaine, praticable./n/nEntre deux transitions, il y a la musique. Ces rythmes des Antilles qui roulent comme des vagues. Ils me rappellent qu’un projet, même exigeant, doit garder du souffle. On peut viser le meilleur sans perdre la joie. Une équipe soudée avance mieux qu’un plan parfait. Un test qui raconte l’intention vaut plus qu’un test qui récite une formule. Et une marque personnelle n’est pas un masque : c’est un prisme. The BearM n’efface rien ; il rassemble. Il prend le sérieux pour le rendre accessible, il prend la passion pour la partager./n/nQuand vient la fin, je ferme calmement les fenêtres. Les commits du jour tracent une trajectoire, les questions du live ouvrent des pistes pour demain. Je me promets de garder ce cap : réduire le bruit, amplifier l’essentiel, construire des environnements prévisibles où les erreurs ne sont pas des drames mais des informations. La qualité n’est pas un vernis posé après coup ; c’est une manière d’habiter le travail. Et si l’on y met un peu de chaleur, de musique, et de sourire, alors la route devient plus douce, sans renoncer à l’exigence. Demain, on recommencera. On testera mieux. On expliquera plus simplement. On créera encore. Parce que c’est ça, au fond, le métier : rendre le chemin clair et l’horizon désirable.",
  }
];
const JDD_inscription = [
  {
    eventId: "0efrg1400351423rfd",
    name: "John",
    surname: "SNOW",
    email: "snow.john@test.fr",
    date: now,
  }];

describe("Test aux limites : /api/contact => ", () => {
  it("champ name < 20 caractères", () => {
    cy.wrap(JDD_contact).each((p) => {
      const body = { ...p, name : 'ValoisBourbonOrleans' };
      cy.request("POST", api("/api/contact"), body).then(({ status, body }) => {
        expect(status).to.eq(201);
        expect(body).to.have.property(
          "message",
          "Merci de nous avoir contacté !",
        );
      })
    })
  });
  it("champ name > 20 caractères", () => {
    cy.wrap(JDD_contact).each((p) => {
      const body = { ...p, name : 'ChateaubriandMontfort' };
      cy.request({
        method :"POST", 
        url : api("/api/contact"), 
        body : body,
        failOnStatusCode: false,}).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
        expect(body).to.have.nested.property('error.errors.name.properties.maxlength', 20);
        });
    })
  });
    it("champ surname < 20 caractères", () => {
    cy.wrap(JDD_contact).each((p) => {
      const body = { ...p, surname : 'AlexandrianaMelusine' };
      cy.request("POST", api("/api/contact"), body).then(({ status, body }) => {
        expect(status).to.eq(201);
        expect(body).to.have.property(
          "message",
          "Merci de nous avoir contacté !",
        );
      })
    })
  });
  it("champ surname > 20 caractères", () => {
    cy.wrap(JDD_contact).each((p) => {
      const body = { ...p, surname : 'JeanBaptisteAlexandre' };
      cy.request({
        method :"POST", 
        url : api("/api/contact"), 
        body : body,
        failOnStatusCode: false,}).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
        expect(body).to.have.nested.property('error.errors.surname.properties.maxlength', 20);
        });
    })
  })
});
describe("Test aux limites : /api/inscription => ", () => {
  it("champ name < 20 caractères", () => {
    cy.wrap(JDD_inscription).each((p) => {
      const body = { ...p, name : 'ValoisBourbonOrleans' };
      cy.request("POST", api("/api/inscription"), body).then(({ status, body }) => {
        expect(status).to.eq(201);
        expect(body).to.have.property(
          "message",
          "Merci de nous avoir contacté !",
        );
      })
    })
  });
  it("champ name > 20 caractères", () => {
    cy.wrap(JDD_inscription).each((p) => {
      const body = { ...p, name : 'ChateaubriandMontfort' };
      cy.request({
        method :"POST", 
        url : api("/api/inscription"), 
        body : body,
        failOnStatusCode: false,}).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
        expect(body).to.have.nested.property('error.errors.name.properties.maxlength', 20);
        });
    })
  });
    it("champ surname < 20 caractères", () => {
    cy.wrap(JDD_inscription).each((p) => {
      const body = { ...p, surname : 'AlexandrianaMelusine' };
      cy.request("POST", api("/api/inscription"), body).then(({ status, body }) => {
        expect(status).to.eq(201);
        expect(body).to.have.property(
          "message",
          "Merci de nous avoir contacté !",
        );
      })
    })
  });
  it("champ surname > 20 caractères", () => {
    cy.wrap(JDD_inscription).each((p) => {
      const body = { ...p, surname : 'JeanBaptisteAlexandre' };
      cy.request({
        method :"POST", 
        url : api("/api/inscription"), 
        body : body,
        failOnStatusCode: false,}).then(({ status, body }) => {
        expect(status).to.eq(400);
        expect(body.error).to.exist;
        expect(body).to.have.nested.property('error.errors.surname.properties.maxlength', 20);
        });
    })
  })
})