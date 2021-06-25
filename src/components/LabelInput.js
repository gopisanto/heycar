import React from 'react';
import styled from 'styled-components';

const StyledLabelInput = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;

  & :first-child {
    margin-right: 10px;
  }

  & label {
    width: 30%;
  }

  & input {
    width: 65%;
  }
`;

export default ({ onChange, label, value }) => {
  return (
    <StyledLabelInput>
      <label>{label}</label>
      <input type="text" onChange={onChange} value={value} />
    </StyledLabelInput>
  );
};
