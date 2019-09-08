import React from 'react';
import GridHTML from './grid.js';
import CompContainer from 'components/basic/edx/global/comp-container';

const Debug = false;
const DefaultColumns = 4;
const MaxRows = 100;

const infoFromStateAndProps = (props, state, actions) => {
  const data = props.data || {};
  const pActions = data.actions || {};
  const columns = data.gridColumns || DefaultColumns;
  const isMobile = props.isMobile || false;
  const items = data.imageOptions || data.components || [];
  const sections = data.sections || [];
  const columnsTheme = data.columnsTheme;
  const isImageOptions = data.imageOptions != null;
  const rows = data.gridRows || MaxRows;
  const buttonRow = rows + 1;
  const rowsNeededForImages = Math.ceil(items.length / columns);
  const displayedRows = state.buttonClicked ? rowsNeededForImages : rows;
  const count = rowsNeededForImages < displayedRows ? items.length : displayedRows * columns;
  const objects = items.slice(0, count);
  const open = pActions.showModal ? actions.open : null;
  const shouldDisplay = state.buttonClicked ? false : (objects.length < items.length);
  const displayAll = shouldDisplay ? actions.displayAll : null;
  const displayName = data.gridDisplayButtonName || 'VIEW ALL LOOKS';
  const ariaLabel = data.ariaLabel || '';
  return {
    buttonRow,
    columns,
    columnsTheme,
    displayAll,
    displayName,
    focus: state.focus,
    isImageOptions,
    isMobile,
    objects,
    open,
    sections,
    ariaLabel
  };
};

// orders html by rows, section, button
const htmlFromCompleteAndSections = (complete, info) => {
  // just display rows and buttons
  if (complete.sections.length === 0) {
    return [
      complete.rows,
      complete.button
    ];
  }
  // add sections to appropriate row
  let buttonRow = info.buttonRow;
  const rows = info.sections.map(x => x.row);
  if (complete.button) rows.push(info.buttonRow);
  let largestRow = 0;
  for (let i = 0; i < rows.length; i++) { if (rows[i] > largestRow) largestRow = rows[i]; }
  const lastRow = Math.max(largestRow + 1, complete.rows.length);
  const objects = [];
  for (let i = 0; i < lastRow; i++) {
    const currentRow = i + 1;
    const additions = rows.filter(x => x === currentRow);
    for (let j = 0; j < additions.length; j++) {
      if (buttonRow && buttonRow === currentRow) {
        objects.push(complete.button);
        buttonRow = null;
      } else {
        objects.push(complete.sections[0]);
        complete.sections.shift();
      }
    }
    if (i < complete.rows.length) objects.push(complete.rows[i]);
  }
  return objects;
};

class Grid extends React.Component {

  // Controller Life Cycle

  constructor(props) {
    super(props);
    this.state = {
      buttonClicked: false,
      hidden: false,
      focus: false
    };
    this.actions = {
      open: this.open.bind(this),
      displayAll: this.displayAll.bind(this)
    };
    this.keydown = this.keydown.bind(this);
    this.gridHTML = new GridHTML;
  }

  componentDidMount() {
    if (Debug) console.log(`|Grid| did mount`);
    document.addEventListener('keydown', this.keydown);
  }

  componentWillUnmount() {
		if (Debug) console.log(`|Grid| will unmount`);
		document.removeEventListener('keydown', this.keydown);
  }

  // Public Methods

  rows() {
    const info = infoFromStateAndProps(this.props, this.state, this.actions);
    info.noPadding = true;
    return this.gridHTML.rows(info);
  }

  // Private Methods, do not call with another controller

  keydown(e) {
    if (this.state.hidden) return;
		const k = e.keyCode;
		if (k === 9 && !this.state.focus) this.setState({ focus: true }); // tab key
		if (Debug) console.log(`|Grid| key down: ${k}`);
  }

  open(index) {
    if (Debug) console.log(`|Grid| opened index: |${index}|`);
    if (this.state.focus) this.setState({focus: false});
    const data = this.props.data || {};
    const actions = data.actions || {};
    if (actions.showModal) {
      actions.showModal(index);
      this.setState({ hidden: true });
    }
  }

  displayAll() {
    if (Debug) console.log('|Grid| displayAll');
    this.setState({ buttonClicked: true });
  }

  render() {
    if (Debug) console.log(`|Grid| render`);
    const info = infoFromStateAndProps(this.props, this.state, this.actions);
    const complete = this.gridHTML.complete(info);
    const html = htmlFromCompleteAndSections(complete, info);
    return (
      <CompContainer infos={this.props.data}>
          {html}
      </CompContainer>
    );
  }
}

export default Grid;
