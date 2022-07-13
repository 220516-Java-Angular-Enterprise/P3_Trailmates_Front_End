/// <reference types="cypress" />

describe('Testing Home Page', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200')
    })

//Checked if Main mage has headers
    it('display h2', () => {

        cy.get('h2').contains("TrailMate")
        cy.get('h2').contains("Never Hike")
        cy.get('h2').contains("Alone Again")
    })

    //Checked if Main mage has text
    it('Displays main text', () => {
        cy.get('p').contains("Now you can hike that trail you've been eying, TrailMates makes it easy to find likeminded people to hit the trail with!")
    })

    //Check if button to login works
    it('Routes to Login on click', () => {
        cy.get('div.text > a').eq(0).click().url().then(($url)=>{
            $url.includes("login")
            cy.get('h1').contains("Sign In")
        })
        
    })

    //Check if button to signup works
    it('Routes to Signup on click', () => {
        cy.get('div.text > a').eq(1).click().url().then(($url) => {
            $url.includes("signup")
            cy.get('h1').contains("Sign Up")
        })

    })

})