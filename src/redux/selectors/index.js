export const getRoot = state => state.questions.toJS();
export const getQuestions = state => getRoot(state).questions;
export const getQuestionDetail = state => getRoot(state).questionDetail;
