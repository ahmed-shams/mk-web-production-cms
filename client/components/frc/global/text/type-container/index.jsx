import styled, { css } from 'styled-components';
import TextBox from '../components/index';

const TypeContainer = styled(TextBox.withComponent('div'))`
  ${props => props.wrapper_align === "center" || props.wrapper_align === undefined && css`
    margin: 0 auto;
  `}
  ${props => props.wrapper_align === "right" && css`
    margin-left: auto;
  `}
  ${props => props.wrapper_align === "left" && css`
    margin-right: auto;
  `}
  text-align: ${props => props.text_align};
  ${props => props.desktopwidthprop !== undefined && css`
    width: ${props => props.desktopwidthprop};
  `}
  ${props => props.tabletwidthprop !== undefined && css`
    @media (max-width: 1024px) {
      width: ${props => props.tabletwidthprop};
    }
  `}
  ${props => props.mobilewidthprop !== undefined && css`
    @media (max-width: 768px) {
      width: ${props => props.mobilewidthprop};
    }
  `}
  ${props => props.mobile_left_to_center && css`
    text-align: center;
    @media (min-width: 768px) {
      text-align: left;
    }
  `}
  ${props => props.color !== 'undefined' && css`
    color: ${props => props.color} !important;
  `}
  a {
    color: black;
    ${props => props.color !== 'undefined' && css`
      color: ${props => props.color};
    `}
  }
  ${props => props.toi !== undefined && !props.holiday && css`
    @media (min-width: 768px) {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 33.33333%;
    }
  `}
   ${props => props.toi === "holiday-bottom" && css`
      position: absolute;
      bottom: 0 !important;
    @media (min-width: 768px) {  
      width: 33.33333%;
      left: 33.33333%;
      transform: translateY(0%) !important;
      padding-bottom: 0 !important;
    }  

    @media (max-width: 767) and (min-width: 500px) {
      width: 66.66666%;
      left: 33.33333%;
      transform: translateY(0%) !important;
      padding-bottom: 0 !important;
    }

    @media (max-width: 499px) {
      width: 100%;
      left: 0;
      transform: translateY(0%) !important;
      padding-bottom: 0 !important;
    }
  `}
  ${props => props.toi === "top-left" && css`
    top: 16% !important;
    left: 8.33333%;
    transform: translateY(0%) !important;
  `}
  ${props => props.toi === "mid-left" && css`
    left: 8.33333%;
  `}
  ${props => props.toi === "bottom-left" && css`
    bottom: 16% !important;
    left: 8.33333%;
    transform: translateY(0%) !important;
  `}
  ${props => props.toi === "top-center" && css`
    top: 16% !important;
    left: 33.33333%;
    transform: translateY(0%) !important;
  `}
  ${props => props.toi === "mid-center" && css`
    left: 33.33333%;
  `}
  ${props => props.toi === "bottom-center" && css`
    bottom: 16% !important;
    left: 33.33333%;
    transform: translateY(0%) !important;
  `}
  ${props => props.toi === "top-right" && css`
    top: 16% !important;
    left: 58.33333%;
    transform: translateY(0%) !important;
  `}
  ${props => props.toi === "mid-right" && css`
    left: 58.33333%;
  `}
  ${props => props.toi === "bottom-right" && css`
    bottom: 16% !important;
    left: 58.33333%;
    transform: translateY(0%) !important;
  `}
  ${props => props.toi === "sale-banner" && css`
    @media (min-width: 320px) {
      position: absolute !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      width: 100% !important;
    }
  `}
  ${props => props.toi === "sale-banner" && css`
    @media (min-width: 320px) {
      position: absolute !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      width: 100% !important;
    }
  `}
`;

export default TypeContainer;
