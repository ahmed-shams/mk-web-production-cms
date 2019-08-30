import React, { useState, useRef, useEffect } from 'react';
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
  padding-top: 300px;
  top: 0;
  left: 0;
  z-index: 10000;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const ModalHeader= styled.div`
  display: flex;
   justify-content: center;
  align-items: center;
  font-size: 45px;
  font-weight: bold;
  background-color: lightblue;
  color: black;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  height: 200px;
`

const ModalClose = styled.div`  
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


const PreviewContent = styled.div`
  position: absolute;
  top: 200px;
`


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
  const ContentContainer = useRef(null);
  let previewHTML='';

    useEffect(() => {
    // Update the document title using the browser API
   
    if(ContentContainer && ContentContainer.current && ContentContainer.current.innerHTML) {
      previewHTML = ContentContainer.current.innerHTML;
    }

    console.log('previewHTML ', previewHTML)
  });


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
  console.log('json ', json);
  // console.log('fileJson ', JSON.parse(fileJson));
// if(fileJson) {
//   let json = renderJSONComponents(JSON.parse(fileJson.toString()));
// }
  return (
    <div>
    
  	<ModalContainer show={show}>
    <ModalHeader>PREVIEW</ModalHeader>
      <ModalClose onClick={onClose}>X</ModalClose>
      <PreviewContent ref={ContentContainer}>{json}</PreviewContent>
    </ModalContainer>
    </div>
  );

}


export default Modal;


