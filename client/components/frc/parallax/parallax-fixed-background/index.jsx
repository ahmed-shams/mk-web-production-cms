import React, { Component } from 'react';
import CompContainer from '../../global/comp-container';
import { ParallaxFixedBackgound, DesktopBackground, MobileBackground } from './components';
const setAttributes = (elmnt, styleObj) => {
  Object.keys(styleObj).forEach((key) => {
    if (styleObj && styleObj.hasOwnProperty(key)) {
      elmnt.style[key] = styleObj[key];
    }
  });
};
const getHeaderHeight = () => {
  return (typeof document !== 'undefined' ? document.querySelector('.mk-web .header-container').offsetHeight : "");
};
class ParallaxFixedBackground extends Component {
  constructor(props) {
    super(props);
    this.fixedBackgroundResizing = this.fixedBackgroundResizing.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.fixedBackgroundResizing);
    window.addEventListener('resize', this.fixedBackgroundResizing);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.fixedBackgroundResizing);
    window.removeEventListener('resize', this.fixedBackgroundResizing);
  }
  getMobileOrTablet(key, imageOptions) {
    const headerContainerHeight = getHeaderHeight();
    const backgroundImage = (typeof imageOptions.imgSrc === "undefined") ? false : imageOptions.imgSrc[key];
    const fixedInnerStyle = {
      height: "100vh",
      top: `${headerContainerHeight}px`
    };
    const fixedInnerDivStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: (typeof imageOptions.position === "undefined") ? "inherit" : imageOptions.position
    };
    return (
      <div key={key} className={`${key}Container`}>
        <MobileBackground ref={`${key}Background`} className={`${key}Background`} fixedInnerStyle={fixedInnerStyle} fixedInnerDivStyle={fixedInnerDivStyle}>
          <div className="fixedInner"><div className="fixedInnerDivStyle" /></div>
        </MobileBackground>
        <div ref={`${key}Layer`} className={`${key}Layer backgroundLayar`} style={{ height: "100vh" }} />
      </div>
    );
  }
  getImage(key, imageOptions) {
    const showMobile = (typeof imageOptions.mobile === "undefined") ? true : imageOptions.mobile;
    const showTablet = (typeof imageOptions.tablet === "undefined") ? true : imageOptions.tablet;
    const showDesktop = (typeof imageOptions.desktop === "undefined") ? true : imageOptions.desktop;
    if (showDesktop && key === "desktop") {
      const backgroundImage = (typeof imageOptions.imgSrc === "undefined") ? false : imageOptions.imgSrc[key];
      const desktopStyle = {
        backgroundImage: `url(${backgroundImage})`,
        height: (typeof imageOptions.height === "undefined") ? '30vw' : imageOptions.height,
        maxHeight: (typeof imageOptions.maxHeight === "undefined") ? '500px' : imageOptions.maxHeight,
        backgroundPosition: (typeof imageOptions.position === "undefined") ? "inherit" : imageOptions.position
      };
      return (<DesktopBackground key={key} ref={`${key}Background`} styles={desktopStyle} />);
    } else if ((showMobile && key === "mobile") || (showTablet && key === "tablet")) {
      return (this.getMobileOrTablet(key, imageOptions));
    } else {
      return null;
    }
  }
  updateStyles(backgroundRef, LayerRef) {
    const headerContainerHeight = getHeaderHeight();
    const stickyEl = JSON.parse(this.refs.parallaxFixedBackground.getAttribute('data-animate')).offsetSticky.replace(/^#/, "");
    const stickyElmntId = typeof document !== 'undefined' ? document.getElementById(stickyEl) : null;
    const offset = (this.isMobileViewScreen() ? (headerContainerHeight + (stickyEl !== undefined && stickyElmntId ? Math.max(stickyElmntId.offsetHeight, stickyElmntId.children[0].offsetHeight) : 0)) : headerContainerHeight);
    setAttributes(backgroundRef, { height: `calc(100vh - ${offset}px)` });
    setAttributes(backgroundRef.children[0], { top: `${headerContainerHeight}px`, height: `calc(100vh - ${offset}px)` });
    if (LayerRef) {
      setAttributes(LayerRef, { height: `calc(100vh - ${offset}px)` });
    }
  }
  isTabletScreen() {
    let flag = false;
    if (typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth <= 1024) {
      flag = true;
    }
    return flag;
  }
  isMobileViewScreen() {
    let flag = false;
    if (typeof window !== 'undefined' && window.innerWidth <= 767) {
      flag = true;
    }
    return flag;
  }
  fixedBackgroundResizing() {
    if (this.refs.tabletBackground && this.isTabletScreen()) {
      this.updateStyles(this.refs.tabletBackground, this.refs.tabletLayer);
    } else if (this.refs.mobileBackground && this.isMobileViewScreen()) {
      this.updateStyles(this.refs.mobileBackground, this.refs.mobileLayer);
    } else {
      if (this.refs.desktopBackground) {
        const headerContainerHeight = getHeaderHeight();
        setAttributes(this.refs.desktopBackground, { backgroundPosition: `center ${headerContainerHeight}px` });
      }
    }
  }
  imageContent(data) {
    const { imgInfo } = data.imageOptions;
    if (imgInfo && imgInfo.link_url) {
      return (
        <a className="parallaxFixedBackground"
          href={imgInfo.link_url}
          data-icid={imgInfo.data_icid}
          aria-hidden={imgInfo.aria.hidden}
          aria-label={imgInfo.aria.hidden ? '' : imgInfo.aria.label }
          tabIndex={imgInfo.tabindex}>
          {this.renderImage(data.imageOptions)}
        </a>
      );
    }
    return (
      <div className="parallaxFixedBackground"
        data-icid={imgInfo.data_icid}
        aria-hidden={imgInfo.aria.hidden}
        aria-label={imgInfo.aria.hidden ? '' : imgInfo.aria.label}
        tabIndex={imgInfo.tabindex}>
        {this.renderImage(data.imageOptions)}
      </div>
    );
  }
  renderImage(imageOptions) {
    const imgSrc = imageOptions.imgSrc;
    const backgroundHtml = [];
    Object.keys(imgSrc).forEach(key => {
      const html = this.getImage(key, imageOptions);
      backgroundHtml.push(html);
    });
    return backgroundHtml;
  }
  render() {
    const { data } = this.props;
    const animateDate = JSON.stringify(data.animate);
    return (
      <CompContainer infos={this.props.data}>
        <ParallaxFixedBackgound ref="parallaxFixedBackground" className="componentParallaxFixedBackground" data-animate={animateDate}>
          {this.imageContent(data)}
        </ParallaxFixedBackgound>
      </CompContainer>
    );
  }
}

export default ParallaxFixedBackground;
