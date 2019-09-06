import React, { Component } from 'react';
import CompContainer from 'components/basic/edx/global/comp-container';
import Text from 'components/basic/edx/global/text';
import { GiftService } from './components';
const getTextHtml = (textOption, index) => {
  return (
    <div key={index} className="giftServiceContent">
      <Text info={textOption} />
    </div>
  );
};
const getHTML = (data) => {
  let { textOptions } = data;
  if (textOptions == null || !Array.isArray(textOptions)) textOptions = [];
  const htmls = [];
  textOptions.forEach((textOption, index) => {
    const imgHtml = textOption ? getTextHtml(textOption, index) : null;
    htmls.push(imgHtml);
  });
  return htmls;
};
const getCta = (ctaOption) => {
  return (
    <div className="learnMore--ctas">
      <Text info={ctaOption} />
    </div>
  );
};
class GiftServices extends Component {
  constructor(props) {
    super(props);
    this.renderHtml = this.renderHtml.bind(this);
  }
  renderHtml(data) {
    return (
      <GiftService bgcolor={data.backgroundOptions !== undefined ? data.backgroundOptions.color : undefined } bgimg={data.backgroundOptions !== undefined ? data.backgroundOptions.image : undefined} className="componentGiftServices">
        <div className="giftService">
          <div className="giftServiceContainer row">
            {getHTML(data)}
          </div>
        </div>
        {getCta(data.learnMoreOption)}
      </GiftService>
    );
  }
  render() {
    if (!this.props.data) {
      return null;
    }
    const { data } = this.props;
    return (
      <CompContainer infos={data}>
        {this.renderHtml(data)}
      </CompContainer>
    );
  }
}

export default GiftServices;
