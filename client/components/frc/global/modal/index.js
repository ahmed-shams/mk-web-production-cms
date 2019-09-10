import React from 'react';
import Styled from 'styled-components';
import Generator from '../../rich-text-component';

const Debug = false;

const getComponent = (props, ref, isModal, actions, generator) => {
  const key = isModal ? 1001 : 1002;
  const data = props.data || {};
  const copy = JSON.parse(JSON.stringify(data));
  const componentId = (isModal && copy.onModal) || copy.onMain || null;
  copy.componentId = componentId;
  copy.actions = actions;
  if (Debug) console.log(`|Modal| rendering componentId: |${componentId}| isModal: ${isModal}`);
  return generator.renderJSONComponents([copy], props.isMobile, key, ref);
};

class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.modal = React.createRef();
    this.main = React.createRef();
    this.index = 0;
    this.generator = new Generator;
    this.state = {isModal: false};
    this.actions = {
      showModal: this.showModal.bind(this),
      closeModal: this.closeModal.bind(this)
    };
    if (Debug) console.log(`|Modal| did initialize`);
  }

  // Public Methods (passed through data.actions)

  showModal(index) {
    if (Debug) console.log(`|Modal| show modal: |${index}|`);
    this.index = index || 0;
    this.modal.current.show(index);
    this.setState({isModal: true});
  }

  closeModal() {
    if (Debug) console.log(`|Modal| close modal`);
    this.setState({isModal: false});
  }

  // Private Methods, do not call with another controller

  render() {
    const main = getComponent(this.props, this.main, false, this.actions, this.generator);
    const modal = getComponent(this.props, this.modal, true, this.actions, this.generator);
    const modalView = (
      <ModalView isModal={this.state.isModal}>
        {modal}
      </ModalView>
    );
    return [
      main,
      modalView
    ];
  }
}

export default Modal;

const ModalView = Styled.section`
  background: white;
  display: ${props => (props.isModal ? 'flex' : 'none')};
  left: 0;
  height: 100vh;
  max-width: 100% !important;
  opacity: ${props => (props.isModal ? 1 : 0)};
  position: fixed;
  top: 0;
  transition: opacity 0.3s;
  width: 100%;
  z-index: 5000;
  .mkwpdev {
    margin: 0 auto;
  }
`;
