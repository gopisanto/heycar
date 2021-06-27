import React, { useEffect, useState } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import PropTypes from 'prop-types';

import { Col } from './Table';

const Choice = ({ choice: choiceObj = {}, onVote, id, isVoted, votePerc }) => {
  const { choice, votes } = choiceObj;
  const [noOfVotes, setNoOfVotes] = useState(isVoted ? votes + 1 : votes);

  useEffect(() => {
    setNoOfVotes(isVoted ? votes + 1 : votes);
  }, [isVoted, votes]);

  return (
    <>
      <Col flex={5} align="left">
        {choice}
      </Col>
      <Col flex={1}>{noOfVotes}</Col>
      <Col flex={1}>{votePerc}%</Col>
      <Col flex={1}>
        <ThumbUpIcon
          fontSize="small"
          style={{ color: isVoted && 'blue' }}
          onClick={() => onVote(id, !isVoted)}
        />
      </Col>
    </>
  );
};

Choice.propTypes = {
  choice: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isVoted: PropTypes.bool.isRequired,
  votePerc: PropTypes.number.isRequired,
};

export default Choice;
