describe('As a visitor on the homepage', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.injectAxe()
    })
    
    it('I can load the page', () => {
        cy.visit('/')
    })

    it('No critical a11y violations prevent me to use the page', () => {
        // Test on initial load, only report and assert for critical impact items
        cy.checkA11y(null, {
        includedImpacts: ['critical']
        })
    })

    it('I can see the latest Manateem Github repositories', () => {
        cy.get('[data-testid=repository]').should('have.length', 1)
    })
})
  