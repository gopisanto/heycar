import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty, omit } from 'lodash';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { CreateQuestionContainer, Close } from './CreateQuestion.style';
import LabelInput from '../../components/LabelInput';
import Box from '../../components/Box';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import * as actions from '../../redux/actions/actions';
import * as selectors from '../../redux/selectors';

const createEmptyChoice = () => ({
  [uuidv4()]: { choice: '' },
});

const CreateQuestion = ({ createQuestion, createQuestionFail }) => {
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState(createEmptyChoice());
  const lastRef = useRef(null);
  const noOfChoices = Object.keys(choices).length;

  useEffect(() => {
    if (lastRef.current) {
      lastRef.current.focus();
    }
  }, [noOfChoices]);

  const handleAddChoice = () => {
    setChoices({ ...choices, ...createEmptyChoice() });
  };

  const handleRemoveChoice = id => setChoices(omit(choices, [id]));

  const handleChoiceChange = (value, id) =>
    setChoices({ ...choices, [id]: { choice: value } });

  const handleCreateQuestion = () => {
    const questionObj = {
      question,
      choices: Object.values(choices).map(choice => choice.choice),
    };
    createQuestion(questionObj);
  };

  const isCreateEnabled =
    !isEmpty(question) &&
    Object.values(choices).filter(choice => !isEmpty(choice.choice)).length >=
      2;

  return (
    <CreateQuestionContainer>
      <Close to="/questions">
        <CloseIcon />
      </Close>
      <h2>Create your Question</h2>
      {createQuestionFail && (
        <ErrorMessage>Create Question Failed, please try again!</ErrorMessage>
      )}
      <LabelInput
        label="Your Question"
        value={question}
        onChange={({ target: { value } }) => setQuestion(value)}
        dataCy="question"
      />
      <label>Choices</label>
      {Object.keys(choices).map((id, i) => (
        <Box key={id} data-cy="choices">
          <input
            value={choices[id].choice}
            onChange={({ target: { value } }) => handleChoiceChange(value, id)}
            ref={Object.keys(choices).length - 1 === i ? lastRef : undefined}
          />
          {Object.keys(choices).length !== 1 && (
            <ClearIcon onClick={() => handleRemoveChoice(id)} />
          )}
          {Object.keys(choices).length - 1 === i && (
            <AddIcon onClick={handleAddChoice} data-cy="add_new_choice" />
          )}
        </Box>
      ))}
      <Button
        disabled={!isCreateEnabled}
        onClick={handleCreateQuestion}
        data-cy="create_question"
      >
        Create Question
      </Button>
    </CreateQuestionContainer>
  );
};

CreateQuestion.propTypes = {
  createQuestion: PropTypes.func.isRequired,
  createQuestionFail: PropTypes.bool,
};

CreateQuestion.defaultProps = {
  createQuestionFail: false,
};

const mapStateToProps = state => ({
  createQuestionFail: selectors.getCreateQuestionFail(state),
});
const mapDispatchToProps = dispatch => ({
  createQuestion: question => dispatch(actions.createQuestion(question)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);
