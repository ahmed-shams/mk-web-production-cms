import React, { Component } from 'react';
import CompContainer from '../../global/comp-container';
import { ParallaxParagraph, WhitneyProductChapter } from './components';
import Text from '../../global/text';
import Image16x9 from '../../global/image/plain';
const getCaptionHtml = (caption, desktop, index) => {
  return (
    <div key={`caption${index}`} className={`small-12 medium-4 medium-offset-1 ${desktop ? "hide-mobile-only" : "hide-tablet"}`} ref="captionContainer">
      <div className="type-wrapper" ref={`${desktop ? "textWrapper" : ""}`}>
        <Text info={caption} />
      </div>
    </div>
  );
};
const getImage = (image, imglen, index) => {
  return (
    <div key={`image${index}`} className={`small-12 medium-5 medium-offset-1 imageContainer ${index !== imglen ? "padding-bottom-30" : ""}`} ref={`imageContent${index}`}>
      <Image16x9 info={image} />
    </div>
  );
};
const getImgNext = (index) => {
  return (<div key={`imgNext${index}`} className="small-12 medium-6"></div>);
};
const getImageHtml = (data) => {
  let { imageOptions, caption } = data;
  if (imageOptions == null || !Array.isArray(imageOptions)) imageOptions = [];
  if (caption == null || typeof caption !== 'object') caption = {};
  const htmls = [];
  const imglen = imageOptions.length - 1;
  imageOptions.forEach((image, index) => {
    const imgHtml = image ? getImage(image, imglen, index) : null;
    const imgNext = index === 0 ? getCaptionHtml(caption, true, index) : getImgNext(index);
    htmls.push(imgHtml, imgNext);
  });
  return htmls;
};
const getHeaderHeight = () => {
  return (typeof document !== 'undefined' ? document.querySelector('.mk-web .header-container').offsetHeight : "");
};
const getScrollY = () => {
  return (typeof window.scrollY === "undefined" ? window.pageYOffset : window.scrollY);
};
class ParallaxFixedParagraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resetFixed: true,
      imgLength: this.props.data.imageOptions.length - 1,
      showItem: typeof this.props.data.showItem === 'undefined' ? true : this.props.data.showItem,
      styles: {
        maxWidth: "auto",
        marginTop: 0,
        top: "50%"
      }
    };
    this.setFixed = this.setFixed.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.setFixed);
    window.addEventListener('resize', this.setFixed);
  }
  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.setFixed);
      window.removeEventListener('resize', this.setFixed);
    }
  }
  setFixed() {
    const headerHeight = getHeaderHeight();
    const scrollY = getScrollY();
    const startImgTop = this.refs.imageContent0.getBoundingClientRect().top + scrollY - headerHeight;
    const endImgTop = this.refs["imageContent" + this.state.imgLength].getBoundingClientRect().top + scrollY - headerHeight;
    this.styleUpdate(headerHeight);
    if (startImgTop <= scrollY && endImgTop >= scrollY) {
      this.refs.textWrapper.classList.add("setFixed");
      this.setState({ styles: { ...this.state.styles, top: "50%" } });
    } else {
      this.removeFixed(startImgTop, scrollY);
    }
    if (this.isMobileViewScreen()) {
      this.getImageAnimate(headerHeight, scrollY);
    }
  }

  isMobileViewScreen() {
    let flag = false;
    if (typeof window !== 'undefined' && window.innerWidth <= 767) {
      flag = true;
    }
    return flag;
  }

  getImageAnimate(headerHeight, scrollY) {
    const imgIterate = this.props.data.imageOptions;
    Object.keys(imgIterate).forEach(idx => {
      const i = Math.abs(idx);
      const imgRefs = this.refs["imageContent" + i];
      this.addHelper(imgRefs, i);
      const imgOffset = imgRefs.getBoundingClientRect().top + scrollY;
      const trigger = imgOffset - headerHeight - 50;
      const distance = Math.floor((scrollY - trigger) * 0.2);
      if (i === imgIterate.length - 1) return;
      const level = Math.floor(distance);
      for (let j = 1; j <= 100; j++) {
        if (level === j) {
          imgRefs.classList.add(`animates-${level}`);
        } else if (level <= 100) {
          imgRefs.classList.remove(`animates-${j}`);
        }
      }
      if (level > 100) imgRefs.classList.add("animates-100");
    });
  }
  addHelper(imgRefs, index) {
      imgRefs.style.zIndex = 30 + index;
  }
  removeFixed(startImgTop, scrollY) {
    if (this.refs.textWrapper.classList.contains("setFixed")) {
      this.refs.textWrapper.classList.remove("setFixed");
      const endImgHeight = (this.refs["imageContent" + this.state.imgLength].getBoundingClientRect().height) / 2;
      const setTop = scrollY + endImgHeight - startImgTop;
      this.setState({ styles: { ...this.state.styles, top: `${setTop}px` } });
    }
  }
  styleUpdate(headerHeight) {
    const height = `${headerHeight / 2}px`;
    const width = `${this.refs.captionContainer.getBoundingClientRect().width}px`;
    if (this.state.styles.maxWidth !== width || this.state.styles.marginTop !== height) {
      this.setState({ styles: { ...this.state.styles, maxWidth: width, marginTop: height } });
    }
  }
  renderParallaxParagraph(data) {
    const { caption } = data;
    return (
      <ParallaxParagraph className="row componentParallaxFixedParagraph" styles={this.state.styles} data-linkcontainer={data.globalOptions.data_linkcontainer}>
        {getCaptionHtml(caption, false, 1)}
        {getImageHtml(data)}
      </ParallaxParagraph>
    );
  }

  render() {
    if (!this.props.data) {
      return null;
    }
    const { data } = this.props;
    const targetId = typeof data.id !== 'undefined' ? data.id : "";
    return (
      <WhitneyProductChapter className={`whitney-product-chapters ${this.state.showItem ? "active" : ""}`} id={targetId}>
        <CompContainer infos={this.props.data}>
          {this.renderParallaxParagraph(data)}
        </CompContainer>
      </WhitneyProductChapter>
    );
  }
}

export default ParallaxFixedParagraph;
