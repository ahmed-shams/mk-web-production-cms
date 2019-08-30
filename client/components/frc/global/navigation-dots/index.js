import React from 'react';
import Styled from 'styled-components';

const NavigationDots = ({info}) => {
  if (info.count === 0) return null;
  const liHTMLs = [];
  for (let i = 0; i < info.count; i++) {
    const active = info.index % info.count === i;
    const ariaLabel = active ? `Selected, Slide ${i + 1}` : `Slide ${i + 1}`;
    const moveto = info.actions.moveto == null ? null : () => info.actions.moveto(i);
    const liHTML = (
      <DotLI key={9000 + i}>
        <DotButton active={active} onClick={moveto} aria-label={ariaLabel} />
      </DotLI>
    );
    liHTMLs.push(liHTML);
  }
  return (
    <DotsUL>
      {liHTMLs}
    </DotsUL>
  );
};

export default NavigationDots;

const DotsUL = Styled.ul`
  display: flex;
  bottom: 0;
  flex: 0 0 100%;
  justify-content: center;
  left: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  padding: 0;
  position: relative;
  -webkit-box-pack: center;
  width: 100%;
  z-index: 1;
`;

const DotLI = Styled.li`
  align-items: center;
  display: inline-flex;
  height: 12px;
  justify-content: center;
  margin: 0 4px;
  position: relative;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  width: auto;
`;

const DotButton = Styled.button`
  border: none;
  border-style: none;
  border-radius: 50%;
  font-size: 0;
  height: 0;
  padding: 4px;
  width: 0;
  outline: ${({active}) => (active ? 'inherit' : 'none !important')};
  background: ${({active}) => (active ? '#000' : '#fff')};
  border: ${({active}) => (active ? '1px solid #000' : '1px solid #d1d1d1')};
`;
