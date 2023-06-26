describe('init', () => {
  it('should rename Latitia to Laetita', () => {
    cy.visit('');
    cy.findByRole('link', { name: 'Customers' }).click();
    cy.findByLabelText(/Latitia/)
      .findByRole('link')
      .click();
    cy.get('[data-testid=inp-firstname]').clear();
    cy.get('[data-testid=inp-firstname]').type('Laetitia');
    cy.get('[data-testid=btn-submit]').click();

    cy.get('div').should('contain.text', 'Laetitia');
  });
  it('should fail', () => {
    cy.visit('');
    cy.get('a').should('have.attr', 'href');
    cy.get('a').contains('Customers').click();
  });

  it('should click on button', () => {
    cy.visit('');

    cy.get('[data-testid=btn-click]').as('button');
    cy.get('@button').click();
    cy.get('@button').should('contain.text', 'Unclick Me');
  });

  it('should click on covered button', () => {
    cy.visit('');

    cy.get('div.mdc-switch__ripple').first().click();
  });

  it.only('should intercept holidays', () => {
    let holidaysCount = 0;
    cy.visit('');
    cy.request('https://api.eternal-holidays.net/holiday').then(
      (res) => (holidaysCount = res.body.length)
    );
    cy.findByRole('link', { name: 'Holidays' }).click();

    cy.get('app-holiday-card').should(($holidayCards) => {
      expect($holidayCards).to.have.length(holidaysCount);
    });
  });
});
