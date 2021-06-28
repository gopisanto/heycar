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

const LabelInput = ({ label, dataCy, value, onChange, someP }) => {
  return (
    <StyledLabelInput>
      <label>{label}</label>
      <input type="text" data-cy={dataCy} value={value} onChange={onChange} />
    </StyledLabelInput>
  );
};

LabelInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  dataCy: PropTypes.string,
};

LabelInput.defaultProps = {
  dataCy: undefined,
};

export default LabelInput;
