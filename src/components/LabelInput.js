import React from 'react';
import PropTypes from 'prop-types';
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

const LabelInput = ({ onChange, label, value }) => {
  return (
    <StyledLabelInput>
      <label>{label}</label>
      <input type="text" onChange={onChange} value={value} />
    </StyledLabelInput>
  );
};

LabelInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default LabelInput;
