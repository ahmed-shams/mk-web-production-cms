import React, { Component } from 'react';
import Carousel from './carousel';
import { CustomButtonPrev, CustomButtonNext, CarouselContainer } from './components';
import CompContainer from '../../global/comp-container';
import Text from '../../global/text';
import Image16x9 from '../../global/image/plain';
import Slug from '../../global/text/text-content/slug';
const getIndex = (data) => {
  let copyIndex = 0;
  const imageOptions = (typeof data.topBanner.imageOptions === "undefined") ? [] : data.topBanner.imageOptions;
  imageOptions.forEach((imageOption, index) => {
    if (imageOption.textInfo && imageOption.active_category) {
      copyIndex = index;
    }
  });
  return copyIndex;
};
class TopBannerCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultIndex: getIndex(this.props.data)
    };
  }
  getTitleHTML(index, imageOption, categoryUrl) {
    const textInfo = imageOption.textInfo;
    textInfo.texts[0].link = textInfo.texts[0].link ? textInfo.texts[0].link : categoryUrl;
    const infos = Object.assign({}, { type_wrapper: textInfo.type_wrapper }, { texts: textInfo.texts });
    return (
      <div key={`caption${index}`} className="gallery--picture banner--desc">
        <div className="banner-text">
          <Text info={infos} />
        </div>
      </div>
    );
  }
  getImageHTML(index, imageOption, categoryUrl, filterIds) {
    const linkUrl = categoryUrl + filterIds[index];
    imageOption.imgInfo.link_url = imageOption.imgInfo.link_url ? imageOption.imgInfo.link_url : linkUrl;
    imageOption.textInfo.slug.link = imageOption.textInfo.slug.link ? imageOption.textInfo.slug.link : linkUrl;
    const image = Object.assign({}, { analyticsId: imageOption.analyticsId }, { imgSrc: imageOption.imgSrc }, { imgInfo: imageOption.imgInfo });
    const aCategory = imageOption.active_category ? "slide-border" : "";
    return (
      <div key={index} className={`gallery--picture ${aCategory}`}>
        <Image16x9 info={image} />
        <div className="type-wrapper text-center" >
          {imageOption.textInfo && <Slug data={imageOption.textInfo.slug} />}
        </div>
      </div>
    );
  }
  getBanner(data) {
    const topBanner = data.topBanner;
    const imageHtml = [];
    let headerHtml;
    const imageOptions = (typeof topBanner.imageOptions === "undefined") ? [] : topBanner.imageOptions;
    const filterIds = (typeof topBanner.filter_ids === "undefined") ? [] : topBanner.filter_ids;
    const categoryUrl = (typeof topBanner.category_url === "undefined") ? "" : topBanner.category_url;
    imageOptions.forEach((imageOption, index) => {
      if (imageOption.textInfo && (imageOption.default || imageOption.active_category)) {
        headerHtml = this.getTitleHTML(index, imageOption, categoryUrl);
      }
      if (imageOption.textInfo && imageOption.imgInfo) {
        const imgHtml = this.getImageHTML(index, imageOption, categoryUrl, filterIds);
        imageHtml.push(imgHtml);
      }
    });
    imageHtml.unshift(headerHtml);
    return (imageHtml);
  }
  renderBanner(data) {
    if (data) {
      return (
        <CarouselContainer>
          <Carousel
            duration={400}
            nextButton={<CustomButtonNext />}
            prevButton={<CustomButtonPrev />}
            defaultIndex={this.state.defaultIndex}
            render={() => this.getBanner(data)} />
        </CarouselContainer>
      );
    }
    return null;
  }
  render() {
    const { data } = this.props;
    return (
      <CompContainer infos={this.props.data}>
        {this.renderBanner(data)}
      </CompContainer>
    );
  }
}

export default TopBannerCarousel;
