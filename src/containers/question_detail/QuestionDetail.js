import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { without } from 'lodash';

import QuestionDetailContainer, {
  Header,
  GoBack,
} from './QuestionDetail.style';
import Choice from '../../components/Choice';
import * as actions from '../../redux/actions/actions';
import * as selectors from '../../redux/selectors';
import { extractIdsFromSlug } from '../../utils';
import Button from '../../components/Button';

const QuestionDetail = ({
  detail = {},
  getQuestionDetail,
  saveVoting,
  clearQuestionDetail,
}) => {
  const { id } = useParams();
  const history = useHistory();
  const [voteIds, setVoteIds] = useState([]);
  const { question, choices } = detail || {};

  useEffect(() => {
    getQuestionDetail(id);
  }, []);

  const hanldeOnVote = (choiceId, flag) => {
    if (flag) {
      setVoteIds(voteIds.concat(choiceId));
    } else {
      setVoteIds(without(voteIds, choiceId));
    }
  };

  const saveChanges = () => {
    saveVoting(id, voteIds);
  };

  const handleClose = () => {
    history.push('/questions');

    clearQuestionDetail();
  };

  if (!detail) {
    return null;
  }

  return (
    <QuestionDetailContainer>
      <Header>
        <GoBack onClick={handleClose} />
        <h2>{question}</h2>
      </Header>
      {choices &&
        choices.map(choice => {
          const choiceId = extractIdsFromSlug(choice.url);
          const isVoted = voteIds.includes(choiceId);

          return (
            <Choice
              id={choiceId}
              isVoted={isVoted}
              onVote={hanldeOnVote}
              choice={choice}
            />
          );
        })}
      <Button disabled={voteIds.length === 0} onClick={saveChanges}>
        Save Changes
      </Button>
    </QuestionDetailContainer>
  );
};

const mapStateToProps = state => ({
  detail: selectors.getQuestionDetail(state),
});

const mapDispatchToProps = dispatch => ({
  getQuestionDetail: id => dispatch(actions.getQuestionDetail(id)),
  saveVoting: (id, voteIds) => dispatch(actions.saveVoting(id, voteIds)),
  clearQuestionDetail: () => dispatch(actions.clearQuestionDetail()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);
