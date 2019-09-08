import React from 'react';
import Styled from 'styled-components';

const Debug = false;

const Button = ({name, aria, action, hidden, focus, paddingTop, paddingBottom}) => {
  if (Debug) console.log(`|Button| creating |${name}|`);
  const tabIndex = hidden ? "-1" : "0";
  const className = focus ? "focus" : "";
  const button = <ButtonStyle ariaLabel={aria} tabIndex={tabIndex} className={className} onClick={action} >{name}</ButtonStyle>;
  if (paddingTop || paddingBottom) {
    return (
      <CenterDiv>
        <ButtonDiv paddingTop={paddingTop} paddingBottom={paddingBottom}>
          {button}
        </ButtonDiv>
      </CenterDiv>
    );
  }
  return (button);
};

export default Button;

const CenterDiv = Styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonDiv = Styled.div`
  width: 16.66667%;
  min-width: 300px;
  padding-top: ${props => (props.paddingTop ? props.paddingTop : 0)}px;
  padding-bottom: ${props => (props.paddingBottom ? props.paddingBottom : 0)}px;
`;

const ButtonStyle = Styled.button.attrs(props => ({
  'aria-label': props.ariaLabel
}))`
  font-size: 12px;
  width: 100%;
  height: 100%;
  color: rgba(0, 0, 0, 0.847);
  margin: 0 auto;
  border: 1px solid black;
  padding: 16px 5px;
  cursor: pointer;
  font-family: "Gotham 5R", "Gotham Medium";
`;
