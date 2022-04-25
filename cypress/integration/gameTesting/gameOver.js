let url = 'http://localhost:63342/jumper/jumper/index.html?_ijt=34ksif82hgqi107ebp0ah85h0i&_ij_reload=RELOAD_ON_SAVE'

describe('The Home Page', () => {
    it('successfully loads, game starts and player die', () => {
        cy.visit(url)
        cy.get('#nickname').type('Hero')
        cy.get('#submit').click()

        cy.get('body').trigger('keydown', { keyCode: 68 })
        cy.wait(1000)
        cy.get('body').trigger('keyup', { keyCode: 68 })

        cy.get('h1').should('have.text', 'GAME OVER')
    })
})
