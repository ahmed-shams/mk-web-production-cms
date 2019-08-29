import React from 'react';
import PropTypes from "prop-types";
import TypeContainer from './type-container/index';
import InnerContainer from './type-container/inner-container';
import TextContent from './text-content/index';
import CtaSale from './text-content/cta/sale';
import CtaEu from './text-content/cta/sale-eu';

const Text = ({info}) => {
  const { ctaSale, ctaDefault, type_wrapper, ctaHoliday } = info;
  return (
    <React.Fragment>
      <TypeContainer text_align={type_wrapper.text_align} wrapper_align={type_wrapper.wrapper_align} color={type_wrapper.color} paddingtop={type_wrapper.padding.top} paddingbottom={type_wrapper.padding.bottom} mobile_left_to_center={type_wrapper.mobile_left_to_center} toi={type_wrapper.textStyle !== undefined ? type_wrapper.textStyle : undefined} holiday={ ctaHoliday }>
        <InnerContainer desktopwidthprop={type_wrapper.caption_width_desktop} tabletwidthprop={type_wrapper.caption_width_tablet} mobilewidthprop={type_wrapper.caption_width_mobile}>
          <TextContent info={info} />
          { ctaSale && <CtaSale data={ctaSale} />}
          { (ctaDefault && ctaDefault.isEU) && <CtaEu data={ctaDefault} />}
        </InnerContainer>
      </TypeContainer>
    </React.Fragment>
  );
};

export default Text;


Text.propTypes = {
  info: PropTypes.object.isRequired
};
