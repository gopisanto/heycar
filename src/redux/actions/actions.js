import * as actionTypes from './actionTypes';
import * as api from '../../api';

export const getQuestions = () => async dispatch => {
  const response = await api.getQuestions();

  dispatch({ type: actionTypes.GET_QUESTIONS_SUCCESS, payload: response });
};

export const getQuestionDetail = id => async dispatch => {
  const response = await api.getQuestionDetail(id);

  dispatch({
    type: actionTypes.GET_QUESTION_DETAIL_SUCCESS,
    payload: response,
  });
};

export const saveVoting =
  (id, voteIds) =>
  async (dispatch, getState, { history }) => {
    if (voteIds && voteIds.length === 0) {
      return;
    }
    console.log(`voteIds ${voteIds}`);
    const response = await api.saveVoting(id, voteIds);
    dispatch(saveVotingSuccess(id, response));
    dispatch(setSnackMessage('Your voting saved successfully!'));
    history.push('/questions');
  };

export const saveVotingSuccess = (id, payload) => ({
  type: actionTypes.SAVE_VOTING_SUCCESS,
  id,
  payload,
});

export const createQuestion =
  question =>
  async (dispatch, getState, { history }) => {
    const response = await api.createQuestion(question);
    dispatch(createQuestionSuccess(response));
    dispatch(setSnackMessage('Question created successfully!'));
    history.push('/questions');
  };

export const createQuestionSuccess = question => ({
  type: actionTypes.CREATE_QUESTION_SUCCESS,
  payload: question,
});

export const clearQuestionDetail = () => ({
  type: actionTypes.CLEAR_QUESTION_DETAIL,
});

//UI related actions
export const toggleSnackbar = () => ({
  type: actionTypes.TOGGLE_SNACKBAR,
});

export const setSnackMessage = payload => ({
  type: actionTypes.SET_SNACK_MESSAGE,
  payload,
});
