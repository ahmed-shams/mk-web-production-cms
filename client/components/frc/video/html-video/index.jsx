
import React, { Component } from 'react';
import { MwkpDev, GlobalMKWPWrapper } from '../../global/comp-container/components';
import { ComponentVideo } from './components';
class HtmlVideoPlay extends Component {
  constructor(props) {
    super(props);
    this.controllerClickHandler = this.controllerClickHandler.bind(this);
    this.vedioClickHandler = this.vedioClickHandler.bind(this);
    this.showController = this.showController.bind(this);
    this.hideController = this.hideController.bind(this);
    this.handleLazyload = this.handleLazyload.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
    this.handleInViewport = this.handleInViewport.bind(this);
    this.handlevideoKeyDown = this.handlevideoKeyDown.bind(this);
    this.handleControllerKeyDown = this.handleControllerKeyDown.bind(this);
    this.setVideoPlaying = this.setVideoPlaying.bind(this);
    this.state = {
      showController: false,
      isVideoLoaded: false,
      isVideoPlaying: this.setVideoPlaying()
    };
  }
  componentDidMount() {
    if (this.refs.lazyVideo) {
      if ("IntersectionObserver" in window) {
        this.observer = new IntersectionObserver(this.handleIntersection);
        this.observer.observe(this.refs.lazyVideo);
      } else {
        this.handleLazyload();
        window.addEventListener('scroll', this.handleLazyload);
        window.addEventListener('resize', this.handleLazyload);
      }
    }
    if (this.refs.video) {
      window.addEventListener('scroll', this.handleInViewport);
      window.addEventListener('resize', this.handleInViewport);
    }
  }
  componentWillUnmount() {
    if (this.lazyVideoObserver) {
      this.lazyVideoObserver.disconnect();
    }
    window.removeEventListener('scroll', this.handleLazyload);
    window.removeEventListener('resize', this.handleLazyload);
    window.removeEventListener('scroll', this.handleInViewport);
    window.removeEventListener('resize', this.handleInViewport);
  }
  isMobileViewScreen() {
    let flag = false;
    if (typeof window !== 'undefined' && window.innerWidth <= 767) {
      flag = true;
    }
    return flag;
  }
  setVideoPlaying() {
    const { data } = this.props;
    const autoplayMobile = (typeof data.mobile === "undefined") ? true : data.mobile;
    const autoplayDesktop = (typeof data.desktop === "undefined") ? true : data.desktop;
    if ((!autoplayMobile && this.isMobileViewScreen()) || (!autoplayDesktop && !this.isMobileViewScreen())) {
      return false;
    } else {
      return (typeof data.autoplay === "undefined") ? true : data.autoplay;
    }
  }
  handleIntersection = entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !this.state.isVideoLoaded) {
        const vChildren = Array.from(e.target.children);
        vChildren.forEach(videoSource => {
          if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
            videoSource.src = videoSource.dataset.src;
          }
        });
        this.setState({ isVideoLoaded: true });
        e.target.load();
      }
      if (e.intersectionRatio > 0) {
        if (this.state.isVideoPlaying) {
          e.target.play();
        }
      } else {
        e.target.pause();
      }
    });
  };
  handleLazyload() {
    if (this.refs.lazyVideo && !this.state.isVideoLoaded && this.isInViewport(this.refs.lazyVideo)) {
      const vChildren = Array.from(this.refs.lazyVideo.children);
      vChildren.forEach(videoSource => {
        if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
          videoSource.src = videoSource.dataset.src;
        }
      });
      this.refs.lazyVideo.load();
      this.setState({ isVideoLoaded: true });
    } else {
      this.handleInViewport();
    }
  }
  isInViewport(el) {
    const viewport = el.getBoundingClientRect();
    return (viewport.bottom >= 0 && viewport.top <= (window.innerHeight || document.documentElement.clientHeight));
  }
  handleInViewport() {
    const videoRef = this.refs.video ? this.refs.video : this.refs.lazyVideo;
    if (videoRef && this.isInViewport(videoRef)) {
      if (this.state.isVideoPlaying) {
        videoRef.play();
      }
    } else {
      videoRef.pause();
    }
  }
  handleEnded() {
    this.setState({ isVideoPlaying: false });
  }
  showController() {
    this.setState({ showController: true });
  }
  hideController() {
    this.setState({ showController: false });
  }
  controllerClickHandler() {
    const videoRef = this.refs.video ? this.refs.video : this.refs.lazyVideo;
    if (videoRef.paused) {
      videoRef.play();
      this.setState({ isVideoPlaying: true });
    } else {
      videoRef.pause();
      this.setState({ isVideoPlaying: false });
    }
  }
  vedioClickHandler(e) {
    if (this.isMobileViewScreen()) {
      e.preventDefault();
      this.controllerClickHandler();
    }
  }
  handlevideoKeyDown(e) {
    if (e.keyCode === 13) {
      const parentTarget = e.target.parentNode;
      if (parentTarget.tagName.toLowerCase() === 'a') {
        window.location.href = parentTarget.getAttribute("href");
      } else {
        this.controllerClickHandler();
      }
    }
  }
  handleControllerKeyDown(e) {
    if (e.keyCode === 13 || e.keyCode === 27) {
      this.controllerClickHandler();
    }
  }
  createSource(data) {
    const lazyloading = (typeof data.lazyload === "undefined") ? true : data.lazyload;
    return Object.keys(data.video).map(key => {
      if (data.video[key] !== "") {
        return <source key={key} src={`${lazyloading ? '' : data.video[key]}`} data-src={`${lazyloading ? data.video[key] : ''}`} ref="videoSource" type={`video/${key}`} />;
      }
      return null;
    });
  }
  renderVideoSource(data) {
    const infinity = (typeof data.loop === "undefined") ? true : data.loop;
    const mute = (typeof data.muted === "undefined") ? true : data.muted;
    const lazyloading = (typeof data.lazyload === "undefined") ? true : data.lazyload;
    const autoplay = this.setVideoPlaying();
    return (
      <video poster={data.poster} ref={`${lazyloading ? "lazyVideo" : "video"}`}
        loop={infinity}
        onClick={this.vedioClickHandler}
        onKeyDown={this.handlevideoKeyDown}
        onEnded={this.handleEnded}
        autoPlay={autoplay}
        muted={mute}
        playsInline={autoplay}
        tabIndex="0"
        aria-hidden="false"
        preload="metadata">
        {this.createSource(data)}
      </video>
    );
  }
  renderVideo(data) {
    if (typeof data.link !== "undefined") {
      const linkInfo = data.link;
      return (
        <a href={linkInfo.url} data-icid={linkInfo.data_icid}
          tabIndex="-1" aria-hidden="true"
          aria-label={linkInfo.aria}>
          {this.renderVideoSource(data)}
        </a>
      );
    } else {
      return <div>{this.renderVideoSource(data)}</div>;
    }
  }
  renderController(data) {
    const controller = (typeof data.control === "undefined") ? true : data.control;
    const controllerDarkBg = (typeof data.dark === "undefined") ? false : data.dark;
    if (controller) {
      const videoCurState = this.state.isVideoPlaying ? "pause" : "play";
      return (
        <div className={`video-controller ${this.state.showController ? "" : "inactive"} ${controllerDarkBg ? 'dark' : ''}`}
          onClick={this.controllerClickHandler}
          onKeyDown={this.handleControllerKeyDown}
          ref="videoController"
          tabIndex="0"
          role="button"
          aria-label={`${videoCurState} promo video`}>
          <span className={videoCurState}><i aria-hidden="true"></i>{videoCurState}</span>
        </div>
      );
    }
    return null;
  }
  renderVedioContainer(data) {
    return (
      <ComponentVideo className={`component componentVideo html-video-initialized ${data.fullBleed ? 'fullBleed' : ''}`}
        ref="htmlVideo" onMouseEnter={this.showController}
        onMouseLeave={this.hideController}
        data-linkcontainer={data.globalOptions.data_linkcontainer}>
        {this.renderVideo(data)}
        {this.renderController(data)}
      </ComponentVideo>
    );
  }
  render() {
    if (!this.props.data) {
      return null;
    }
    const { data } = this.props;
    const info = data.globalOptions;
    return (
      <MwkpDev className="mkwpdev"
        id={info.personalization}
        mobilehide={info.hide_mobile}
        desktophide={info.hide_desktop}
        bgcolor={info.background.color}
        bgimg={info.background.image !== undefined ? info.background.image : undefined} >
        <GlobalMKWPWrapper collapsed={info.collapsed}
          fullbleed={info.fullbleed} bgcolor={info.background.color}
          paddingtop={info.padding.top}
          paddingbottom={info.padding.bottom}>
          {this.renderVedioContainer(data)}
        </GlobalMKWPWrapper>
      </MwkpDev>
    );
  }
}
export default HtmlVideoPlay;
