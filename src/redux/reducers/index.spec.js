import { fromJS } from 'immutable';

import * as actions from '../actions/actions';
import * as actionTypes from '../actions/actionTypes';
import { INITIAL_STATE, questions as reducer } from '../reducers';
import { mapifyArray, extractIdsFromSlug, updateChoices } from '../../utils';
import questions from '../mock/questions.json';
import questionDetail from '../mock/questionDetail.json';

describe('Reducers', () => {
  it('GET_QUESTIONS_SUCCESS', () => {
    const nextState = reducer(
      INITIAL_STATE,
      actions.getQuestionsSuccess(questions.data)
    );
    const expected = INITIAL_STATE.set(
      'questions',
      fromJS(mapifyArray(questions.data, slug => extractIdsFromSlug(slug.url)))
    );

    expect(nextState).toEqual(expected);
  });

  it('GET_QUESTION_DETAIL_SUCCESS', () => {
    const nextState = reducer(
      INITIAL_STATE,
      actions.getQuestionDetailSuccess(questionDetail.data)
    );
    const expected = INITIAL_STATE.set(
      'questionDetail',
      fromJS(questionDetail.data)
    );

    expect(nextState).toEqual(expected);
  });

  it('SAVE_VOTING_SUCCESS', () => {
    const newChoice = {
      choice: 'Objective-C',
      votes: 2,
      url: '/questions/11/choices/76',
    };
    let nextState = reducer(
      INITIAL_STATE,
      actions.getQuestionsSuccess(questions.data)
    );
    let expected = reducer(
      INITIAL_STATE,
      actions.getQuestionsSuccess(questions.data)
    );
    expected = expected.updateIn(['questions', '11'], question =>
      fromJS(updateChoices(question.toJS(), Array(newChoice)))
    );
    nextState = reducer(
      nextState,
      actions.saveVotingSuccess('11', Array(newChoice))
    );
    expect(nextState).toEqual(expected);
  });

  it('SET_SNACK_MESSAGE', () => {
    let nextState = reducer(INITIAL_STATE, actions.setSnackMessage(null));
    let expected = INITIAL_STATE.set('snackMessage', null);

    expect(nextState).toEqual(expected);

    nextState = reducer(
      INITIAL_STATE,
      actions.setSnackMessage('Saved successfully!')
    );
    expected = INITIAL_STATE.set('snackMessage', 'Saved successfully!');
  });

  it('CREATE_QUESTION_SUCCESS', () => {
    const newQuestion = {
      question: 'Unit Testing?',
      choices: [
        {
          choice: 'option1',
          votes: 1,
          url: '/questions/12/choices/100',
        },
        { choice: 'option1', votes: 0, url: '/questions/12/choices/101' },
      ],
      published_at: '2021-06-24T15:27:11.511Z',
      url: '/questions/12',
    };

    const nextState = reducer(
      INITIAL_STATE,
      actions.createQuestionSuccess(newQuestion)
    );
    const expected = INITIAL_STATE.set('questions', fromJS(Array(newQuestion)));

    expect(nextState).toEqual(expected);
  });

  it('CLEAR_QUESTION_DETAIL', () => {
    const nextState = reducer(INITIAL_STATE, actions.clearQuestionDetail());
    const expected = INITIAL_STATE.set('questionDetail', null);

    expect(nextState).toEqual(expected);
  });

  it('SAVE_VOTING_FAIL', () => {
    const nextState = reducer(INITIAL_STATE, actions.saveVotingFail());
    const expected = INITIAL_STATE.set('saveVotingFail', true);

    expect(nextState).toEqual(expected);
  });

  it('GET_QUESTION_DETAIL_FAIL', () => {
    const nextState = reducer(INITIAL_STATE, actions.getQuestionDetailFail());
    const expected = INITIAL_STATE.set('getQuestionDetailFail', true);

    expect(nextState).toEqual(expected);
  });

  it('GET_QUESTIONS_FAIL', () => {
    const nextState = reducer(INITIAL_STATE, actions.getQuestionsFail());
    const expected = INITIAL_STATE.set('getQuestionsFail', true);

    expect(nextState).toEqual(expected);
  });

  it('CREATE_QUESTION_FAIL', () => {
    const nextState = reducer(INITIAL_STATE, actions.createQuestionFail());
    const expected = INITIAL_STATE.set('createQuestionFail', true);

    expect(nextState).toEqual(expected);
  });

  it('RESET_ERROR_FLAG', () => {
    const state = INITIAL_STATE.set('createQuestionFail', true);
    const expected = state.set('createQuestionFail', false);
    const nextState = reducer(
      state,
      actions.resetErrorFlag('createQuestionFail')
    );

    expect(nextState).toEqual(expected);
  });
});
