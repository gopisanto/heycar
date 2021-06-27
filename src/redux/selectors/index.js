export const getRoot = state => state.questions.toJS();
export const getQuestions = state => Object.values(getRoot(state).questions);
export const getQuestionDetail = state => getRoot(state).questionDetail;

//UI selectors
export const getSnackMessage = state => getRoot(state).snackMessage;
export const getGetQuestionsFail = state => getRoot(state).getQuestionsFail;
export const getGetQuestionDetailFail = state =>
  getRoot(state).getQuestionDetailFail;
export const getCreateQuestionFail = state => getRoot(state).createQuestionFail;
export const getSaveVotingFail = state => getRoot(state).saveVotingFail;
