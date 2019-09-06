import styled from "styled-components";

export const ComponentVideo = styled.div`
  &.component {
    max-width: 1440px!important;
    margin: 0 auto;
  }
  &.componentVideo {
    &.youtube-video-initialized {
      min-height: auto;
      opacity: 1;
    }
    position: relative;
    overflow: hidden;
    min-height: 538px;
    opacity: 0;
    transition: opacity .35s ease-out;

    .video-poster {
      cursor: pointer;
    }
    img {
      display: inline-block;
      vertical-align: middle;
      max-width: 100%;
      height: auto;
    }
    picture > img {
      width: 100%;
      margin-left: 0!important;
      margin-top: 0!important;
      margin-right: 0!important;
      margin-bottom: 0!important;
    }
    .youtube-video-button {
      height: auto;
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      width: 9.97732%;
      transform: translate(-50%,-50%);
      cursor: pointer;
    }
    .mkwp--loop-play {
      z-index: 0!important;
      pointer-events: none;
    }
    .video-youtube {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  }
`;
