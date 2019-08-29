import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const ModalContainer = styled.div`
 ${props => props.show && css`
   display: flex;
  `}

  ${props => !props.show && css`
     display: none;
  `}
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  background-color: red;
  justify-content: center;
  align-items: center;
`;



const ModalClose = styled.button`
  
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10000;
  background-color: red;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 50px;

  &:hover {
    cursor: pointer;
  }
`;


const Modal = ({ show, onClose }) => {



  console.log('in showModal show is ', show);

  return (
  	<ModalContainer show={show}>
      <ModalClose onClick={onClose}>X</ModalClose>
    </ModalContainer>
  );

}


export default Modal;


