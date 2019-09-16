import styled from 'styled-components';
export const CompVideo4by5 = styled.div`
  &.componentVideo4by5 {
    max-width: 1440px;
    width: 100%;
    @media (min-width: 768px) {
      .video-tablet-left {
        .videoContent {
          position: absolute;
          top: 70%;
          transform: translate(25%, -50%);
          z-index: 5;
        }
      }
      .video-tablet-right {
        .videoContent {
          position: absolute;
          top: 70%;
          right: 0;
          transform: translate(-25%, -50%);
          z-index: 5;
        }
      }
      .video-tablet-center {
        .videoContent {
          position: absolute;
          top: 70%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 5;
        }
      }
    }
    @media (max-width: 767px) {
      .column-gutter {
        padding-left: 12px;
        padding-right: 12px;
      }
      .video-mobile-halfTop {
        .imageContent {
          order: 2;
          transform: translate(0, -45%);
          margin-bottom: -56%;
          margin-left: 0;
        }
        .videoContent {
          order: 1;
          max-width: 90%;
          margin: 0 auto;
        }
      }
      .video-mobile-halfBottom {
        .videoContent {
          max-width: 90%;
          transform: translate(0, -50%);
          margin-bottom: -54%;
          margin-left: 5%;
          z-index: 4;
        }
      }
      .video-mobile-top {
        .imageContent {
          order: 2;
        }
        .videoContent {
          order: 1;
          padding-bottom: 30px;
        }
      }
      .video-mobile-bottom {
        .imageContent {
          padding-bottom: 30px;
        }
      }
    }
  }
`;
