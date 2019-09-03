import React from 'react';
import Generator from 'components/basic/rich-text-component';

const Debug = false;
const MobileSize = 768;

const getComponent = (props, isMobile, generator) => {
  if (isMobile == null) return null;
  const data = props.data || {};
  const componentId = data.onResize || (isMobile && data.onMobile) || data.onDesktop || null;
  const copy = JSON.parse(JSON.stringify(data));
  copy.componentId = componentId;
  if (Debug) console.log(`|Resize| rendering componentId: |${componentId}| isMobile: ${isMobile}`);
  return generator.renderJSONComponents([copy], isMobile);
};

class Resize extends React.Component {

  constructor(props) {
		super(props);
    this.state = {isMobile: null};
    this.resize = this.resize.bind(this);
    this.generator = new Generator;
    if (Debug) console.log('|Resize| did initialize');
  }

  componentDidMount() {
    if (Debug) console.log('|Resize| did mount');
    window.addEventListener("resize", this.resize, true);
    this.resize();
  }

  componentWillUnmount() {
    if (Debug) console.log('|Resize| will unmount');
    window.removeEventListener("resize", this.resize, true);
  }

  resize() {
    const {isMobile} = this.state;
    const width = window.innerWidth || document.documentElement.clientWidth;
    if (width < MobileSize && (isMobile == null || !isMobile)) this.setState({isMobile: true});
    else if (width >= MobileSize && (isMobile == null || isMobile)) this.setState({isMobile: false});
    else if (width === MobileSize && (this.props.data.carouselTheme && this.props.data.carouselTheme === "lookback") && (isMobile == null || !isMobile)) this.setState({isMobile: true});
  }

  render() {
    const {isMobile} = this.state;
    const component = getComponent(this.props, isMobile, this.generator);
    return component;
  }
}

export default Resize;
