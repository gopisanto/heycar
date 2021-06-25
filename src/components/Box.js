import React from 'react';
import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;

  & input {
    width: 75%;
    margin-right: 20px;
  }
`;
