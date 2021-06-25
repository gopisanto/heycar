import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty, omit, some } from 'lodash';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { CreateQuestionContainer, Close } from './CreateQuestion.style';
import LabelInput from '../../components/LabelInput';
import Box from '../../components/Box';
import Button from '../../components/Button';
import * as actions from '../../redux/actions/actions';

const createEmptyChoice = () => ({
  [uuidv4()]: { choice: '' },
});

const CreateQuestion = ({ createQuestion }) => {
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState(createEmptyChoice());
  const lastRef = useRef(null);

  useEffect(() => {
    if (lastRef.current) {
      lastRef.current.focus();
    }
  }, [Object.keys(choices).length]);

  const handleAddChoice = () => {
    console.log({ ...choices, ...createEmptyChoice() });
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
    some(Object.values(choices), choice => !isEmpty(choice.choice));

  return (
    <CreateQuestionContainer>
      <Close to="/questions">
        <CloseIcon />
      </Close>
      <h2>Create your Question</h2>
      <LabelInput
        label="Your Question"
        value={question}
        onChange={({ target: { value } }) => setQuestion(value)}
      />
      <label>Choices</label>
      {Object.keys(choices).map((id, i) => (
        <Box>
          <input
            value={choices[id].choice}
            onChange={({ target: { value } }) => handleChoiceChange(value, id)}
            ref={Object.keys(choices).length - 1 === i ? lastRef : undefined}
          />
          {Object.keys(choices).length !== 1 && (
            <ClearIcon onClick={() => handleRemoveChoice(id)} />
          )}
          {Object.keys(choices).length - 1 === i && (
            <AddIcon onClick={handleAddChoice} />
          )}
        </Box>
      ))}
      <Button disabled={!isCreateEnabled} onClick={handleCreateQuestion}>
        Create Question
      </Button>
    </CreateQuestionContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  createQuestion: question => dispatch(actions.createQuestion(question)),
});

export default connect(undefined, mapDispatchToProps)(CreateQuestion);
