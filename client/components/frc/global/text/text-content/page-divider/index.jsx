import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import CompContainer from '../../../comp-container';
import TextBox from '../../components/index';

class PageDivider extends Component {
  getLine(dHeader) {
    if (dHeader.link) {
      return (
        <a href={dHeader.link}
          data-icid={dHeader.data_icid}
          aria-hidden={dHeader.aria_hidden}
          aria-label={dHeader.aria_label}
          tabIndex={dHeader.tabindex}>
          <DividerStyle lineHeader={dHeader.text} borderColor={dHeader.border_color} hcolor={dHeader.color} bgColor={dHeader.bgColor} />
        </a>
      );
    } else {
      return (
        <DividerStyle lineHeader={dHeader.text} borderColor={dHeader.border_color} hcolor={dHeader.color} bgColor={dHeader.bgColor} />
      );
    }
  }
  render() {
    const { data } = this.props;
    if (!data) {
      return null;
    }
    const dividerOptions = data.dividerOptions;
    const dWrapper = dividerOptions.divider_wrapper;
    const dHeader = dividerOptions.divider_header;
    if (!dWrapper || !dHeader) return null;
    const html = (
      <PageDividerContainer
          desktopWidth={dWrapper.width_desktop}
          tabletWidth={dWrapper.width_tablet}
          mobileWidth={dWrapper.width_mobile}
          className={dHeader.fontfamily}
          bgColor={dHeader.bgColor}>
         {dHeader && this.getLine(dHeader)}
      </PageDividerContainer>
    );
    if (!this.props.contained) return html;
    return (
      <CompContainer infos={data} >
        {html}
      </CompContainer>
    );
  }
}

export default PageDivider;

const PageDividerContainer = styled(TextBox.withComponent('div'))`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  color: #00000;
  background: ${props => (props.bgColor ? props.bgColor : '#FFFFFF')};
  ${props => props.desktopWidth !== undefined && css`
    width: ${props => props.desktopWidth};
  `}
  ${props => props.tabletWidth !== undefined && css`
    @media (max-width: 1024px) {
      width: ${props => props.tabletWidth};
    }
  `}
  ${props => props.mobileWidth !== undefined && css`
    @media (max-width: 768px) {
      width: ${props => props.mobileWidth};
    }
  `}
  a {
    width: 100%;
    min-height: 1.5rem;
    padding-top: 3px;
    margin-bottom: 1px;
  }
`;
const DividerStyle = styled.div`
  width: 100%;
  text-align: center;
  min-height: 1.5rem;
  margin-top: 2px;
  &:before {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    content: '' !important;
    border-bottom: solid 1px ${props => (props.borderColor ? props.borderColor : '#AAACAE')};
    margin: .7rem auto -.7rem;
  }
  &:after {
    color: ${props => (props.hcolor ? props.hcolor : '#000000')};
    background: ${props => (props.bgColor ? props.bgColor : '#FFFFFF')};
    content: "${props => (props.lineHeader ? props.lineHeader : '')}";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: auto;
    width: auto;
    ${props => props.lineHeader !== undefined && props.lineHeader !== "" && css`
      padding: 0 30px;
    `}
    margin: 0;
    white-space: nowrap;
  }
`;
