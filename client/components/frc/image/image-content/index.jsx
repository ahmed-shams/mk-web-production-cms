import React from 'react';
import styled from 'styled-components';

const ImageLink = styled.a`
  width: 100%;
  cursor: pointer;
`;

const ImageComp = ({src}) => {
  return (
    <picture className="gallery--picture">
      <source srcSet={src.desktop} media="(min-width:1025px)" />
      <source srcSet={src.tablet} media="(min-width:768px)" />
      <source srcSet={src.mobile} media="(max-width:767px)" />
      <img src={src.mobile} draggable="false" alt={src.alt} />
    </picture>
  );
};

const ImageContent = ({ info }) => {
  const { imgSrc, imgInfo } = info;
  if (imgInfo && imgInfo.link_url) {
    return (
      <ImageLink href={imgInfo.link_url} data-icid={imgInfo.data_icid} aria-hidden={imgInfo.aria.hidden} aria-label={imgInfo.aria.hidden ? '' : imgInfo.aria.label } tabIndex={imgInfo.tabindex}>
        <ImageComp src={imgSrc} />
      </ImageLink>
    );
  }
  return (
    <div data-icid={imgInfo.data_icid} aria-hidden={imgInfo.aria.hidden} aria-label={imgInfo.aria.hidden ? '' : imgInfo.aria.label } tabIndex={imgInfo.tabindex}>
      <ImageComp src={imgSrc} />
    </div>);
};

export default ImageContent;
