/// <reference types="cypress" />
var faker = require('faker');
import 'cypress-file-upload';

describe('Preenchimento do formulario Pipefy', () => {

    beforeEach(() => {
        cy.visit('https://app.pipefy.com/public/form/6qhKljB1')
    });

    it('Deve realizar cadastro com sucesso', () => {

        let name = faker.name.findName()
        let words = faker.random.words()
        let time = faker.time.recent()
        let email = faker.internet.email(name)


        cy.get('[name="customFields.your_name"]').type(name)
        cy.get('[name="customFields.why_do_you_want_to_work_at_pipefy"]').type(words)
        cy.get(':nth-child(3) > label').click()
        cy.get('[class="pp-action-add pp-ico-assignee"]').click()
        cy.get('[class="pp-input pp-display-block"]').type('felipe')
        cy.get('.pp-item-list > a').type('Cypress.io{enter}')

        cy.get('.pp-new-public-form-left-description').click()

        cy.get('[id="fake-pipe-field-publicForm-customFields_select_today_s_date-input"]').click()
        cy.get('[title="Salvar"]').click()

        cy.get('[name="customFields.select_option_b"]').select('B');

        cy.get('[name="customFields.what_time_is_it_now"]').type(time)

        cy.get('input[type="file"]')
            .as('fileInput')
            .attachFile('example.jpg')
        cy.get('[data-dz-name="true"]')
            .as('fileLink')
            .should('be.visible')
            .and('have.text', 'example.jpg')

        cy.get('.selected-flag > .iti-flag').type('Spain')
            .type('Cypress.io{enter}')
        cy.get('[name="customFields.place_a_phone_number_from_spain_country"').type('613345679')

        cy.get('.pp-new-public-form-wrapper > :nth-child(1) > .pp-btn').click()

        cy.get('[name="creatorEmail"]').type(email)
        cy.get('[type="submit"]').click()
        cy.get('.pp-new-public-form-success-message').should('contain', 'Verifique')

    });

});