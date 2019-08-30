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
  background-color: black;
  color: white;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  height: 200px;
`

const CopyHtml = styled.button`
  position: absolute;
  z-index: 999;
  top: 35px;
  left: 25px;
  height: 50px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: black;
  border-radius: 5px;
    &:hover {
    cursor: pointer;
  } 
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
  color: white;

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

  const copyHtml = () => {
    console.log('in copy html');
    let previewHTML='';
    if(ContentContainer && ContentContainer.current && ContentContainer.current.innerHTML) {
      previewHTML = ContentContainer.current.innerHTML;
    }
    navigator.clipboard.writeText(previewHTML).then(()=>{
      alert('Copying to clipboard was successful');
    }, (e) => {
      alert('error happened while trying to copy josn. please try again');
    })
  }

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
    <CopyHtml onClick={copyHtml}>COPY HTML</CopyHtml>
    <ModalHeader>PREVIEW</ModalHeader>
      <ModalClose onClick={onClose}>X</ModalClose>
      <PreviewContent ref={ContentContainer}>{json}</PreviewContent>
    </ModalContainer>
  </div>
  );

}


export default Modal;


