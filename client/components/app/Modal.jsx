import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import banner16by9 from '../frc/banner/banner16by9/index.jsx';

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
  background-color: lightgrey;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 50px;

  &:hover {
    cursor: pointer;
  }
`;


const Modal = ({ show, onClose, fileJson }) => {
  // console.log('in showModal show is ', show);
  // console.log('data ', data);
  // console.log('fileJson ', fileJson);
  console.log('rendering modal ssv ', fileJson);
  if(fileJson) {
    console.log('fileJson ', JSON.parse(fileJson.toString()));
  }
  // console.log('fileJson ', JSON.parse(fileJson));
  return (
  	<ModalContainer show={show}>
      <ModalClose onClick={onClose}>X</ModalClose>
    </ModalContainer>
  );

}


export default Modal;


