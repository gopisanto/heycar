import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';

import {
  Container,
  QuestionsContainer,
  CreateContainer,
} from './Questions.styled';
import Question from '../question/Question';
import RefreshOnError from '../../components/RefreshOnError';
import * as selectors from '../../redux/selectors';

const NoQuestionsContainer = styled.div`
  text-align: center;
  margin-top: 25px;
  width: 100%;
`;
const NoQuestions = () => (
  <NoQuestionsContainer>
    No Questions available to display!
  </NoQuestionsContainer>
);

const Questions = ({
  questions,
  getQuestionsFail,
  callbackWhenError,
  initialized,
}) => {
  const history = useHistory();

  if (getQuestionsFail) {
    return <RefreshOnError callback={callbackWhenError} />;
  }

  return (
    <Container>
      <h2>List of Questions</h2>
      <div className="create">
        <Tooltip title="Create Question">
          <CreateContainer>
            <label>Create New Question</label>
            <AddCircleIcon
              onClick={() => history.push('/questions/create')}
              className="createIcon"
              data-cy="create_icon"
            />
          </CreateContainer>
        </Tooltip>
      </div>
      <QuestionsContainer data-cy="questions-container">
        {initialized && questions.length === 0 && <NoQuestions />}
        {questions &&
          questions.map(question => (
            <Question key={question.url} question={question} />
          ))}
      </QuestionsContainer>
    </Container>
  );
};

Questions.propTypes = {
  questions: PropTypes.array,
  getQuestionsFail: PropTypes.bool,
  callbackWhenError: PropTypes.func,
  initialized: PropTypes.bool,
};

Questions.defaultProps = {
  questions: [],
  getQuestionsFail: false,
  callbackWhenError: f => f,
  initialized: false,
};

const mapStateToProps = state => ({
  questions: selectors.getQuestions(state),
  getQuestionsFail: selectors.getGetQuestionsFail(state),
  initialized: selectors.getInitialized(state),
});

export default connect(mapStateToProps, undefined)(Questions);
