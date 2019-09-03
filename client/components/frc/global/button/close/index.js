import React from 'react';
import Styled from 'styled-components';

const Debug = false;
const ButtonWidth = 44;
const ButtonHeight = 44;

class ArrowButton extends React.Component {

  componentDidMount() {
    if (Debug) console.log('|CloseButton| did mount');
  }

  componentWillUnmount() {
    if (Debug) console.log('|CloseButton| will unmount');
  }

  // Public Methods


  // Private Methods, do not call with another controller

  closeButtonHTML(data) {
    const size = data.closeButtonSize === 'small' ? 20 : 26;
    return (
      <CloseB onClick={data.onClick} size={size} />
    );
  }

  render() {
    if (Debug) console.log('|CloseButton| render');
    const data = this.props.data || {};
    const html = this.closeButtonHTML(data);
    if (!data.testDiv) return html;
    return <TestDiv>{html}</TestDiv>;
  }
}

export default ArrowButton;

const CloseB = Styled.button`
  width: ${ButtonWidth}px;
  height: ${ButtonHeight}px;
  text-align: right;
  &:after {
    content: "\00d7";
    font-family: "Caslon 540 LT W01 Roman", "Caslon #540 W01SC Rm SC", Caslon, Georgia, serif;
    color: black;
    font-size: ${props => props.size}px;
  }
`;

// const CloseDiv = Styled.div`
//
// `;


const TestDiv = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: green;
  width: 100%;
`;
