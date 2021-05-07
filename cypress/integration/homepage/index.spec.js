describe('As a visitor on the homepage', () => {
    beforeEach(() => {
        cy.visit('/')
    })
      
    it('I can load the page', () => {
        cy.visit('/')
    })
    it('I can see the latest Manateem Github repositories', () => {
        cy.get('[data-testid=repository]').should('have.length', 1)
    })
})
  