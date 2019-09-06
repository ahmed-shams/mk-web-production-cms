import styled, {css} from 'styled-components';
export const GiftService = styled.div`
  &.componentGiftServices {
    max-width: 1440px;
    width: 100%;
    .giftService {
      background-color: ${props => props.bgcolor};
      ${props => props.bgimg !== undefined && css`
        background-image: url(${props.bgimg.src});
        background-repeat: ${props.bgimg.repeat};
        background-position: ${props => props.bgimg.position};
        background-size: ${props => props.bgimg.size};
      `};
      position: relative;
      .giftServiceContainer {
        align-items: center;
        justify-content: space-around;
        @media (min-width: 768px) {
          width: 84%;
        }
        .giftServiceContent {
          a {
            display: block;
            &:focus{
              outline: thin dotted #fff;
            }
          }
          .type-headline-mmk-2 {
            width: 90%;
            margin: 0 auto;
          }
          @media (min-width: 768px) {
            &:first-child {
              .type-headline-mmk-2 {
                width: 100%;
                margin: 0 auto;
              }
            }
          }
          @media (max-width: 767px) {
            width: 100%;
          }
        }
      }
    }
  }
`;

