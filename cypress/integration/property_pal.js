Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

describe('Page loaded successfully', () => {
    it('logo is present', () => {
        cy.visit('https://propertypal.com')
          .get('.search-logo')
          .should('be.visible')
    });
});

describe('Search Tests', () => {
    it('Search by My Location', () => {
        cy.get('.search-ctrl').click()
          .get('.suggestions-location').click()
          .get('.suggestions-location').should('not.exist')
          .get('button[data-params=\'{ "st": "sale" }\']').click()
          .get('.sr-top .pgheader h1').contains("Property For Sale Near My Location")
    });

    it('Search by BT6', () => {
        cy.get('.mainnav-logo').click()
          .get('.search-logo').should('be.visible')
          .get('.search-row .search-ctrl #query').type("{selectAll}BT6")
          .get('button[data-params=\'{ "st": "sale" }\']').click()
          .get('#breadcrumbs > span:nth-child(3)').contains("BT6")
    });

    it('No Results', () => {
        cy.get('.mainnav-logo').click()
          .get('.search-logo').should('be.visible')
          .get('.search-row .search-ctrl #query').type("{selectAll}BT Does Not Exist")
          .get('button[data-params=\'{ "st": "sale" }\']').click()
          .get('.noresults-heading').contains("Sorry, No properties found")
    });
});
