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

export const saveVoting = async (id, voteIds) => {
  const urlsToSaveVotes = voteIds.map(
    vote => `${ALL_QUESTIONS_URL}/${id}/choices/${vote}`
  );
  const response = await Promise.allSettled(
    urlsToSaveVotes.map(url => axios.post(url))
  );

  return response.map(resp => resp.value.data);
};

export const createQuestion = async question => {
  const response = await axios.post(ALL_QUESTIONS_URL, question);

  return response.data;
};
