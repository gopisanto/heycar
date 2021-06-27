import {
  getRoot,
  getQuestions,
  getQuestionDetail,
  getSnackMessage,
  getGetQuestionsFail,
  getGetQuestionDetailFail,
  getCreateQuestionFail,
  getSaveVotingFail,
} from '../selectors';
import { INITIAL_STATE } from '../reducers';

describe('Selectors', () => {
  const rootState = { questions: INITIAL_STATE };
  const expectedState = INITIAL_STATE.toJS();

  it('getRoot', () => {
    const expected = INITIAL_STATE.toJS();
    const received = getRoot(rootState);

    expect(received).toEqual(expected);
  });

  it('getQuestions', () => {
    const expected = expectedState.questions;
    const received = getQuestions(rootState);

    expect(received).toEqual(expected);
  });

  it('getQuestionDetail', () => {
    const expected = expectedState.questionDetail;
    const received = getQuestionDetail(rootState);

    expect(received).toEqual(expected);
  });

  it('getSnackMessage', () => {
    const expected = expectedState.snackMessage;
    const received = getSnackMessage(rootState);

    expect(received).toEqual(expected);
  });

  it('getGetQuestionsFail', () => {
    const expected = expectedState.getQuestionsFail;
    const received = getGetQuestionsFail(rootState);

    expect(received).toEqual(expected);
  });

  it('getGetQuestionDetailFail', () => {
    const expected = expectedState.getQuestionDetailFail;
    const received = getGetQuestionDetailFail(rootState);

    expect(received).toEqual(expected);
  });

  it('getCreateQuestionFail', () => {
    const expected = expectedState.createQuestionFail;
    const received = getCreateQuestionFail(rootState);

    expect(received).toEqual(expected);
  });
  it('getSaveVotingFail', () => {
    const expected = expectedState.saveVotingFail;
    const received = getSaveVotingFail(rootState);

    expect(received).toEqual(expected);
  });
});
