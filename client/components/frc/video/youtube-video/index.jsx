import React, { Component } from 'react';
import CompContainer from '../../global/comp-container';
import { ComponentVideo } from './components';
const setAttributes = (elmnt, styleObj) => {
  Object.keys(styleObj).forEach((key) => {
    if (styleObj && styleObj.hasOwnProperty(key)) {
      if (key === "tabIndex") {
        elmnt.setAttribute(key, styleObj[key]);
      } else {
        elmnt.style[key] = styleObj[key];
      }
    }
  });
};
const getPoster = (src) => {
  return (
    <picture className="gallery--picture">
      <source srcSet={src.desktop} media="(min-width:1024px)" />
      <source srcSet={src.tablet} media="(min-width:768px)" />
      <source srcSet={src.mobile} media="(max-width:767px)" />
      <img src={src.mobile} draggable="false" alt={src.alt} />
    </picture>
  );
};
class YouTubeVideoPlay extends Component {
  constructor(props) {
    super(props);
    this.playVideo = "";
    this.handleClick = this.handleClick.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);
  }
  componentDidMount() {
    this.addYouTubeAPI();
  }
  addYouTubeAPI() {
    if (typeof document !== 'undefined') {
      const iframeAPIsrc = "https://www.youtube.com/iframe_api";
      const scripts = document.getElementsByTagName('script');
      if ([...scripts].some(script => script.src === iframeAPIsrc)) {
        this.initializeYoutubePlayer();
      } else {
        const scriptTag = document.createElement('script');
        const firstScriptTag = document.getElementsByTagName('script')[0];
        scriptTag.src = iframeAPIsrc;
        firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
        scriptTag.onload = () => {
          this.initializeYoutubePlayer();
        };
      }
    }
  }
  initializeYoutubePlayer() {
    const videoPlayButton = this.refs.videoPoster;
    const fullVideo = this.refs.videoYoutube;
    let youtubePlayer;
    const initialPlayer = setInterval(() => {
      if (youtubePlayer === undefined || youtubePlayer === null) {
        youtubePlayer = this.generateYoutubePlayer(videoPlayButton, fullVideo);
      } else {
        clearInterval(initialPlayer);
      }
    }, 450);
    this.playVideo = () => this.showFullVideo(videoPlayButton, fullVideo, youtubePlayer);
  }
  showFullVideo(videoPlayButton, fullVideo, youtubePlayer) {
    if (youtubePlayer && typeof youtubePlayer.playVideo === 'function') {
      setAttributes(videoPlayButton, { zIndex: -1, tabIndex: -1 });
      setAttributes(fullVideo, { zIndex: 1 });
      youtubePlayer.playVideo();
    }
  }
  showLoopVideo(videoPlayButton, fullVideo) {
    setAttributes(videoPlayButton, { zIndex: 1, tabIndex: 0 });
    setAttributes(fullVideo, { zIndex: -1 });
  }
  generateYoutubePlayer(videoPlayButton, fullVideo) {
    const YT = window.YT;
    if (typeof YT !== "undefined" && YT && YT.Player) {
      return new YT.Player(fullVideo.id, {
        events: {
          onReady: () => { return (setAttributes(videoPlayButton, { zIndex: 1 })); },
          onStateChange: (event) => {
            return (event.data === YT.PlayerState.ENDED ? this.showLoopVideo(videoPlayButton, fullVideo) : 0);
          }
        }
      });
    }
    return null;
  }
  handleClick(e) {
    e.preventDefault();
    if (this.playVideo !== "") {
      this.playVideo();
    }
  }
  keydownHandler(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      if (this.playVideo !== "") {
        this.playVideo();
      }
    }
  }
  renderPlayButton(playButtonInfo) {
    return (
      <button onKeyDown={this.keydownHandler} className="youtube-video-button gallery--picture mkwp--loop-play hide-mobile-only">
        <img src={playButtonInfo.playButton} alt={playButtonInfo.alt} />
      </button>
    );
  }
  rendervedioDom(data) {
    const video = data.video;
    const playButtonInfo = video.playButtonInfo;
    const buttonInfo = (typeof playButtonInfo !== "undefined" && typeof playButtonInfo.playButton !== "undefined" && playButtonInfo.playButton !== "");
    return (
      <ComponentVideo className={`component componentVideo youtube-video-initialized ${data.fullBleed ? 'fullBleed' : ''}`} ref="youTubeVideoPlay" >
        <div className="video-poster" ref="videoPoster" tabIndex={buttonInfo ? "" : 0} onKeyDown={this.keydownHandler} onClick={this.handleClick}>
          {data.poster && getPoster(data.poster.imgSrc)}
        </div>
        {buttonInfo && this.renderPlayButton(playButtonInfo)}
        <iframe width="100%" height="" className="video-youtube" ref="videoYoutube" id={video.youtube} src={`https://www.youtube.com/embed/${video.youtube}?rel=0&html5=1&enablejsapi=1&showinfo=0`} frameBorder="0" allowFullScreen></iframe>
      </ComponentVideo>
    );
  }
  render() {
    if (!this.props.data) {
      return null;
    }
    const { data } = this.props;
    return (
      <CompContainer infos={data}>
        {this.rendervedioDom(data)}
      </CompContainer>
    );
  }
}
export default YouTubeVideoPlay;
