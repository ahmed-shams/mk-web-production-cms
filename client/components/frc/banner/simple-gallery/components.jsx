import styled, {css} from "styled-components";

export const StyledSwipe = styled.div`
  .fade {
    transition: all 200ms ease-in 0s;
    picture {
      img {
        opacity: 0;
        transition: all 200ms ease-in 0s;
      }
    }
    .text-wrapper {
      opacity: 0;
      transition: all 200ms ease-in 0s;
    }
  }

`;

export const Inner = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => props.sliderInfo.background_color !== undefined && css`
    .simpleGalleryContent {
      background-color: ${props => props.sliderInfo.background_color};
    }
  `}
  .swiper-pagination {
    color: ${props => (props.sliderInfo.pagination_color ? props.sliderInfo.pagination_color : "#000")};
    @media (max-width: 767px) {
      color: ${props => (props.sliderInfo.pagination_color ? props.sliderInfo.pagination_color : "#707070")};
    }
  }
  [class^="typedivider__TypeDivider"] {
    border-top-color: ${props => (props.sliderInfo.divider_color ? props.sliderInfo.divider_color : "#000")};
  }
`;

export const CustomButtonPrev = styled.button`
  outline: none;
  border: none;
  width: 24px;
  height: 40px;
  background-size: 24px 40px !important;
  left: 10% !important;
  top: 50%!important;
  margin-top: 0 !important;
  transform: translateY(-50%);
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 11 35' xmlns='http://www.w3.org/2000/svg' width='11' height='35'%3E%3Cpolygon class='cls-3' points='11 35 1.14 17.5 11 0 9.86 0 0 17.5 9.86 35' fill='%23707070'/%3E%3C/svg%3E%0A") !important;
  transition: background-color 750ms;
  &.swiper-button-disabled {
    opacity: 0.3 !important;
  }
  &:hover,
  &:focus {
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 11 35' xmlns='http://www.w3.org/2000/svg' width='11' height='35'%3E%3Cpolygon class='cls-3' points='11 35 1.14 17.5 11 0 9.86 0 0 17.5 9.86 35' fill='%23000000'/%3E%3C/svg%3E%0A");

  }
  &[disabled] {
    display: none;
  }
  @media (max-width: 767px) {
    left: 3.5% !important;
    width: 15px !important;
    height: 25px !important;
    background-size: 25px 31px !important;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    left: 4.5% !important;
  }
`;
export const CustomButtonNext = styled.button`
  left: inherit;
  right: 10% !important;
  outline: none;
  border: none;
  width: 24px;
  height: 40px;
  background-size: 24px 40px !important;;
  top: 50% !important;
  margin-top: 0 !important;
  transform: translateY(-50%);
  transition: background-color 750ms;
  &.swiper-button-disabled {
    opacity: 0.3 !important;
  }
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 11 35' width='11' height='35' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon class='cls-3' fill='%23707070' points='0 0 9.86 17.5 0 35 1.14 35 11 17.5 1.14 0'/%3E%3C/svg%3E%0A") !important;
  &:hover,
  &:focus {
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 11 35' width='11' height='35' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon class='cls-3' fill='%23000000' points='0 0 9.86 17.5 0 35 1.14 35 11 17.5 1.14 0'/%3E%3C/svg%3E%0A");
  }
  &[disabled] {
    display: none;
  }
  @media (max-width: 767px) {
    right: 3.5% !important;
    left: inherit;
    width: 15px !important;;
    height: 25px !important;
    background-size: 25px 31px !important;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    right: 4.5% !important;
    left: inherit;
  }
`;

export const SimpleGalleryContainer = styled.div`
  max-width: 1440px;
  margin: 50px auto;
  .swiper-container > .swiper-pagination{
    display: none;
  }
  .sliderWrapper {
    justify-content: space-around;
    align-items: center;
    width: 61.1%;
    margin: 1px auto !important;
    padding: 60px 0;

    @media (min-width: 768px) and (max-width: 1024px) {
      width: 78.13%;
    }

    @media (max-width: 767px) {
      width: 77.5%;
      padding: 30px 0 30px 0;
      .picture-container {
        margin-top: 12px;
        margin-bottom: 16px;
      }
      .hide-mobile-only {
        display: none !important;
      }
      .show-for-mobile {
      display: block !important;
      }
    }
    .text-wrapper {
      padding-left: 29.5%;
      transition: all 180ms linear 0s; 
      text-align: left; 

      @media (max-width: 767px) {
        padding-left: 0;
      } 
      @media (min-width: 768px) and (max-width: 1024px) {
        padding-left: 13.2%;
      }
      img {
        font-size: 12px;
        line-height: 1.66667;
      }
      [class^="typedivider__TypeDivider"] {
        margin-left: 0;
        padding-bottom: 0;
      }
    }
    .type-copy-gotham-deck {
      margin: 0;
      font-size: 12px;
      letter-spacing: 0.03em;
      line-height: 1.5;
      font-family: "Gotham Book", "Gotham 4R";
    }
    @media (max-width: 767px) {
      .slider-image-headline {
        a {
          display: inline-block;
          width:85%;
          .type-headline-mmk-2 {
            width:100%;
          }
        }
        .type-headline-mmk-2 {
          display: inline-block;
          width: 85%;
        }
        img {
          display: inline-block;
          width: 18px;
          float: right;
        }
      }
    }
    .divider {
      height: 1px;
      margin-top: 20px;
      margin-bottom: 40px;
      width: 50px;
    }
    .show-for-mobile {
      display: none;
    }
    .swiper-pagination {
      width: 100%;
      text-align: left;
      position: static;
      padding-bottom: 17px;
      padding-left: 0;
      font-size: 12px;
      letter-spacing: 0.03em;
      line-height: 1.5;
      font-family: "Gotham Book", "Gotham 4R";

      @media (max-width: 767px) {
        letter-spacing: 0;
        float: left;
        padding-bottom: 0;
      }
    }
    .picture-container {
      img {
        transition: all 180ms linear 0s;
      }
    }
  }
`;

export const ModalSubWwrapper = styled.div`
  // background: #fff;
  background: ${props => (props.sliderInfo.model_background_color ? props.sliderInfo.model_background_color : "#fff")};
  width: 100%;
  position: relative;
  min-height: 100%;
  .close-btn-wrapper {
    width: 45px;
    height: 44px;
    position: absolute;
    right: 3px;
    display: flex;
    z-index: 10000;
    justify-content: center;
    align-items: center;
    .closeButton {
      width: 98%;
      padding: 3px 0px 13px 3px;
      height: 99%;
      font-size: 2em;
      margin: 0;
      margin-top: 1px;
    }
  }
  .modal-content-wrapper {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    flex-basis: 50%;
    padding: 15px 16px 38px;
    .sticky-header {
      position: absolute;
      top: 0;
      width: calc(100% - 32px);
      padding: 18px 0 6px;
      margin-bottom: 0;
      border-bottom: 1px solid ${props => (props.sliderInfo.model_headerLine_color ? props.sliderInfo.model_headerLine_color : "#000")};
      z-index: 9999;
      h2 {
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 0;
      }
    }
    .modal-description-wrapper {
      padding-top: 43px;
      margin: 0;
    }
    .type-copy-gotham-deck {
      font-family: "Gotham 4R","Gotham Book";
      font-size: 12px;
      letter-spacing: .05em;
      line-height: 1.5;
    }
    .modal-headline {
      .type-headline-mmk-2 {
        font-size: 12px;
      }
    }
  }
`;

