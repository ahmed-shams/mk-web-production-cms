import styled, { css } from 'styled-components';

export const MwkpDev = styled.section`
  background-color: ${props => props.bgcolor};
  ${props => props.bgimg !== undefined && css`
    background-image: url(${props.bgimg.src});
    background-repeat: ${props.bgimg.repeat};
    background-position: ${props => props.bgimg.position};
    background-size: ${props => props.bgimg.size};
  `};
  ${props => props.mobilehide && css`
    @media screen and (max-width: 767px) {
      display: none;
    }
  `}
  ${props => props.tablethide && css`
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      display: none;
    }
  `}
  ${props => props.desktophide && css`
    @media screen and (min-width: 1025px) {
      display: none;
    }
  `}
`;

export const GlobalMKWPWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${props => props.bgcolor};
  ${props => props.fullbleed && css`
    max-width: 100%;
  `}
  ${props => props.gutters && css`
    padding-left: 6px;
    padding-right: 6px;
    @media (min-width: 768px) {
      padding-left: 15px;
      padding-right: 15px;
    }
    @media (min-width: 1025px) {
      padding-left: 30px;
      padding-right: 30px;
    }
  `}
  padding-top: 0;
  padding-bottom: 0;
  ${props => props.paddingtop === "ext-padding-100" && css`
    padding-top: 40px;
    @media (min-width: 768px) {
      padding-top: 60px;
    }
    @media (min-width: 1025px) {
      padding-top: 100px;
    }
  `}
  ${props => props.paddingbottom === "ext-padding-100" && css`
    padding-bottom: 40px;
    @media (min-width: 768px) {
      padding-bottom: 60px;
    }
    @media (min-width: 1025px) {
      padding-bottom: 100px;
    }
  `}
  ${props => props.paddingtop === "ext-padding-45" && css`
    padding-top: 35px;
    @media (min-width: 768px) {
      padding-top: 40px;
    }
    @media (min-width: 1025px) {
      padding-top: 45px;
    }
  `}
  ${props => props.paddingbottom === "ext-padding-45" && css`
    padding-bottom: 35px;
    @media (min-width: 768px) {
      padding-bottom: 40px;
    }
    @media (min-width: 1025px) {
      padding-bottom: 45px;
    }
  `}
  ${props => props.paddingtop === "ext-padding-30" && css`
    padding-top: 20px;
    @media (min-width: 768px) {
      padding-top: 25px;
    }
    @media (min-width: 1025px) {
      padding-top: 30px;
    }
  `}
  ${props => props.paddingbottom === "ext-padding-30" && css`
    padding-bottom: 20px;
    @media (min-width: 768px) {
      padding-bottom: 25px;
    }
    @media (min-width: 1025px) {
      padding-bottom: 30px;
    }
  `}
  ${props => props.paddingtop === "ext-padding-15" && css`
    padding-top: 10px;
    @media (min-width: 768px) {
      padding-top: 15px;
    }
    @media (min-width: 1025px) {
      padding-top: 15px;
    }
  `}
  ${props => props.paddingbottom === "ext-padding-15" && css`
    padding-bottom: 10px;
    @media (min-width: 768px) {
      padding-bottom: 15px;
    }
    @media (min-width: 1025px) {
      padding-bottom: 15px;
    }
  `}
  ${props => props.paddingtop === "ext-padding-0" && css`
    padding-top: 0px;
  `}
  ${props => props.paddingbottom === "ext-padding-0" && css`
    padding-bottom: 0px;
  `}
`;

/* add data-linkcontainer to promo container */
export const PromoContainer = styled.div`
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  align-items: center;
  margin: 0 auto;
  ${props => props.styleFix === "banner4by5" && css`
    flex: 0 0 66.66667%;
    max-width: 66.66667%;
  `}
  ${props => props.styleFix === "toi" && css`
    flex-direction: row;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  `}
  @media (min-width: 768px) {
    flex-basis: 100%;
    margin-bottom: 0;
  }
`;
