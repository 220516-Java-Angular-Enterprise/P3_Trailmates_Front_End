/// <reference types="cypress" />

describe('Testing Login Page', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/login')
    })

    //Checked if Main mage has headers
    it('testing successful login', () => {
        // cy.get("#login-username").type("ericmphu");
        // cy.get("#login-password").type("Jumpkillman@123");
        // cy.get("button").eq(0).click().url().then(($url) => {
        //     $url.includes("ericmphu")
        //     cy.get('h3').contains("@ericmphu")
        
    // })
       cy.login('ericmphu', 'Jumpkillman@123')
       cy.url().then(($url) => {
        $url.includes('ericmphu')
       })
        

})
    // test if does not login with invalid cred
    it('testing failed login', () => {

        cy.login('ericmphu', 'ericmphu@123')
        cy.url().then(($url) => {
            $url.includes('not.exists','ericmphu')
        })

    })

    // check if signup button work
    it('testing signup button', () => {

        cy.get("button").eq(1).click()
        cy.url().then(($url) => {
            $url.includes("signup")
            cy.get('h1').contains("Sign Up")
        })

    })

})