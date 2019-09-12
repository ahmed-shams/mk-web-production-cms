import React, { useState, useRef, useEffect } from 'react';
import ReactDiffViewer from 'react-diff-viewer'
import { ModalContainer, ModalHeader, ModalClose, PreviewContent} from './Modal';

//mk-style.min has css rules that are necessary for proper component rendering i.e. picture>img width: 100%

const DiffModal = ({ onClose, old, curr }) => {
  const oldCode = `${old}`;
  const newCode = `${curr}`;
//   console.log("diff modal oldcode")
//   console.log(oldCode);
//   console.log("diff modal new code")
//   console.log(newCode);
  return (
  	<ModalContainer>
      <ModalHeader>Diff View</ModalHeader>
      <ModalClose onClick={onClose}>X</ModalClose>
      <PreviewContent>
		<ReactDiffViewer
			oldValue={oldCode}
			newValue={newCode}
			splitView={true}
		/>
	  </PreviewContent>
    </ModalContainer>
  );
}

export default DiffModal;
