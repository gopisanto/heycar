import React from 'react';
import styled from 'styled-components';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

const StyledLabelVote = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export default ({ choice: choiceObj = {} }) => {
  const { choice, votes } = choiceObj;
  return (
    <StyledLabelVote>
      <label>{choice}</label>
      <label>{votes}</label>
      <AccessAlarmIcon fontSize="small" style={{ color: yellow }} />
    </StyledLabelVote>
  );
};
