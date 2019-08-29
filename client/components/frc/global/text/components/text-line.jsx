import React from 'react';
import TextBox from './index';
import ResizeText from './resize-text';
import styled from 'styled-components';

const TextComponent = ({ data }) => (
  <TextBox className={`${data.fontfamily} ${data.classprop}`} paddingtop={data.padding.top} paddingbottom={data.padding.bottom} color={data.color}>
    {data.html ? <span dangerouslySetInnerHTML={{ __html: data.text }} /> : <ResizeText data={data} /> }
  </TextBox>
);

const SvgComponent = ({ data }) => (
  <TextBox className={`${data.fontfamily} ${data.classprop}`} paddingtop={data.padding.top} paddingbottom={data.padding.bottom} color={data.color}>
    <SvgContainer largedesktop={data.svg.width_desktop_l} smalldesktop={data.svg.width_desktop_s} tablet={data.svg.width_tablet} mobile={data.svg.width_mobile}>
      <picture>
        <source media="(min-width: 768px)" srcSet={data.svg.src_desktop} type="image/svg+xml" />
        <source media="(min-width: 320px)" srcSet={data.svg.src_mobile} type="image/svg+xml" />
        <img src={data.svg.src_desktop} alt="svg" />
      </picture>
    </SvgContainer>
  </TextBox>
);


const SvgContainer = styled.div`
  margin: 0 auto;
  width: ${props => props.mobile};
  @media screen and (min-width: 768px) {
    width: ${props => props.tablet};
  }
  @media screen and (min-width: 1025px) {
    width: ${props => props.smalldesktop};
  }
  @media screen and (min-width: 1268px) {
    width: ${props => props.largedesktop};
  }
`;


const TextLine = ({data}) => {
  const { svg } = data;
  if (data.link && data.link.length > 1) {
    if (typeof svg !== "undefined") {
      return (
        <a href={data.link} data-icid={data.data_icid} aria-hidden={data.aria_hidden} aria-label={data.aria_label} tabIndex={data.tabindex}>
          <SvgComponent data={data} />
        </a>
      );
    } else {
      return (
        <a href={data.link} data-icid={data.data_icid} aria-hidden={data.aria_hidden} aria-label={data.aria_label} tabIndex={data.tabindex}>
          <TextComponent data={data} />
        </a>
      );
    }
  } else {
    if (typeof svg !== "undefined") {
      return <SvgComponent data={data} />;
    } else {
      return <TextComponent data={data} />;
    }
  }
};

export default TextLine;
