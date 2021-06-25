import { keyBy } from 'lodash';

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

  return { ...question, choices: Object.values({ ...existingChoices, ...newChoices }) };
};
