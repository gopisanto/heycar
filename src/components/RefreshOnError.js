import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';

import { refreshPage } from '../utils';

const Container = styled.main`
  min-width: 100%;
  max-width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 15px;
  display: flex;
  flex-flow: column nowrap;
  background: black;
  font-size: 0.8em;
  margin: 0 auto;
  justify-content: center;
  align-items: center;

  & label {
    margin-bottom: 15px;
  }

  & h2 {
    margin-top: 0px;
  }
`;

const RefreshOnError = ({ title, message, callback }) => {
  const history = useHistory();

  const onClickHandler = () => {
    refreshPage();
    callback();
  };

  const onBack = () => {
    history.push('/questions');
  };

  return (
    <Container>
      <h2>{title}</h2>
      <label>{message}</label>
      <Button onClick={onClickHandler}>Click here to Refresh</Button>
      <Button marginTop onClick={onBack}>
        Click here to go back to questions
      </Button>
    </Container>
  );
};

RefreshOnError.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  callback: PropTypes.func,
};

RefreshOnError.defaultProps = {
  title: 'Oops, Something went wrong!',
  message: 'Sorry for the inconvenience, please click below to refresh',
  callback: f => f,
};

export default RefreshOnError;
