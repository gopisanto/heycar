import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.6);
  display: ${props => (props.show ? 'display' : 'none')};
  & .modal-content {
    position: fixed;
    background: #1d1d1d;
    opacity: 4;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Modal = ({ show, children }) => {
  return (
    <ModalContainer show={show}>
      <section className="modal-content">{children}</section>
    </ModalContainer>
  );
};

export default Modal;
