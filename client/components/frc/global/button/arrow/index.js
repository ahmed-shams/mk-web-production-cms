import React from 'react';
import Styled from 'styled-components';

const Debug = false;
const ButtonWidth = 30;
const ButtonHeight = 60;

const arrowPath = (data) => {
  const w = 1;
  const width = 30;
  const v = data.block ? { sX: 8.5, sY: 10, dX: 13, dY: 20 } : { sX: 6, sY: 3.33, dX: 18, dY: 26.66 };
  if (data.direction === 'left') return `M${width - v.sX},${v.sY} l-${w},0 l-${v.dX},${v.dY} l${v.dX},${v.dY} l${w},0 l-${v.dX},-${v.dY} l${v.dX},-${v.dY} M${width - v.sX},${v.sY} z`;
  return `M${v.sX},${v.sY} l${w},0 l${v.dX},${v.dY} l-${v.dX},${v.dY} l-${w},0 l${v.dX},-${v.dY} l-${v.dX},-${v.dY} M${v.sX},${v.sY} z`;
};

class ArrowButton extends React.Component {

  constructor(props) {
		super(props);
    this.mouseOut = this.mouseOut.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.onButton = false;
    this.button = React.createRef();
  }

  componentDidMount() {
    if (Debug) console.log('|ArrowButton| did mount');
    if (this.props.data.hideOnBlur) this.button.current.addEventListener("mouseout", this.mouseOut, true);
    if (this.props.data.hideOnBlur) this.button.current.addEventListener("mouseover", this.mouseOver, true);
  }

  componentWillUnmount() {
    if (Debug) console.log('|ArrowButton| will unmount');
    this.button.current.removeEventListener("mouseout", this.mouseOut, true);
    this.button.current.removeEventListener("mouseover", this.mouseOver, true);
  }

  // Public Methods


  // Private Methods, do not call with another controller

  arrowButtonHTML(data) {
    if (Debug) console.log(`direction: |${data.direction}| action: |${data.action}| block: |${data.block}| hideOnBlur: |${data.hideOnBlur}|`);
    const rgba = data.block ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0)';
    const path = arrowPath(data);
    const opacity = data.hideOnBlur && !this.onButton ? 0 : 1;
    return (
      <ArrowB ref={this.button} rgba={rgba} opacity={opacity} onClick={data.onClick}>
        <Svg info={data}>
          <ArrowPath d={path} />
        </Svg>
      </ArrowB>
    );
  }

  mouseOut() {
    if (!this.onButton) return;
    this.onButton = false;
    this.setState({ render: true });
		if (Debug) console.log('|ArrowButton| mouse out');
	}

  mouseOver() {
    if (this.onButton) return;
    this.onButton = true;
    this.setState({ render: true });
		if (Debug) console.log('|ArrowButton| mouse over');
	}

  render() {
    if (Debug) console.log('|ArrowButton| render');
    const html = this.arrowButtonHTML(this.props.data);
    if (!this.props.data.testDiv) return html;
    return <TestDiv>{html}</TestDiv>;
  }
}

export default ArrowButton;

const ArrowB = Styled.button`
  opacity: ${props => props.opacity};
  width: ${ButtonWidth}px !important;
  height: ${ButtonHeight}px !important;
  background-color: ${props => props.rgba};
`;

const Svg = Styled.svg`
  width: 100%;
  height: 100%;
`;

const ArrowPath = Styled.path`
  fill: #D7D7D7;
`;

const TestDiv = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: green;
  width: 100%;
`;
