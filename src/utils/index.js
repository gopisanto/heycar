import { keyBy } from 'lodash';

import history from '../redux/history';

export const formatDate = dateString => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const extractIdsFromSlug = slug => {
  const getId = item => {
    const parts = item.split('/');

    return parts[parts.length - 1];
  };

  if (typeof slug === 'string') {
    return getId(slug);
  } else if (Array.isArray(slug)) {
    const slugIds = slug.map(item => getId(item));

    return slugIds;
  }

  return null;
};

export const mapifyArray = (arr, withProp) => {
  if (arr && arr.length === 0) {
    return {};
  }

  return keyBy(arr, withProp);
};

export const updateChoices = (question, choices) => {
  if (choices && choices.length === 0) {
    return question;
  }

  const existingChoices = keyBy(question.choices || [], choice => choice.url);
  const newChoices = keyBy(choices, choice => choice.url);

  return {
    ...question,
    choices: Object.values({ ...existingChoices, ...newChoices }),
  };
};

export const refreshPage = () => {
  history.push('/null');

  setTimeout(() => {
    history.goBack();
  }, 100);
};

export const calcTotalVotes = detail => {
  if (!detail) {
    return 0;
  }

  const choices = detail.choices || [];

  return choices.reduce((result, choice) => result + choice.votes, 0);
};

export const calcPerc = (choice, voteIds, total) => {
  let result = 0;

  if (voteIds.includes(extractIdsFromSlug(choice.url))) {
    ++result;
  }

  result += choice.votes;

  return result === 0
    ? 0
    : parseFloat((result * 100) / (total + voteIds.length)).toFixed(1);
};
