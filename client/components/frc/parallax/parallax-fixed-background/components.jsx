import styled from "styled-components";
export const ParallaxFixedBackgound = styled.div`
  &.componentParallaxFixedBackground {
    width: 100%;
    .parallaxFixedBackground {
      width: 100%;
      cursor: pointer;
    }
    .mobileContainer {
      display: none;
      @media (max-width: 767px) {
        display: block;
      }
    }
    .tabletContainer {
      display: none;
      @media (min-width: 768px) and (max-width: 1024px) {
        display: block;
      }
    }
    .mobileBackground,
    .tabletBackground {
      position: absolute;
      clip: rect(0,auto,auto,0);
      width: 100%;
      height: 100vh;
      overflow: hidden;
      .fixedInner {
        position: fixed;
        top: 43px;
        left: 0;
        width: 100%;
        height: 100vh;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        pointer-events: none;
        & > div {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
        }
      }
    }
  }
`;
export const DesktopBackground = styled.div`
  overflow: hidden;
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 80px;
  background-image: ${props => props.styles.backgroundImage};
  height: ${props => props.styles.height};
  max-height: ${props => props.styles.maxHeight};
  display: none;
  @media (min-width: 1025px) {
    display: block;
  }
`;
export const MobileBackground = styled.div`
  .fixedInner {
    height: ${props => props.fixedInnerStyle.height};
    top: ${props => props.fixedInnerStyle.top};
    .fixedInnerDivStyle {
      background-image: ${props => props.fixedInnerDivStyle.backgroundImage};
      background-position: ${props => props.fixedInnerDivStyle.backgroundPosition};
    }
  }
`;
