/// <reference types="cypress" />

describe('Cypress Tests', () => {
  it('Should display questions', () => {
    cy.intercept('GET', 'https://polls.apiblueprint.org/questions/', {
      fixture: 'questions.json',
    }).as('getQuestions');
    cy.visit('http://localhost:3000');
    cy.wait('@getQuestions').then(() => {
      cy.get('[data-cy=questions-container]')
        .children()
        .should('have.length', 2);
    });
  });

  it('Should navigate to question detail page on click', () => {
    cy.intercept('GET', 'https://polls.apiblueprint.org/questions', {
      fixture: 'questions.json',
    }).as('getQuestions');
    cy.intercept('GET', 'https://polls.apiblueprint.org/questions/11', {
      fixture: 'question_detail.json',
    }).as('getQuestionDetail');
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=questions-container]').eq(0).click();
    cy.wait('@getQuestionDetail').its('response.statusCode').should('eq', 200);
  });

  it('Should able to vote', () => {
    cy.intercept('GET', 'https://polls.apiblueprint.org/questions/11', {
      fixture: 'question_detail.json',
    });
    cy.intercept(
      'POST',
      'https://polls.apiblueprint.org/questions/11/choices/76',
      req => {
        req.continue(res => res.send(201));
      }
    ).as('saveVoting');
    cy.get('[data-cy=choices_table]')
      .eq(0)
      .get('[data-cy=vote_icon]')
      .eq(0)
      .click();
    cy.get('[data-cy=save_voting]').click();
    cy.wait('@saveVoting').its('response.statusCode').should('eq', 201);
  });

  it('Should able to create question', () => {
    cy.intercept('POST', 'https://polls.apiblueprint.org/questions', req => {
      req.continue(res => res.send(201));
    }).as('createQuestion');
    cy.get('[data-cy=create_icon]').click();
    cy.wait(1000);
    cy.get('[data-cy=question]').focus().type('Do you like cypress?');
    cy.get('[data-cy=choices] input').eq(0).focus().type('Yes');
    cy.get('[data-cy=add_new_choice]').click();
    cy.get('[data-cy=choices] input').eq(1).focus().type('No');
    cy.get('[data-cy=create_question').click();
    cy.wait('@createQuestion').its('response.statusCode').should('eq', 201);
  });
});
