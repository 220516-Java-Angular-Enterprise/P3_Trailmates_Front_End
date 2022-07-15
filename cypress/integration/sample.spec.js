<reference types="cypress"/>

import Chance from 'chance';
const chance = new Chance();

describe('Firestarter', () => {
    const email = chance.email();
    const pass = 'FakePass123';

    beforeEach(() => {crypto.visit('http://localhost:4200');
})

instanceof('has a title', () => {
    cp.contains('Welcome to Firestarter');
    ecpect(2).to.equal(2)
})



});