import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

import * as actionTypes from '../actions/actionTypes';

export const INITIAL_STATE = fromJS({
  questions: [],
  questionDetail: null,
  createQuestion: null,
});

export const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_QUESTIONS_SUCCESS:
      return state.set('questions', action.payload);
    case actionTypes.GET_QUESTION_DETAIL_SUCCESS:
      return state.set('questionDetail', action.payload);
    default:
      return state;
  }
};

export default combineReducers({ questions });
