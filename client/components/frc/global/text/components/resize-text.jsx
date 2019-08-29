import { Component } from "react";

class ResizeText extends Component {
  constructor(props) {
	super(props);
	this.state = {
      mobileview: false,
      tabletview: false
	};
    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
	window.addEventListener("resize", this.resize, true);
	this.resize();
  }

  componentWillUnmount() {
	window.removeEventListener("resize", this.resize, true);
  }

  resize() {
    const {mobileview, tabletview} = this.state;
    const width = window.innerWidth || document.documentElement.clientWidth;
    if (width < 768 && !mobileview) this.setState({mobileview: true});
    else if (width >= 768 && mobileview) this.setState({mobileview: false});

    if (width >= 768 && width <= 1024 && !tabletview) this.setState({tabletview: true});
    else if (width < 768 && tabletview) this.setState({tabletview: false});
    else if (width > 1024 && tabletview) this.setState({tabletview: false});
  }

  render() {
    const { tabletview, mobileview } = this.state;
    const { textTablet, textMobile, text } = this.props.data;
    if (tabletview && textTablet) return textTablet;
    if (mobileview && textMobile) return textMobile;
    return text;
  }
}

export default ResizeText;
