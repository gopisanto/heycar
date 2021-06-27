import * as api from '../../api';
import {
  getQuestions as getQuestionsAction,
  resetErrorFlag,
} from '../actions/actions';
import questions from '../mock/questions.json';

jest.mock('../../api', () => ({
  getQuestions: jest.fn(),
}));

describe('Actions', () => {
  it('getQuestions', async () => {
    api.getQuestions.mockResolvedValues(questions);
    const dispatch = jest.fn();
    await getQuestionsAction()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(resetErrorFlag('getQuestionsFail'));
    expect(1).toEqual(1);
  });
});
