/// <reference types="Cypress" />
import 'cypress-axe';

const url = 'http://localhost:3002/html/link.html';
const A11Y_OPTIONS = {
  runOnly: {
    type: 'tag',
    values: ['wcag21aa', 'wcag2aa', 'best-practice', 'section508']
  }
};

context('Actions', () => {
  describe('Links Component - Axe Accesibility Check', () => {
    before(() => {
      cy.visit(url);
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on entire page', () => {
      cy.checkA11y(A11Y_OPTIONS);
    });

    it('Has no detectable a11y violations on LINK COMPONENT', () => {
      cy.checkA11y('.container', {
        runOnly: {
          type: 'tag',
          values: ['wcag2aa']
        }
      });
    });

    it('Has no a11y violations after button click / Disable button', () => {
      // Light mode
      cy.get('button').contains('Enable');
      cy.contains('Enable').click();

      // Dark mode
      cy.get('button').contains('Enable');
      cy.contains('Enable').click();
      cy.checkA11y(A11Y_OPTIONS);
    });
  });
});
