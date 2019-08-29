import React from 'react';
import { TypeDivider } from './typedivider/index';
import GlobalText from './global-text/index';
import Slug from './slug/index';
import CtaDefault from './cta/default';
import PropTypes from "prop-types";
import CtaHoliday from './cta/holiday';

const TextContent = ({info}) => {
  const { slug, ctaDefault, typedivider, texts, ctaHoliday } = info;
  return (
    <React.Fragment>
      { (slug && slug.text.length > 0) && <Slug data={slug} /> }
      { typedivider && <TypeDivider />}
      { (texts && texts.length > 0) && <GlobalText data={texts} /> }
      { (ctaDefault && !ctaDefault.isEU) && <CtaDefault data={ctaDefault} /> }
      { ctaHoliday && <CtaHoliday data={ctaHoliday} /> }
    </React.Fragment>
  );
};

export default TextContent;

TextContent.propTypes = {
  info: PropTypes.object.isRequired,
  slug: PropTypes.object,
  headline: PropTypes.object,
  body: PropTypes.object,
  cta1: PropTypes.object,
  cta2: PropTypes.object,
  typedivider: PropTypes.bool
};
