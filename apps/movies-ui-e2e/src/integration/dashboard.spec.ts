describe('Dashboard test', () => {
  it('Visits the dashboard page', () => {
    cy.visit('/');
    cy.contains('Angular Movies example');
    cy.contains('Register');
    cy.contains('Login');
    cy.get('.navbar-nav').should('have.length', 2);
    cy.get('.navbar-nav').should('not.contain', 'Users');
    cy.contains('This app is running');
  });
});
