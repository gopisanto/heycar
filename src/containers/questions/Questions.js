import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import StyledQuestions from './Questions.styled';
import Question from '../question/Question';
import { getQuestions as getQuestionsAction } from '../../redux/actions/actions';
import * as selectors from '../../redux/selectors';

const Questions = ({ getQuestions, questions }) => {
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <StyledQuestions>
      {questions && questions.map(question => <Question key={question.question} question={question} />)}
    </StyledQuestions>
  );
};

const mapStateToProps = state => ({
  questions: selectors.getQuestions(state),
});
const mapDispatchToProps = dispatch => ({
  getQuestions: () => dispatch(getQuestionsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
