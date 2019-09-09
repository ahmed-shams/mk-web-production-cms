import styled from "styled-components";

export const ComponentVideo = styled.div`
  &.component {
    max-width: 1440px!important;
    margin: 0 auto;
    &.fullBleed {
      max-width: 100% !important;
    }
  }
  &.componentVideo {
    position: relative;
    overflow: hidden;
    min-height: 538px;
    opacity: 1;
    transition: opacity .35s ease-out;
    &.html-video-initialized {
      min-height: auto;
      opacity: 1;
    }
    video[poster] {
      object-fit: cover;
    }
    video {
      background: 0 0;
      display: -ms-flexbox;
      display: flex;
      width: 100%;
      background: #000;
      overflow: hidden;
    }
    .video-controller {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: opacity 0.5s ease-out;
      background-color: rgba(255, 255, 255, 0.8);
      &.inactive {
        opacity: 0;
        pointer-events: none;
      }
      &:focus,
      &:active {
        &.inactive {
          opacity: 1;
          pointer-events: inherit;
        }
        span {
          outline: 1px dotted #000;
        }
      }
      &.dark {
        background-color: rgba(0, 0, 0, 0.8);
        span {
          color: #ffffff;
          &.play i:before {
            border-color: transparent transparent transparent white;
          }
        }
      }
      span {
        color: #000000;
        font-size: 14px;
        letter-spacing: 0.05em;
        font-family: "Gotham 7R", "Gotham Bold";
        text-transform: uppercase;
        &.play i:before {
          font-style: initial;
          display: inline-block;
          content: '';
          height: 0;
          border-style: solid;
          line-height: 0px;
          border-color: transparent transparent transparent black;
          _border-color: black black black white;
          _filter: progid:DXImageTransform.Microsoft.Chroma(color='#000');
          border-width: 5.2px 0 5.2px 5.2px;
          position: relative;
          padding-right: 10px;
        }
        &.pause i:before {
          font-style: normal;
          content: '||';
          display: inline-block;
          height: 12px;
          padding-right: 3px;
          position: relative;
          letter-spacing: 1.2px;
          overflow: hidden;
        }
      }
    }
  }
`;
