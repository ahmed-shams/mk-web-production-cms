import React from 'react';
import ImageContent from '../image-content/index';
import LazyLoadImage from '../lazy-load-image';
import Disclamer from '../../text/text-content/disclaimer/index';
import Text from '../../text/index';
import styled from 'styled-components';

const ImageContainer = styled.div`
  display: block;
  width: 100%;
`;

const DefaultComp = ({ info }) => {
  const { textInfo, textTheme } = info;
  const lazyload = (info.lazyload === undefined) ? true : info.lazyload;

  if (textTheme !== undefined) {
    textInfo.type_wrapper.textStyle = textTheme;
  }
  return (
    <React.Fragment>
      <ImageContainer>
        {lazyload ? <LazyLoadImage info={info} /> : <ImageContent info={info} />}
        {info.disclaimer && <Disclamer data={info.disclaimer} />}
      </ImageContainer>
      {textInfo && <Text info={textInfo} />}
    </React.Fragment>
  );
};

export default DefaultComp;
