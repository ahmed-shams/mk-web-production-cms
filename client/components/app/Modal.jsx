
const ModalContainer = styled.div`
 ${props => props.show && css`
 	 display: block;
  }

  ${props => !props.show && css`
  	 display: none;
  }
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = ({ show }) => {

  return (
  	<ModalContainer show={show}>
    </ModalContainer>
  );

}


export default Modal;