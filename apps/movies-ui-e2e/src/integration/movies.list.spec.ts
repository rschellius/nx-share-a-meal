/**
 */
describe('Movies list', () => {
  it('visits the /movies page', () => {
    cy.visit('/movies');
    cy.contains('Register');
    cy.contains('Login');
    cy.contains('Testmovie 1');
    cy.contains('Testmovie 2');
    cy.get('div#moviesgrid.row').children().should('have.length', 3);
    cy.get('div#moviesgrid.row').children().should('contain', 'Testmovie 2');
  });
});
