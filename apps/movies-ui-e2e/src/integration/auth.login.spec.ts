/**
 *
 */
describe('Auth login', () => {
  const localStorageUser = {
    name: { firstName: 'Firstname', lastName: 'Lastname' },
    emailAdress: 'first.last@avans.nl',
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzUwMjIzNjQsImlhdCI6MTU3NDE1ODM2NCwic3ViIjp7ImVtYWlsIjoiYWRtaW5AYXZhbnMubmwiLCJpZCI6IjVkYzlhY2Y3NmUzOTVhMTY1ODkwMjk2MiJ9fQ.qRPy-lTPIopAJPrarJYZkxK0suUJF_XZ9szeTtie4nc',
  };

  it('visits the /login page', () => {
    cy.visit('/login');
    cy.contains('Login');
    cy.get('h2').should('have.text', 'Login');
    cy.contains('Email address');
    cy.contains('Password');
    cy.contains('Sign in');
    cy.get('button#submitbutton').should('have.text', ' Sign in ');
  });

  it('should show error message when email is invalid', () => {
    cy.visit('/login');
    cy.get('input#inputEmail').type('some invalid email');
    cy.get('input#inputPassword').click();
    cy.get('#email-invalid').should(
      'have.text',
      'Please enter a valid email address'
    );
  });

  it('should return a token when login is valid', () => {
    cy.visit('/login');
    cy.get('input#inputEmail').type('adress@server.com');
    cy.get('input#inputPassword').type('somepassword');
    cy.get('button#submitbutton')
      .click()
      .should(() => {
        //
        expect(localStorage.getItem('currentuser')).to.eq(
          JSON.stringify(localStorageUser)
        );
      });
    cy.location('pathname').should('eq', '/dashboard');
    cy.get('button#userFullName').should('have.text', ' Firstname Lastname ');
    cy.get('.navbar-nav').should('contain', 'Users');
  });
});
