import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ThirdPartyLoader from 'react-loader-spinner';
import Modal from './Modal';

const CenterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Label = styled.label`
  color: 'cadetblue';
  font-weight: 'bold';
`;

const Loader = ({ msg, show }) => {
  return (
    <Modal show={show}>
      <CenterContent>
        <ThirdPartyLoader
          type="Puff"
          color="cadetBlue"
          height={100}
          width={100}
        />
        <Label>{`${msg || 'Loading'}`}</Label>
      </CenterContent>
    </Modal>
  );
};

Loader.propTypes = {
  msg: PropTypes.string,
  show: PropTypes.bool,
};

Loader.defaultProps = {
  msg: 'Loading...',
  show: false,
};

export default Loader;
