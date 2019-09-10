import React from 'react';
import LookbackHTML from './lookback.js';
import CompContainer from '../../global/comp-container';

const Debug = false;
const DefaultColumns = 4;
const NumRowsToLazyLoad = 1;
const MaxRows = 100000;

const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};

const addSectionsAndButton = (data, columns, buttonRow, images) => {
  const objects = images;
  const lazyIndex = columns * NumRowsToLazyLoad;
  const sections = data.sections || [];
  let rows = sections.map(x => x.row);
  if (buttonRow) rows.push(buttonRow);
  rows = rows.filter(unique);
  rows = rows.sort((a, b) => (b - a));
  if (Debug) {
    console.log(`|Lookback| rows defined`);
    console.log(rows);
  }
  objects.map(x => (x.componentId = 'image'));
  objects.map((x, index) => (x.index = index));
  objects.map((x, index) => ((index <= lazyIndex && NumRowsToLazyLoad !== 0) ? (x.lazyload = true) : (x.lazyload = false)));
  Object.keys(rows).forEach((index) => {
    const row = rows[index];
    const sects = sections.filter(x => x.row === row) || [];
    if (row === buttonRow) sects.unshift({componentId: 'displayButton'});
    objects.splice.apply(objects, [(row - 1) * columns, 0].concat(sects));
    if (Debug) {
      console.log(`|Lookback| sections row: |${row}| defined`);
      console.log(sects);
    }
  });
  if (Debug) {
    console.log(`|Lookback| objects defined`);
    console.log(objects);
  }
  return objects;
};

const stateInfoFromProps = (props, buttonClicked) => {
  const data = props.data || {};
  const columns = data.columns || DefaultColumns;
  const images = data.imageOptions || [];
  let texts = data.textOptions || [];
  const rowsNeededForImages = Math.ceil(images.length / columns);
  const displayedRows = buttonClicked ? rowsNeededForImages : data.displayedRows || MaxRows;
  const count = rowsNeededForImages < displayedRows ? images.length : displayedRows * columns;
  const buttonRow = count < images.length ? displayedRows + 1 : null;
  const neededImages = images.slice(0, count);
  texts = texts.slice(0, count);
  const objects = addSectionsAndButton(data, columns, buttonRow, neededImages);
  return {
    objects,
    texts,
    columns
  };
};

class Lookback extends React.Component {

  // Controller Life Cycle

  constructor(props) {
    if (Debug) console.log(`|Lookback| did initialize`);
    super(props);
    const {objects, texts, columns} = stateInfoFromProps(this.props, false);
    this.state = {
      objects,
      texts,
      columns,
      hidden: false,
      focus: false
    };
    this.actions = {
      open: this.open.bind(this),
      displayAllLooks: this.displayAllLooks.bind(this)
    };
    this.keydown = this.keydown.bind(this);
  }

  componentDidMount() {
    if (Debug) console.log(`|Lookback| did mount`);
    document.addEventListener('keydown', this.keydown);
  }

  componentWillUnmount() {
		if (Debug) console.log(`|Lookback| will unmount`);
		document.removeEventListener('keydown', this.keydown);
  }

  // Public Methods

  show() { //eslint-disable-line
    this.setState({ hidden: false });
  }

  // Private Methods, do not call with another controller

  keydown(e) {
    if (this.state.hidden) return;
		const k = e.keyCode;
		if (k === 9 && !this.state.focus) this.setState({ focus: true }); // tab key
		if (Debug) console.log(`|Lookback| key down: ${k}`);
  }

  open(index) {
    if (this.state.focus) this.setState({focus: false});
    const inheritedAction = (this.props.actions == null) ? {} : this.props.actions;
    if (Debug) console.log(`|Lookback| open |${index}| inherited: |${JSON.stringify(inheritedAction)}|`);
    if (inheritedAction.showModal) {
      inheritedAction.showModal(index);
      this.setState({ hidden: true });
    }
  }

  displayAllLooks() {
    if (Debug) console.log('|Lookback| called displayAllLooks');
    const {objects, texts, columns} = stateInfoFromProps(this.props, true);
    this.setState({
      objects,
      texts,
      columns,
      focus: false
    });
  }

  render() {
    if (Debug) console.log('|Lookback| did render');
    const html = <LookbackHTML state={this.state} actions={this.actions} />;
    if (!this.props.contained) return html;
    return (
      <CompContainer infos={this.props.data}>
          {html}
      </CompContainer>
    );
  }
}

export default Lookback;
