import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

import * as actionTypes from '../actions/actionTypes';
import { extractIdsFromSlug, mapifyArray, updateChoices } from '../../utils';

export const INITIAL_STATE = fromJS({
  questions: [],
  questionDetail: null,
  createQuestion: null,
  snackMessage: null,
  getQuestionsFail: false,
  getQuestionDetailFail: false,
  createQuestionFail: false,
  saveVotingFail: false,
});

export const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_QUESTIONS_SUCCESS:
      return state.set(
        'questions',
        fromJS(
          mapifyArray(action.payload, slug => extractIdsFromSlug(slug.url))
        )
      );
    case actionTypes.GET_QUESTIONS_FAIL:
      return state.set('getQuestionsFail', true);
    case actionTypes.GET_QUESTION_DETAIL_SUCCESS:
      return state.set('questionDetail', fromJS(action.payload));
    case actionTypes.GET_QUESTION_DETAIL_FAIL:
      return state.set('getQuestionDetailFail', true);
    case actionTypes.SAVE_VOTING_SUCCESS:
      return state.updateIn(['questions', action.id], question =>
        fromJS(updateChoices(question.toJS(), action.payload))
      );
    case actionTypes.SAVE_VOTING_FAIL:
      return state.set('saveVotingFail', true);
    case actionTypes.SET_SNACK_MESSAGE:
      return state.set('snackMessage', action.payload);
    case actionTypes.CREATE_QUESTION_SUCCESS:
      return state.set(
        'questions',
        state.get('questions').insert(0, fromJS(action.payload))
      );
    case actionTypes.CREATE_QUESTION_FAIL:
      return state.set('createQuestionFail', true);
    case actionTypes.CLEAR_QUESTION_DETAIL:
      return state.set('questionDetail', null);
    case actionTypes.RESET_ERROR_FLAG:
      return state.set(action.payload, false);
    default:
      return state;
  }
};

export default combineReducers({ questions });
