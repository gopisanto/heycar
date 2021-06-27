import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { QuestionContainer } from './Question.style';
import LabelValue from '../../components/LabelValue';
import { formatDate } from '../../utils';

const Question = ({ question: questionObj }) => {
  const { question, published_at: publishedAt, choices, url } = questionObj;
  const history = useHistory();

  if (!questionObj) {
    return null;
  }

  const handleClick = () => {
    history.push(url);
  };

  return (
    <QuestionContainer onClick={handleClick}>
      <div>
        <h4>{question}</h4>
        <LabelValue value={formatDate(publishedAt)} />
        <LabelValue label="No. of Choices" value={choices.length.toString()} />
      </div>
    </QuestionContainer>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
};

export default Question;
