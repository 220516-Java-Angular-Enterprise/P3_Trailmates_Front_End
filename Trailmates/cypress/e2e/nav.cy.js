/// <reference types="cypress" />

describe('Testing nav', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/login')
        cy.login('ericmphu', 'Jumpkillman@123')
    })

    it('should go to trail page', () => {
        cy.get('nav > div').eq(0).click().url().then(($url)  => {
            $url.includes('trailpage')
        })
    })

    it('should get  notifications', () => {
        cy.get('nav > div').eq(1).click().click()
        cy.contains('Notifications')
    
    })

    it('should go to profile', () => {
        cy.get('nav > div').eq(0).click()
        cy.get('nav > div').eq(2).click().get('nav > div > app-user-menu > div > div > div > button').eq(0).click().url().then(($url) => {
            $url.includes('@ericmphu')
        })

    })

    it('should go to messages', () => {
        cy.get('nav > div').eq(2).click().get('nav > div > app-user-menu > div > div > div > button').eq(1).click().url().then(($url) => {
            $url.includes('messaging')
        })

    })

    it('should logout', () => {
        cy.get('nav > div').eq(2).click().get('nav > div > app-user-menu > div > div > div > button').eq(2).click().url().then(($url) => {
            $url.includes('login')
        })
    })


})