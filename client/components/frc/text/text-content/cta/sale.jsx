import React from 'react';
import styled, { css } from 'styled-components';

const CtaContainer = styled.div`
  justify-content: center;
  width: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-pack: center;
  justify-content: center;
  ${props => props.mobilehide && css`
    @media screen and (max-width: 767px) {
      display: none;
    }
  `}
`;

const DesktopCtaContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

const DesktopCtaContainerLine = styled(DesktopCtaContainer)`
  @media (min-width: 768px) {
    margin-bottom: -1px !important;
    margin-top: 25px !important;
  }
`;

const CtaLink = styled.a`
  position: relative;
  text-align: center;
  margin: 0 2.5%;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  display: inline;
  -webkit-box-align: center;
  &:after {
    border-left-color: #fff !important;
    display: none !important;
  }
  @media (max-width: 767px) {
    width: 50%;
    margin: 0;
    padding-bottom: 25px;
  }
`;

const Caret = styled.i`
  display: inline;
  white-space: nowrap;
  line-height: inherit;
  &::before {
    content: " ";
    box-sizing: inherit;
  }
  &::after {
    display: inline-block;
    content: '';
    height: 0;
    border-style: solid;
    border-right-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent;
    line-height: 0px;
    border-width: .34166em 0 .34166em .34166em;
    position: relative;
  }
`;

const desktopCta = (cdata, fontfamily) => {
  const helperClass = (cdata.length === 5) ? "" : "hide-tablet-only";
  return (
    <DesktopCtaContainer className={`wpCta ${helperClass} ${fontfamily}`}>
      {cdata.map((cd, i) => (
        <CtaLink href={cd.link} key={i} aria-label={cd.text} data-icid={cd.text}>{cd.text}<Caret /></CtaLink>
      ))}
    </DesktopCtaContainer>
  );
};

const sevenCtas = (data, fontfamily) => {
  return (
    <React.Fragment>
      <DesktopCtaContainer className="wpCta hide-mobile-only hide-desktop">
        <CtaLink className={`${fontfamily}`} href={data[0].link} aria-label={data[0].text} data-icid={data[0].text}>{data[0].text}<Caret /></CtaLink>
        <CtaLink className={`${fontfamily}`} href={data[1].link} aria-label={data[1].text} data-icid={data[1].text}>{data[1].text}<Caret /></CtaLink>
        <CtaLink className={`${fontfamily}`} href={data[2].link} aria-label={data[2].text} data-icid={data[2].text}>{data[2].text}<Caret /></CtaLink>
        <CtaLink className={`${fontfamily}`} href={data[3].link} aria-label={data[3].text} data-icid={data[3].text}>{data[3].text}<Caret /></CtaLink>
      </DesktopCtaContainer>
      <DesktopCtaContainerLine className="wpCta hide-mobile-only hide-desktop">
        <CtaLink className={`${fontfamily}`} href={data[4].link} aria-label={data[4].text} data-icid={data[4].text}>{data[4].text}<Caret /></CtaLink>
        <CtaLink className={`${fontfamily}`} href={data[5].link} aria-label={data[5].text} data-icid={data[5].text}>{data[5].text}<Caret /></CtaLink>
        <CtaLink className={`${fontfamily}`} href={data[6].link} aria-label={data[6].text} data-icid={data[6].text}>{data[6].text}<Caret /></CtaLink>
      </DesktopCtaContainerLine>
    </React.Fragment>
  );
};

const sixCtas = (data, fontfamily) => {
  return (
    <React.Fragment>
      <DesktopCtaContainer className="wpCta hide-mobile-only hide-desktop">
        <CtaLink className={`${fontfamily}`} href={data[0].link} aria-label={data[0].text} data-icid={data[0].text}>{data[0].text}<Caret /></CtaLink>
        <CtaLink className={`${fontfamily}`} href={data[1].link} aria-label={data[1].text} data-icid={data[1].text}>{data[1].text}<Caret /></CtaLink>
        <CtaLink className={`${fontfamily}`} href={data[2].link} aria-label={data[2].text} data-icid={data[2].text}>{data[2].text}<Caret /></CtaLink>
      </DesktopCtaContainer>
      <DesktopCtaContainerLine className="wpCta hide-mobile-only hide-desktop">
        <CtaLink className={`${fontfamily}`} href={data[3].link} aria-label={data[3].text} data-icid={data[3].text}>{data[3].text}<Caret /></CtaLink>
        <CtaLink className={`${fontfamily}`} href={data[4].link} aria-label={data[4].text} data-icid={data[4].text}>{data[4].text}<Caret /></CtaLink>
        <CtaLink className={`${fontfamily}`} href={data[5].link} aria-label={data[5].text} data-icid={data[5].text}>{data[5].text}<Caret /></CtaLink>
      </DesktopCtaContainerLine>
    </React.Fragment>
  );
};

const tabletCta = (cdata, fontfamily) => {
  if (cdata.length === 7) {
    return sevenCtas(cdata, fontfamily);
  } else if (cdata.length === 6) {
    return sixCtas(cdata, fontfamily);
  }
  return null;
};

const CtaSale = ({data}) => {
  const cleanedCta = data.ctas.filter((cta) => cta.text.length > 0);
  const fontfamily = data.font_family;
  return (
    <CtaContainer mobilehide={data.hide_mobile}>
      {desktopCta(cleanedCta, fontfamily)}
      {tabletCta(cleanedCta, fontfamily)}
    </CtaContainer>
  );
};

export default CtaSale;
