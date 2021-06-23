import * as actionTypes from './actionTypes';
import * as api from '../../api';

export const getQuestions = () => async dispatch => {
  const response = await api.getQuestions();

  dispatch({ type: actionTypes.GET_QUESTIONS_SUCCESS, payload: response });
};

export const getQuestionDetail = id => async dispatch => {
  const response = await api.getQuestionDetail(id);

  dispatch({ type: actionTypes.GET_QUESTION_DETAIL_SUCCESS, payload: response });
};
