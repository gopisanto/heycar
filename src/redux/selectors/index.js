export const getRoot = state => state.questions.toJS();
export const getQuestions = state => Object.values(getRoot(state).questions);
export const getQuestionDetail = state => getRoot(state).questionDetail;
export const getInitialized = state => getRoot(state).initialized;

//UI selectors
export const getSnackMessage = state => getRoot(state).snackMessage;
export const getGetQuestionsFail = state => getRoot(state).getQuestionsFail;
export const getGetQuestionDetailFail = state =>
  getRoot(state).getQuestionDetailFail;
export const getCreateQuestionFail = state => getRoot(state).createQuestionFail;
export const getSaveVotingFail = state => getRoot(state).saveVotingFail;
export const getShowLoader = state => getRoot(state).showLoader;
