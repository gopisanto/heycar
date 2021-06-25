import { fromJS, Map } from 'immutable';
import { combineReducers } from 'redux';

import * as actionTypes from '../actions/actionTypes';
import { extractIdsFromSlug, mapifyArray, updateChoices } from '../../utils';

export const INITIAL_STATE = fromJS({
  questions: [],
  questionDetail: null,
  createQuestion: null,
  showSnackbar: false,
  snackMessage: null,
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
    case actionTypes.GET_QUESTION_DETAIL_SUCCESS:
      return state.set('questionDetail', fromJS(action.payload));
    case actionTypes.SAVE_VOTING_SUCCESS:
      return state.updateIn(['questions', action.id], question =>
        fromJS(updateChoices(question, action.payload))
      );
    case actionTypes.TOGGLE_SNACKBAR:
      return state.set('showSnackbar', false).set('snackMessage', null);
    case actionTypes.SET_SNACK_MESSAGE:
      return state
        .set('snackMessage', action.payload)
        .set('showSnackbar', true);
    case actionTypes.CREATE_QUESTION_SUCCESS:
      return state.set(
        'questions',
        state.get('questions').insert(0, action.payload)
      );
    case actionTypes.CLEAR_QUESTION_DETAIL:
      return state.set('questionDetail', null);
    default:
      return state;
  }
};

export default combineReducers({ questions });
