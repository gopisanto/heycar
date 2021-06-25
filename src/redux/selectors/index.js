export const getRoot = state => state.questions.toJS();
export const getQuestions = state => Object.values(getRoot(state).questions);
export const getQuestionDetail = state => getRoot(state).questionDetail;

//UI selectors
export const getShowSnackbar = state => getRoot(state).showSnackbar;
export const getSnackMessage = state => getRoot(state).snackMessage;
