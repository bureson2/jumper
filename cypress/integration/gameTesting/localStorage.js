import "cypress-localstorage-commands"

let url = 'http://localhost:63342/jumper/jumper/index.html?_ijt=34ksif82hgqi107ebp0ah85h0i&_ij_reload=RELOAD_ON_SAVE'

describe('The Local storage', () => {
    it('successfully loads with correct params', () => {
        cy.visit(url)
        cy.get('#nickname').type('Hero')
        cy.get('#character3 + img').click()
        cy.get('#shot3 + img').click()

        cy.get('#submit').click()

        cy.getLocalStorage('nickname').should('equal', 'Hero')
        cy.getLocalStorage('character').should('equal', 'red')
        cy.getLocalStorage('shot').should('equal', 'red')
    })
})
