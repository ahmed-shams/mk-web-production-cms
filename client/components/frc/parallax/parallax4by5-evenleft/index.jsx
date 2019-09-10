import React, { Component } from 'react';
import CompContainer from '../../global/comp-container';
import Image16x9 from '../../global/image/plain';
import Text from '../../global/text';
import { Parallax4by5 } from './components';
const getHTML = (data) => {
  const { imageOptions, textOptions } = data;
  const parallaxHtml = [];
  const iCount = imageOptions.length;
  const tCount = textOptions.length;
  const iterator = iCount > tCount ? imageOptions : textOptions;
  Object.keys(iterator).forEach((index) => {
    const i = parseInt(index, 10);
    const io = i < iCount && imageOptions[i] ? <Image16x9 info={imageOptions[i]} /> : null;
    const to = i < tCount && textOptions[i] ? <Text info={textOptions[i]} /> : null;
    const HTML = (
      <div key={i}
       className={`columns small-12 medium-offset-1 ${i === 0 ? "medium-5" : "medium-3 parallaxContainer"}`}
       ref={i === 0 ? "" : "parallaxContainer"}>
        {io}
        {to}
      </div>
    );
    parallaxHtml.push(HTML);
  });
  return parallaxHtml;
};
class Parallax4by5EvenLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transform: 0
    };
    this.setParallax = this.setParallax.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.setParallax);
    window.addEventListener('resize', this.setParallax);
  }
  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.setParallax);
      window.removeEventListener('resize', this.setParallax);
    }
  }
  setParallax() {
    const {animate} = this.props.data;
    const scrollY = (typeof window.scrollY === "undefined" ? window.pageYOffset : window.scrollY);
    const revisedSt = (animate.trigger === "top" ? scrollY : scrollY + window.innerHeight);
    const elmntTop = this.refs.parallax4by5EvenLeft.getBoundingClientRect().top + scrollY;
    const distance = revisedSt - elmntTop;
    const speed = (animate.speed !== undefined) ? animate.speed : 0.2;
    const offset = (animate.offset !== undefined) ? animate.offset : 0;
    if (elmntTop < revisedSt) {
      this.setState({transform: (-(distance * speed) + offset)});
    }
  }
  renderHtml(data) {
    return (
      <Parallax4by5 className="row componentParallax4by5EvenLeft"
      transform={this.state.transform}
      ref="parallax4by5EvenLeft">
          {getHTML(data)}
      </Parallax4by5>
    );
  }
  render() {
    if (!this.props.data) {
      return null;
    }
    const { data } = this.props;
    return (
      <CompContainer infos={data}>
        {this.renderHtml(data)}
      </CompContainer>
    );
  }
}

export default Parallax4by5EvenLeft;
