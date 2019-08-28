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
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  padding: 8px 10px;
  ${props => props.colorprop !== undefined && css`
    color: ${props => props.colorprop};
    border-color: ${props => props.colorprop};
  `}
  @media (min-width: 320px) and (max-width: 767px) {
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }
  @media (min-width: 768px){
    max-width: 445px;
    width: calc(45% - 15px);
    margin-right: 30px;
  }
  @media (min-width: 1025px){
    width: calc(48% - 15px);
    margin-right: 30px;
    padding 20px;
  }
  ${props => props.showmobile === true && css`
    @media (min-width: 768px) {
      display: none;
    }
  `}
`;

const SecondCta = styled(FirstCta)`
  @media (max-width: 767px) {
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
    width: 90%;
  }
  @media (min-width: 768px){
    margin-right: 0;
  }
`;

const Cta = styled.div`
  letter-spacing: 0.1em;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  text-align: center;
`;

const CtaEu = ({data}) => {
  const { ctas } = data;
  return (
    <CtaContainer>
      <FirstCta showmobile={ctas[0].show_mobile_only} href={ctas[0].link} colorprop={data.color} aria-label={ctas[0].aria_label} data-icid={ctas[0].data_icid}>
        <Cta className={`${data.font_family}`}>{ctas[0].text}</Cta>
      </FirstCta>
      <SecondCta showmobile={ctas[1].show_mobile_only} href={ctas[1].link} colorprop={data.color} aria-label={ctas[1].aria_label} data-icid={ctas[1].data_icid}>
        <Cta className={`${data.font_family}`}>{ctas[1].text}</Cta>
      </SecondCta>
    </CtaContainer>
  );
};

export default CtaEu;
