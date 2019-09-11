import React from 'react';
import styled, { css } from 'styled-components';

const CtaContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const FirstCta = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
  border-image: initial;
  padding: 8px 10px;
  min-height: 45px;
  max-height: 50px;
  background-color: ${props => props.bg} !important;
  ${props => props.colorprop !== undefined && css`
    color: ${props => props.colorprop};
  `}
  @media (min-width: 320px) and (max-width: 767px) {
    width: 95%;
    padding: 0 15px;
    max-width: 432px;
    margin-right: auto;
    margin-bottom: 3%;
    margin-left: auto;
  }
  @media (min-width: 768px){
    min-width: 153px;
    max-width: 250px;
    margin-bottom: 9%;
    width: 90%;
    padding: 0 15px;
  }
  @media (min-width: 1025px){
    min-width: 288px;
    max-width: 432px;
    width: calc(90% - 10px);
    margin-right: 20px;
    padding 20px;
  }
  ${props => props.showmobile === true && css`
    @media (min-width: 768px) {
      display: none;
    }
  `}
`;

const Cta = styled.div`
  letter-spacing: 0.1em;
  -webkit-box-align: center;
  align-items: center;
  color: ${props => props.color} !important;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  font-family: "Gotham Medium";
  font-size: 12px;
  letter-spacing: 0.03em;
  line-height: 16px;
  text-transform: uppercase;
  text-align: center;
  padding-bottom: -30px;
`;

const CtaHoliday = ({data}) => {
  const { cta } = data;
  return (
    <CtaContainer>
      <FirstCta showmobile={cta.show_mobile_only} href={cta.link} bg={cta.background} colorprop={data.color} aria-label={cta.aria_label} data-icid={cta.data_icid}>
        <Cta className={`${data.font_family}`} color={data.color}>{cta.text}</Cta>
      </FirstCta>
    </CtaContainer>
  );
};

export default CtaHoliday;
