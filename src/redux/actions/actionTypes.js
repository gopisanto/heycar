const ns = 'action.question';

export const GET_QUESTIONS = `${ns}.GET_QUESTIONS`;
export const GET_QUESTIONS_SUCCESS = `${ns}.GET_QUESTIONS_SUCCESS`;
export const GET_QUESTIONS_FAIL = `${ns}.GET_QUESTIONS_FAIL`;

export const GET_QUESTION_DETAIL = `${ns}.GET_QUESTION_DETAIL`;
export const GET_QUESTION_DETAIL_SUCCESS = `${ns}.GET_QUESTION_DETAIL_SUCCESS`;
export const GET_QUESTION_DETAIL_FAIL = `${ns}.GET_QUESTION_DETAIL_FAIL`;

export const SAVE_VOTING = `${ns}.SAVE_VOTING`;
export const SAVE_VOTING_SUCCESS = `${ns}.SAVE_VOTING_SUCCESS`;
export const SAVE_VOTING_FAIL = `${ns}.SAVE_VOTING_FAIL`;

export const CREATE_QUESTION = `${ns}.CREATE_QUESTION`;
export const CREATE_QUESTION_SUCCESS = `${ns}.CREATE_QUESTION_SUCCESS`;
export const CREATE_QUESTION_FAIL = `${ns}.CREATE_QUESTION_FAIL`;

export const CLEAR_QUESTION_DETAIL = `${ns}.CLEAR_QUESTION_DETAIL`;

//UI related action types
export const SET_SNACK_MESSAGE = `${ns}.SET_SNACK_MESSAGE`;
export const RESET_ERROR_FLAG = `${ns}.RESET_ERROR_FLAG`;
