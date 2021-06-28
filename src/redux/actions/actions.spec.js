import * as api from '../../api';
import * as actions from '../actions/actions';
import * as actionTypes from '../actions/actionTypes';
import questions from '../mock/questions.json';
import questionDetail from '../mock/questionDetail.json';
import savedVoteResponse from '../mock/savedVoteResponse.json';

jest.mock('../../api', () => ({
  getQuestions: jest.fn(),
  getQuestionDetail: jest.fn(),
  saveVoting: jest.fn(),
  createQuestion: jest.fn(),
}));

describe('Actions', () => {
  let dispatch;
  afterAll(() => jest.resetAllMocks());
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('Async action "getQuestions"', async () => {
    api.getQuestions.mockResolvedValue(questions);

    await actions.getQuestions()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(
      actions.resetErrorFlag('getQuestionsFail')
    );
    expect(dispatch).toHaveBeenCalledWith(
      actions.getQuestionsSuccess(questions)
    );

    const error = new Error('getQuestions failed');
    api.getQuestions.mockRejectedValue(error);

    await actions.getQuestions()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(
      actions.resetErrorFlag('getQuestionsFail')
    );
    expect(dispatch).toHaveBeenCalledWith(actions.getQuestionsFail(error));
  });

  it('Action "getQuestionsSuccess"', () => {
    const payload = questions;
    const received = actions.getQuestionsSuccess(payload);
    const expected = {
      type: actionTypes.GET_QUESTIONS_SUCCESS,
      payload,
    };

    expect(received).toEqual(expected);
  });

  it('Action "getQuestionsFail"', () => {
    const payload = new Error('Something went wrong');
    const received = actions.getQuestionsFail(payload);
    const expected = {
      type: actionTypes.GET_QUESTIONS_FAIL,
      payload,
    };

    expect(received).toEqual(expected);
  });

  it('Async action "getQuestionDetail"', async () => {
    api.getQuestionDetail.mockResolvedValue(questionDetail);

    await actions.getQuestionDetail(11)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(
      actions.resetErrorFlag('getQuestionDetailFail')
    );
    expect(dispatch).toHaveBeenCalledWith(
      actions.getQuestionDetailSuccess(questionDetail)
    );

    const error = new Error('getQuestionDetail failed');
    api.getQuestionDetail.mockRejectedValue(error);

    await actions.getQuestionDetail(11)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(
      actions.resetErrorFlag('getQuestionDetailFail')
    );
    expect(dispatch).toHaveBeenCalledWith(actions.getQuestionDetailFail(error));
  });

  it('Action "getQuestionDetailSuccess"', () => {
    const payload = questionDetail;
    const received = actions.getQuestionDetailSuccess(payload);
    const expected = {
      type: actionTypes.GET_QUESTION_DETAIL_SUCCESS,
      payload,
    };

    expect(received).toEqual(expected);
  });

  it('Action "getQuestionDetailFail"', () => {
    const received = actions.getQuestionDetailFail();
    const expected = {
      type: actionTypes.GET_QUESTION_DETAIL_FAIL,
    };

    expect(received).toEqual(expected);
  });

  it('Async action "saveVoting"', async () => {
    const voteIds = [77];
    const questionId = 11;

    api.saveVoting.mockResolvedValue(savedVoteResponse);
    await actions.saveVoting(questionId, voteIds)(dispatch, undefined, {
      history: jest.fn(),
    });
    expect(dispatch).toHaveBeenCalledWith(
      actions.saveVotingSuccess(`/questions/${questionId}`, savedVoteResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(
      actions.setSnackMessage('Your voting saved successfully!')
    );

    const error = new Error('Something went wrong');
    api.saveVoting.mockRejectedValue(error);
    await actions.saveVoting(questionId, voteIds)(dispatch, undefined, {
      history: jest.fn(),
    });
    expect(dispatch).toHaveBeenCalledWith(actions.saveVotingFail(error));
  });

  it('Action "saveVotingSuccess"', () => {
    const payload = savedVoteResponse;
    const id = 11;
    const received = actions.saveVotingSuccess(`/questions/${id}`, payload);
    const expected = {
      type: actionTypes.SAVE_VOTING_SUCCESS,
      id: `/questions/${id}`,
      payload,
    };

    expect(received).toEqual(expected);
  });

  it('Action "saveVotingFail"', () => {
    const error = new Error('Something went wrong');
    const received = actions.saveVotingFail(error);
    const expected = {
      type: actionTypes.SAVE_VOTING_FAIL,
      payload: error,
    };

    expect(received).toEqual(expected);
  });

  it('Async action "createQuestion"', async () => {
    api.createQuestion.mockResolvedValue(questionDetail);
    await actions.createQuestion(questionDetail.data)(dispatch, undefined, {
      history: jest.fn(),
    });
    expect(dispatch).toHaveBeenCalledWith(
      actions.resetErrorFlag('createQuestionFail')
    );
    expect(dispatch).toHaveBeenCalledWith(
      actions.createQuestionSuccess(questionDetail)
    );
    expect(dispatch).toHaveBeenCalledWith(
      actions.setSnackMessage('Question created successfully!')
    );

    const error = new Error('Something went wrong');
    api.createQuestion.mockRejectedValue(error);
    await actions.createQuestion(questionDetail.data)(dispatch, undefined, {
      history: jest.fn(),
    });
    expect(dispatch).toHaveBeenCalledWith(actions.createQuestionFail(error));
  });

  it('Action "createQuestionSuccess"', () => {
    const payload = questionDetail;
    const received = actions.createQuestionSuccess(payload);
    const expected = {
      type: actionTypes.CREATE_QUESTION_SUCCESS,
      payload,
    };

    expect(received).toEqual(expected);
  });

  it('Action "createQuestionSuccess"', () => {
    const error = new Error('Something went wrong');
    const received = actions.createQuestionFail(error);
    const expected = {
      type: actionTypes.CREATE_QUESTION_FAIL,
      payload: error,
    };

    expect(received).toEqual(expected);
  });

  it('Action "clearQuestionDetail"', () => {
    const received = actions.clearQuestionDetail();
    const expected = {
      type: actionTypes.CLEAR_QUESTION_DETAIL,
    };

    expect(received).toEqual(expected);
  });

  it('Action "setSnackMessage"', () => {
    const msg = 'Some snacky message';
    const received = actions.setSnackMessage(msg);
    const expected = {
      type: actionTypes.SET_SNACK_MESSAGE,
      payload: msg,
    };

    expect(received).toEqual(expected);
  });

  it('Action "resetErrorFlag"', () => {
    const field = 'someField';
    const received = actions.resetErrorFlag(field);
    const expected = {
      type: actionTypes.RESET_ERROR_FLAG,
      payload: field,
    };

    expect(received).toEqual(expected);
  });
});
