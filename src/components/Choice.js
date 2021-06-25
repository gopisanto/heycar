import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const StyledChoice = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const StyledVote = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 20%;
`;

export default ({ choice: choiceObj = {}, onVote, id, isVoted }) => {
  const { choice, votes } = choiceObj;
  const [noOfVotes, setNoOfVotes] = useState(isVoted ? votes + 1 : votes);

  useEffect(() => {
    setNoOfVotes(isVoted ? votes + 1 : votes);
  }, [isVoted]);

  return (
    <StyledChoice>
      <label>{choice}</label>
      <StyledVote>
        <label>{noOfVotes}</label>
        <ThumbUpIcon fontSize="small" style={{ color: isVoted && 'blue' }} onClick={() => onVote(id, !isVoted)} />
      </StyledVote>
    </StyledChoice>
  );
};
