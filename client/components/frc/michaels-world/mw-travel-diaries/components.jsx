import styled from 'styled-components';
export const TravelDiary = styled.section`
  width: 100%;
  &.banner16by9 {
    div[class^="components__TextBox"]:not(.wpCta) {
      width: 50%;
      @media (max-width: 767px) {
        width: 90%;
      }
    }
  }
  &.banner4by5 {
    @media (max-width: 767px) {
      padding-left: 12px;
      padding-right: 12px;
    }
    div[class^="components__PromoContainer"] {
      padding: 0 25px;
      @media (max-width: 767px) {
        max-width: 100%;
        padding: 0;
      }
    }
    div[class^="components__TextBox"]:not(.wpCta) {
      width: 51%;
      margin-left: 0;
      text-align: left;
      @media (max-width: 767px) {
        width: 90%;
      }
    }
  }
  &.regOneUpRight {
    div[class^="columns__Row"] {
      max-width: 83.33333%;
      align-items: center;
      margin: 0 auto;
      padding-top: 0;
      figure: last-child {
        figure {
          margin-left: 18%;
          padding: 0;
          width: auto;
        }
        div[class^="default-tyle__ImageContainer"] {
          @media (min-width: 768px) {
            display: none;
          }
        }
        div[class^="components__TextBox"]:not(.wpCta) {
          @media (min-width: 768px) {
            padding-top: 0;
          }
          div[class^="inner-container"] {
            text-align: left;
            @media (min-width: 1024px) {
              .wpText {
                max-width: 90%;
              }
            }
            @media (max-width: 767px) {
              text-align: center;
              max-width: 100%;
              margin: 0;
            }
          }
        }
      }
    }
    div[class^="columns__Row"]:last-child {
      div[class^="default-tyle__ImageContainer"] {
        @media (max-width: 767px) {
          display: none;
        }
      }
    }
  }
  @media (max-width: 1024px) {
    div[class^="columns__Row"] {
      padding-top: 5px;
      div[class^="components__TextBox"]:not(.wpCta) {
        padding-top: 25px;
      }
      .wpCta {
        padding-bottom: 0;
      }
    }
  }
  @media (max-width: 767px) {
    div[class^="button__ButtonDiv"] {
      padding-top: 0;
    }
  }
  button {
    font-size: 11px;
    @media (min-width: 768px) {
      font-size: 12px;
    }
    @media (min-width: 1025px) {
      font-size: 14px;
    }
  }
`;
