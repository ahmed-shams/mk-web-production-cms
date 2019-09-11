import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ReactDiffViewer from 'react-diff-viewer'

const ModalContainer = styled.div`
  display: flex;
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

//mk-style.min has css rules that are necessary for proper component rendering i.e. picture>img width: 100%

const DiffModal = ({ onClose }) => {
  const ContentContainer = useRef(null);
	console.log("diff modal");
	const oldCode = `
  {
    "key1": "value1",
    "key2": "value2",
  }
  `;
  const newCode = `
  {
    "key3": "value3",
    "key4": "value4",
  }
  `;
  return (
  <div>
  	<ModalContainer>
      <ModalHeader>Diff View</ModalHeader>
      <ModalClose onClick={onClose}>X</ModalClose>
      <PreviewContent ref={ContentContainer}>
				<ReactDiffViewer
					oldValue={oldCode}
					newValue={newCode}
					splitView={true}
				/>
			</PreviewContent>
    </ModalContainer>
  </div>
  );

}


export default DiffModal;
