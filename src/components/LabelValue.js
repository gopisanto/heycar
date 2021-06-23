import React from 'react';
import styled from 'styled-components';

const StyledLabelValue = styled.div`
  display: flex;

  & .label {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.6em;

    &:after {
      content: ':';
    }
  }

  & .value {
    color: gray;
  }
`;

export default ({ label, value }) => {
  return (
    <StyledLabelValue>
      {label && <label className="label">{label}</label>}
      <label className="value">{value}</label>
    </StyledLabelValue>
  );
};
