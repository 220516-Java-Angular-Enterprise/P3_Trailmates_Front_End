/// <reference types="cypress" />

describe('Testing Home Page', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/login')
    })

    //Checked if Main mage has headers
    it('testing login', () => {
        cy.get("#login-username").type("ericmphu");
        cy.get("#login-password").type("Jumpkillman@123");
        cy.get("button").eq(0).click().url().then(($url) => {
            $url.includes("ericmphu")
            cy.get('h3').contains("@ericmphu")
    })
})

})