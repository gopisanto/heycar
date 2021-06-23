import axios from 'axios';

const ALL_QUESTIONS_URL = 'https://polls.apiblueprint.org/questions';

export const getQuestions = async () => {
  const response = await axios.get(ALL_QUESTIONS_URL);

  return response.data;
};

export const getQuestionDetail = async id => {
  const response = await axios.get(`${ALL_QUESTIONS_URL}/${id}`);

  return response.data;
};
