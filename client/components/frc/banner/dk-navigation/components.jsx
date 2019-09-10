import styled, { css } from 'styled-components';
const scrollableNav = () => {
  const styles = `    
    .nav-category {
      overflow-x: auto;
      &::-webkit-scrollbar {
        display: none;
        width: 0!important;
      }
    }
    nav {
      align-self: flex-start;
      animation: nav-slidein 750ms backwards;
      animation-fill-mode: forwards;
      overflow: -moz-scrollbars-none;
      -webkit-animation: nav-slidein 750ms backwards;
      -webkit-overflow-scrolling: touch;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
        width: 0!important;
      }
    }
  `;
  return css`${styles}`;
};
export const DkNavContainer = styled.div`
  &.componentDKNavgation {
    &.categoryExpanded {
      flex-direction: column;
      padding-bottom: 18px;
      padding-top: 25px;
      @media (max-width: 767px) { 
        padding-bottom: 16px;
      }
      @media (min-width: 768px) {
        padding-top: 43px;
      }
      @media (min-width: 1025px) {
        padding-top: 46px;
      }
      &.scrollmobile {        
        @media (max-width: 767px) {
          ${scrollableNav()}
          nav {width: ${props => props.navWidth};}
        }
      }
      &.scrolltabletPortrait {
        @media (min-width: 768px) and (max-width:1023px) {
          ${scrollableNav()}
          nav {width: ${props => props.navWidth};}
        }
      }
      &.scrolltabletLandscape {
        @media (min-width: 1024px) and (max-width:1267px) {
          ${scrollableNav()}
          nav {width: ${props => props.navWidth};}
        }
      }
      &.scrolldesktop {
        @media (min-width: 1024px) { 
          ${scrollableNav()}
          nav {width: ${props => props.navWidth};}
        }
      }
      .nav-logo {
        img {
          max-height: 23px;
          height: 23px;
          @media (min-width: 768px) {
            max-height: 35px;
            height: 35px;
          }
          @media (min-width: 1025px) {
            max-height: 38px;
            height: 38px;
          }
        }
      }
      .nav-category {
        padding-top: 18px;
        @media (min-width: 768px) {
          padding-top: 42px;
        }
        @media (min-width: 1025px) {
          padding-top: 44px;
        }
      }
    }
  }
`;
export const DkCategory = styled.div`
  display: inline-block;
  cursor: pointer;
  &.active,
  &:hover {
    a {
      border-bottom: 1px solid ${props => (props.borderColor ? props.borderColor : "#000")};
    }
  }
  &:first-child {
    a {margin-left: 12px;}
  }
  &:last-child {
    a {margin-right: 12px;}
  }
  a {
    display: block;
    margin-left: 18.5px;
    margin-right: 18.5px;
    .caption--slug {
      font-size: 12px;
      line-height: 1.4;
    }
    @media (min-width: 768px) {
      margin-left: 30px;
      margin-right: 30px;
      .caption--slug {
        font-size: 14px;
      }
    }
    @media (min-width: 1025px) {
      margin-left: 50px;
      margin-right: 50px;
      .caption--slug {
        font-size: 16px;
      }
    }
  }
`;
