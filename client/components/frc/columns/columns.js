import React from 'react';
import Styled from 'styled-components';
import Image16x9 from '../global/image/plain';

const isSmall = (index, theme, count) => {
  if (theme === 'evenLeft' && index !== 0) return true;
  if (theme === 'evenRight' && index !== count - 1) return true;
  return false;
};

const imageHTML = (info) => {
  const count = info.objects.length;
  const figures = [];
  for (let i = 0; i < count; i++) {
    const object = info.objects[i];
    const component = info.isImageOptions && object != null ? <Image16x9 info={object} /> : object;
    let html = null;
    if (isSmall(i, info.theme, count)) {
      const inner = info.padding * 3.66;
      html = (
        <Figure paddingL={info.padding} paddingR={info.padding} key={1000 + i}>
          <Figure paddingL={inner} paddingR={inner} paddingTop={inner}>
            {component}
          </Figure>
        </Figure>
      );
    } else {
      const pL = i === 0 && info.noSideP ? 0 : info.padding;
      const pR = i === count - 1 && info.noSideP ? 0 : info.padding;
      html = (
        <Figure paddingL={pL} paddingR={pR} key={1000 + i}>
          {component}
        </Figure>
      );
    }
    if (info.open) {
      const open = () => info.open(info.startIndex + i);
      html = (
        <button onClick={open}>
          {html}
        </button>
      );
    }
    figures.push(html);
  }
  return figures;
};

const ColumnsHTML = ({info}) => {
  const html = imageHTML(info);
  return (
    <Row paddingTop={info.paddingTop}>
      {html}
    </Row>
  );
};

export default ColumnsHTML;

const Figure = Styled.figure`
  width: 100%;
  padding-top: ${props => (props.paddingTop ? props.paddingTop : 0)}px;
  padding-left: ${props => props.paddingL}px;
  padding-right: ${props => props.paddingR}px;
  position: relative;
`;

const Row = Styled.div`
  display: flex;
  padding-top: ${props => (props.paddingTop ? props.paddingTop : 0)}px;
  button {
    flex: 1;
  }
`;
