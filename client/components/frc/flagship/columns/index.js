import React from 'react';
import Styled from 'styled-components';
import ColumnsHTML from './columns.js';
import CompContainer from '../../global/comp-container';
import Text from '../../global/text';

const Debug = false;
const SmallPadding = 6;
const LargePadding = 15;

const calculatePadding = (count, isMobile) => {
  const isEven = (count % 2 === 0);
  if (isMobile && (isEven || count === 3)) return SmallPadding;
  return LargePadding;
};

const calculateRows = (objects, isMobile, text) => {
  const count = objects.length;
  const isEven = (count % 2 === 0);
  if (isMobile && count === 3) return [[objects[0]], [objects[1]], [objects[2]]];
  if (isMobile && isEven && (count !== 2 || text == null)) {
    const half = Math.ceil(objects.length / 2);
    return [objects.slice(0, half), objects.slice(half, objects.length), null];
  }
  return [objects, null, null];
};

const renderText = (text, count, isMobile) => {
  if (text == null) return null;
  if (count === 4 && isMobile) return null;
  return <Text info={text} />;
};

const calculateInfo = (rowIndex, isImageOptions, padding, topPadding, rows, startIndex, theme, noSideP, open) => {
  const objects = rows[rowIndex];
  if (objects == null) return null;
  const paddingTop = rowIndex === 0 && !topPadding ? 0 : padding * 2;
  let si = startIndex; // rowIndex === 0
  if (rowIndex === 3) si = startIndex + objects.length * (2 / 3);
  if (rowIndex === 1 && rows[2] == null) si = startIndex + objects.length * (1 / 2);
  if (rowIndex === 1 && rows[2] != null) si = startIndex + objects.length * (1 / 3);
  return {
    isImageOptions,
    noSideP,
    objects,
    open,
    padding,
    paddingTop,
    startIndex: si,
    theme
  };
};

const infoFromStateAndProps = (state, props) => {
  const isMobile = props.isMobile || false;
  const data = props.data || {};
  const actions = data.actions || {};
  const open = actions.open;
  const theme = data.columnsTheme || 'default';
  const objects = data.imageOptions || data.components || [];
  const startIndex = data.columnsInitialIndex || 0;
  const isImageOptions = data.imageOptions != null;
  const to = data.textOption;
  const count = objects.length;
  const topPadding = data.columnsTopPadding;
  const noSideP = data.columnsNoSidePadding;
  const padding = calculatePadding(count, isMobile);
  const rows = calculateRows(objects, isMobile, to);
  const text = renderText(to, objects.length, isMobile);
  const row0 = calculateInfo(0, isImageOptions, padding, topPadding, rows, startIndex, theme, noSideP, open);
  const row1 = calculateInfo(1, isImageOptions, padding, topPadding, rows, startIndex, theme, noSideP, open);
  const row2 = calculateInfo(2, isImageOptions, padding, topPadding, rows, startIndex, theme, noSideP, open);
  return {
    row0,
    row1,
    row2,
    text
  };
};

class Columns extends React.Component {

  constructor(props) {
		super(props);
    if (Debug) console.log(`|Columns| initialized`);
  }

  componentDidMount() {
    if (Debug) console.log('|Columns| did mount');
  }

  componentWillUnmount() {
    if (Debug) console.log('|Columns| will unmount');
  }

  // Public Methods

  // Private Methods, do not call with another controller

  render() {
    const info = infoFromStateAndProps(this.state, this.props);
		const row0 = info.row0 ? <ColumnsHTML info={info.row0} /> : null;
    const row1 = info.row1 ? <ColumnsHTML info={info.row1} /> : null;
    const row2 = info.row2 ? <ColumnsHTML info={info.row2} /> : null;
    const text = info.text;
    if (Debug) console.log(`|Columns| render row0: |${info.row0}| row1: |${info.row1}| row2: |${info.row2}|`);
    const html = (
      <Section padding={info.row0.padding} >
        {row0}
        {row1}
        {row2}
        {text}
      </Section>
    );
		if (this.props.notcontained) return html;
    return (
      <CompContainer infos={this.props.data}>
          {html}
      </CompContainer>
    );
  }
}

export default Columns;

const Section = Styled.section`
  width: 100%;
  padding-left: ${props => props.padding}px;
  padding-right: ${props => props.padding}px;
`;
