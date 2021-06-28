import * as actionTypes from './actionTypes';
import * as api from '../../api';

export const getQuestions = () => async dispatch => {
  try {
    dispatch(resetErrorFlag('getQuestionsFail'));
    const response = await api.getQuestions();

    dispatch(getQuestionsSuccess(response));
  } catch (error) {
    dispatch(getQuestionsFail(error));
  }
};

export const getQuestionsSuccess = payload => ({
  type: actionTypes.GET_QUESTIONS_SUCCESS,
  payload,
});

export const getQuestionsFail = error => ({
  type: actionTypes.GET_QUESTIONS_FAIL,
  payload: error,
});

export const getQuestionDetail = id => async dispatch => {
  try {
    dispatch(resetErrorFlag('getQuestionDetailFail'));
    const response = await api.getQuestionDetail(id);

    dispatch(getQuestionDetailSuccess(response));
  } catch (error) {
    dispatch(getQuestionDetailFail());
  }
};

export const getQuestionDetailSuccess = payload => ({
  type: actionTypes.GET_QUESTION_DETAIL_SUCCESS,
  payload,
});

export const getQuestionDetailFail = () => ({
  type: actionTypes.GET_QUESTION_DETAIL_FAIL,
});

export const saveVoting =
  (id, voteIds) =>
  async (dispatch, getState, { history }) => {
    try {
      if (voteIds && voteIds.length === 0) {
        return;
      }
      const response = await api.saveVoting(id, voteIds);
      dispatch(saveVotingSuccess(`/questions/${id}`, response));
      dispatch(setSnackMessage('Your voting saved successfully!'));
      history.push('/questions');
    } catch (error) {
      dispatch(saveVotingFail(error));
    }
  };

export const saveVotingSuccess = (id, payload) => ({
  type: actionTypes.SAVE_VOTING_SUCCESS,
  id,
  payload,
});

export const saveVotingFail = payload => ({
  type: actionTypes.SAVE_VOTING_FAIL,
  payload,
});

export const createQuestion =
  question =>
  async (dispatch, getState, { history }) => {
    try {
      dispatch(resetErrorFlag('createQuestionFail'));
      const response = await api.createQuestion(question);
      dispatch(createQuestionSuccess(response));
      dispatch(setSnackMessage('Question created successfully!'));
      history.push('/questions');
    } catch (error) {
      dispatch(createQuestionFail(error));
    }
  };

export const createQuestionSuccess = question => ({
  type: actionTypes.CREATE_QUESTION_SUCCESS,
  payload: question,
});

export const createQuestionFail = payload => ({
  type: actionTypes.CREATE_QUESTION_FAIL,
  payload,
});

export const clearQuestionDetail = () => ({
  type: actionTypes.CLEAR_QUESTION_DETAIL,
});

//UI related actions
export const setSnackMessage = payload => ({
  type: actionTypes.SET_SNACK_MESSAGE,
  payload,
});

export const resetErrorFlag = field => ({
  type: actionTypes.RESET_ERROR_FLAG,
  payload: field,
});

export const showLoader = flag => ({
  type: actionTypes.SHOW_LOADER,
  payload: flag,
});
