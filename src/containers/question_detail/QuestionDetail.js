import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
import { extractIdsFromSlug, calcTotalVotes, calcPerc } from '../../utils';
import Button from '../../components/Button';
import RefreshOnError from '../../components/RefreshOnError';
import { Table, Row } from '../../components/Table';

const QuestionDetail = ({
  detail = {},
  getQuestionDetail,
  saveVoting,
  clearQuestionDetail,
  questionDetailFail,
}) => {
  const { id } = useParams();
  const history = useHistory();
  const [voteIds, setVoteIds] = useState([]);
  const [initTotalVotes, setInitTotalVotes] = useState(calcTotalVotes(detail));
  const { question, choices } = detail || {};

  useEffect(() => {
    getQuestionDetail(id);

    return () => clearQuestionDetail();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setInitTotalVotes(calcTotalVotes(detail));
  }, [detail]);

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
  };

  if (questionDetailFail) {
    return <RefreshOnError />;
  }

  if (!detail) {
    return null;
  }

  return (
    <>
      <QuestionDetailContainer>
        <Header>
          <GoBack onClick={handleClose} />
          <h2>{question}</h2>
        </Header>
        <Table>
          {choices &&
            choices.map(choice => {
              const choiceId = extractIdsFromSlug(choice.url);
              const isVoted = voteIds.includes(choiceId);

              return (
                <Row key={choiceId}>
                  <Choice
                    id={choiceId}
                    isVoted={isVoted}
                    onVote={hanldeOnVote}
                    votePerc={Number(calcPerc(choice, voteIds, initTotalVotes))}
                    choice={choice}
                  />
                </Row>
              );
            })}
        </Table>
        <Button disabled={voteIds.length === 0} onClick={saveChanges}>
          Save Changes
        </Button>
      </QuestionDetailContainer>
    </>
  );
};

QuestionDetail.propTypes = {
  detail: PropTypes.object,
  getQuestionDetail: PropTypes.func.isRequired,
  saveVoting: PropTypes.func.isRequired,
  clearQuestionDetail: PropTypes.func.isRequired,
  questionDetailFail: PropTypes.bool,
};

QuestionDetail.defaultProps = {
  detail: {},
  questionDetailFail: false,
};

const mapStateToProps = state => ({
  detail: selectors.getQuestionDetail(state),
  questionDetailFail: selectors.getGetQuestionDetailFail(state),
});

const mapDispatchToProps = dispatch => ({
  getQuestionDetail: id => dispatch(actions.getQuestionDetail(id)),
  saveVoting: (id, voteIds) => dispatch(actions.saveVoting(id, voteIds)),
  clearQuestionDetail: () => dispatch(actions.clearQuestionDetail()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);
