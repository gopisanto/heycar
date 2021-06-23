import React from 'react';
import { useHistory } from 'react-router-dom';

import StyledQuestion from './Question.style';
import LabelValue from '../../components/LabelValue';
import { formatDate } from '../../utils';

const Question = ({ question: questionObj = {} }) => {
  const { question, published_at: publishedAt, choices, url } = questionObj;
  const history = useHistory();

  if (!questionObj) {
    return null;
  }

  const handleClick = () => {
    history.push(url);
  };

  return (
    <StyledQuestion onClick={handleClick}>
      <h3>{question}</h3>
      <LabelValue value={formatDate(publishedAt)} />
      <LabelValue label="No. of Choices" value={choices.length} />
    </StyledQuestion>
  );
};

export default Question;
