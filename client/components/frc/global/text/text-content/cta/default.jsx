import React from 'react';
import styled, { css } from 'styled-components';
import TextBox from '../../components/index';

const LinkWrapper = styled(TextBox.withComponent('div'))`
  ${props => props.showmobile === true && css`
    @media (min-width: 768px) {
      display: none;
    }
  `}
`;

const Caret = styled.i`
  display: inline;
  white-space: nowrap;
  line-height: inherit;
  &:before {
    content: "";
    box-sizing: inherit;
  }
  &:after {
    display: inline-block;
    content: '';
    height: 0;
    border-style: solid;
    border-right-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent;
    line-height: 0;
    border-width: .34166em 0 .34166em .34166em;
    position: relative;
    margin-bottom: 0!important;
  }
`;

const CtaDefault = ({ data }) => {
  const { ctas } = data;
  return (
    <React.Fragment>
      {ctas.map((cData, i) => (
        <LinkWrapper className="wpCta" showmobile={cData.show_mobile_only} paddingtop={cData.padding.top} paddingbottom={cData.padding.bottom} key={i}>
          <a href={cData.link} className={`${cData.font_family} cta__no-caret`} aria-label={cData.aria_label} data-icid={cData.data_icid}>{cData.text} <Caret /></a>
        </LinkWrapper>
      ))}
    </React.Fragment>
  );
};

export default CtaDefault;
