## Prerequis

Vous avez besoin d'installer Node.js et NPM (https://nodejs.org/)

## Configuration de Cypress

1. Ouvrir un Terminal pointant sur le dossier où se situe votre back/Front-End et taper la commande :
   
`npx cypress open`

3. Fermer l'IDE Cypress qui vient de s'ouvrir

4. Remplacer le fichier  /cypress.config.js créés automatiquement par celui présent dans ce dossier

5. Remplacer le dossier /Cypress créés automatiquement par ce dossier

6. /!\ Dans le fichier /cypress.config.js bien modifier les valeurs suivantes :

- baseUrl : URL du site web à tester
- apiUrl : URL des api lier au site web à tester
  
7. Lancer la campange de test via le Terminal avec la commande :
   
`npx cypress run`

## Commande a retenir 

Lancer Cypress en mode IDE/GUI :

`npx cypress open`

Lancer toute une campagne en mode headless :

`npx cypress run`

Lancer une spec spécifique : 

`npx cypress run --spec "cypress/e2e/nom_de_la_spec.cy.js"`

Lancer les test sur un navigateur spécifique :

`npx cypress run --browser nom_navigateur`

