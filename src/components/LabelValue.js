import React from 'react';
import styled from 'styled-components';

const StyledLabelValue = styled.div`
  display: flex;

  & .label {
    margin-right: 8px;
    &:after {
      content: ':';
    }
  }
`;

export default ({ label, value }) => {
  return (
    <StyledLabelValue>
      {label && <label className="label">{label}</label>}
      <label>{value}</label>
    </StyledLabelValue>
  );
};
