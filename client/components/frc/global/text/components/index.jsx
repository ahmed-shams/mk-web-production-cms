import styled, { css } from 'styled-components';

const TextBox = styled.div`
  padding-top: 0;
  padding-bottom: 0;
  ${props => props.paddingtop === "int-padding-60" && css`
    padding-top: 35px;
    @media (min-width: 768px) {
      padding-top: 45px;
    }
    @media (min-width: 1024px) {
      padding-top: 60px;
    }
  `}
  ${props => props.paddingtop === "int-padding-50" && css`
    padding-top: 30px;
    @media (min-width: 768px) {
      padding-top: 35px;
    }
    @media (min-width: 1024px) {
      padding-top: 50px;
    }
  `}
  ${props => props.paddingtop === "int-padding-40" && css`
    padding-top: 25px;
    @media (min-width: 768px) {
      padding-top: 30px;
    }
    @media (min-width: 1024px) {
      padding-top: 40px;
    }
  `}
  ${props => props.paddingtop === "int-padding-30" && css`
    padding-top: 20px;
    @media (min-width: 768px) {
      padding-top: 25px;
    }
    @media (min-width: 1024px) {
      padding-top: 30px;
    }
  `}
  ${props => props.paddingtop === "int-padding-20" && css`
    padding-top: 15px;
    @media (min-width: 768px) {
      padding-top: 20px;
    }
    @media (min-width: 1024px) {
      padding-top: 20px;
    }
  `}
  ${props => props.paddingbottom === "int-padding-60" && css`
    padding-bottom: 35px;
    @media (min-width: 768px) {
      padding-bottom: 45px;
    }
    @media (min-width: 1024px) {
      padding-bottom: 60px;
    }
  `}
  ${props => props.paddingbottom === "int-padding-50" && css`
    padding-bottom: 30px;
    @media (min-width: 768px) {
      padding-bottom: 35px;
    }
    @media (min-width: 1024px) {
      padding-bottom: 50px;
    }
  `}
  ${props => props.paddingbottom === "int-padding-40" && css`
    padding-bottom: 25px;
    @media (min-width: 768px) {
      padding-bottom: 30px;
    }
    @media (min-width: 1024px) {
      padding-bottom: 40px;
    }
  `}
  ${props => props.paddingbottom === "int-padding-30" && css`
    padding-bottom: 20px;
    @media (min-width: 768px) {
      padding-bottom: 25px;
    }
    @media (min-width: 1024px) {
      padding-bottom: 30px;
    }
  `}
  ${props => props.paddingbottom === "int-padding-20" && css`
    padding-bottom: 15px;
    @media (min-width: 768px) {
      padding-bottom: 20px;
    }
    @media (min-width: 1024px) {
      padding-bottom: 20px;
    }
  `}
  ${props => props.color !== 'undefined' && css`
    color: ${props => props.color} !important;
  `}
`;

export default TextBox;
