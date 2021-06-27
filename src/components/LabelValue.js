import React from 'react';
import PropTypes from 'prop-types';
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

const LabelValue = ({ label, value }) => {
  return (
    <StyledLabelValue>
      {label && <label className="label">{label}</label>}
      <label>{value}</label>
    </StyledLabelValue>
  );
};

LabelValue.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
};

LabelValue.defaultProps = {
  label: undefined,
};

export default LabelValue;
