import React from 'react';
import styled from 'styled-components';

export default styled.button`
  background-color: ${props => (props.disabled ? 'gray' : 'cadetblue')};
  border-radius: 2px;
  padding: 5px 10px;
  cursor: pointer;
`;
