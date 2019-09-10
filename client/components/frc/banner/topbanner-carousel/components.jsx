import styled from "styled-components";

// export const StyledSwipe = styled.div`
//   width: 63%;
//   .fade {
//     transition: all 200ms ease-in 0s;
//     picture {
//       img {
//         opacity: 0;
//         transition: all 200ms ease-in 0s;
//       }
//     }
//     .text-wrapper {
//       opacity: 0;
//       transition: all 200ms ease-in 0s;
//     }
//   }
// `;

// export const Inner = styled.div`
//   flex: 1;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   .mk-slider {
//     background-color: #f6f6f6;
//   }
// `;

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
//   background-color: rgba(255, 255, 255, 0.7);
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 11 35' xmlns='http://www.w3.org/2000/svg' width='11' height='35'%3E%3Cpolygon class='cls-3' points='11 35 1.14 17.5 11 0 9.86 0 0 17.5 9.86 35' fill='%23ffffff'/%3E%3C/svg%3E%0A") !important;
  transition: background-color 750ms;
  &.swiper-button-disabled {
    opacity: 0 !important;
  }
  &:hover,
  &:focus {
    // background-color: rgba(255, 255, 255, 1);
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 11 35' xmlns='http://www.w3.org/2000/svg' width='11' height='35'%3E%3Cpolygon class='cls-3' points='11 35 1.14 17.5 11 0 9.86 0 0 17.5 9.86 35' fill='%23ffffff'/%3E%3C/svg%3E%0A");

  }
  &[disabled] {
    display: none;
  }
  @media (max-width: 767px) {
    left: 3.5% !important;
    width: 31px !important;
    height: 41px !important;
    // background-size: 25px 31px !important;
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
    opacity: 0 !important;
  }
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 11 35' width='11' height='35' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon class='cls-3' fill='%23ffffff' points='0 0 9.86 17.5 0 35 1.14 35 11 17.5 1.14 0'/%3E%3C/svg%3E%0A") !important;
  &:hover,
  &:focus {
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 11 35' width='11' height='35' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon class='cls-3' fill='%23ffffff' points='0 0 9.86 17.5 0 35 1.14 35 11 17.5 1.14 0'/%3E%3C/svg%3E%0A");
  }
  &[disabled] {
    display: none;
  }
  @media (max-width: 767px) {
    right: 3.5% !important;
    left: inherit;
    width: 31px !important;;
    height: 41px !important;
    // background-size: 25px 31px !important;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    right: 4.5% !important;
    left: inherit;
  }
`;

export const CarouselContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  padding-top: 12px;
  background: #FFFFFF;
  .swiper-slide {
    width: 63%;
    border: 1px solid transparent;
    &.slide-border {
      border: 1px solid #000;
    }
    .type-wrapper {
      .type-slug-2 {
        padding: 10px 0 15px;
      }
    }
    &.banner--desc {
      height: auto;
      .banner-text {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        margin: -18px 10%;
        .type-headline-h2-mmk-2 {
          font-size: 18px;
          letter-spacing: .025em;
          font-family: "Gotham 5R","Gotham Medium";
        }
        .type-copy-caslon-deck {
          font-size: 14px;
        }
        .wpText {
          &.underline {
              display: inline-block;
              margin-top: 19px;
              font-size: 12px;
              &:after{
                  border-bottom: 1px solid #000;
                  padding-top: 3px;
              }
          }
        }
      }
    }
  }
  .gallery--picture {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative; 
  }
  .swiper-container > .swiper-pagination{
    display: none;
  }
  
`;
