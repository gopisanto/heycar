import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Tooltip from '@material-ui/core/Tooltip';

import {
  Container,
  QuestionsContainer,
  CreateContainer,
} from './Questions.styled';
import Question from '../question/Question';
import Button from '../../components/Button';
import * as selectors from '../../redux/selectors';

const Questions = ({ questions }) => {
  const history = useHistory();

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
            />
          </CreateContainer>
        </Tooltip>
      </div>
      <QuestionsContainer>
        {questions &&
          questions.map(question => (
            <Question key={question.question} question={question} />
          ))}
      </QuestionsContainer>
    </Container>
  );
};

const mapStateToProps = state => ({
  questions: selectors.getQuestions(state),
});

export default connect(mapStateToProps, undefined)(Questions);
