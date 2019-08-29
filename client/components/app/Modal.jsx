import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import DefaultBanner from '../frc/banner/banner16by9/index.jsx';





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
  background-color: white;
  justify-content: center;
  align-items: center;
`;



const ModalClose = styled.button`  
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10000;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 50px;

  &:hover {
    cursor: pointer;
  }
`;



const renderJSONComponents = (dataObj) => {
  const compsArr = [];
  console.log('dataObj ', dataObj);
    switch (dataObj[0].componentId) {
      case 'banner16by9':
        compsArr.push(<DefaultBanner data={dataObj[0]} key="1" contained />);
        break;
      default:
    }
  return compsArr;
}


const Modal = ({ show = false, onClose, fileJson }) => {
  if(!fileJson) {
    return (
      <ModalContainer show={show}>
      <ModalClose onClick={onClose}>X</ModalClose>
    </ModalContainer>
    );
  }; 
  // console.log('in showModal show is ', show);
  // console.log('data ', data);
  // console.log('fileJson ', fileJson);
  console.log('rendering modal ssv ', fileJson);
  if(fileJson) {
    console.log('fileJson ', JSON.parse(fileJson.toString()));
  }

  let json = renderJSONComponents(JSON.parse(fileJson.toString()));
  // console.log('fileJson ', JSON.parse(fileJson));
// if(fileJson) {
//   let json = renderJSONComponents(JSON.parse(fileJson.toString()));
// }
  return (
  	<ModalContainer show={show}>
      <ModalClose onClick={onClose}>X</ModalClose>
      {json}
    </ModalContainer>
  );

}


export default Modal;


