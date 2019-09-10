import React from 'react';
import CompContainer from '../../global/comp-container';
import { ComponentHeroBanner } from './components';
import Image16x9 from '../../global/image/plain';
import Text from '../../global/text';
import Slug from '../../global/text/text-content/slug';
class TopBanner extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.renderBanner = this.renderBanner.bind(this);
    this.getCategoryIndex = this.getCategoryIndex.bind(this);
    this.state = {
      activeIndex: null
    };
  }
  componentDidMount() {
    this.getCategoryIndex();
  }
  getCategoryIndex() {
    const filterIds = this.props.data.topBanner.filter_ids ? this.props.data.topBanner.filter_ids : [];
    filterIds.map((filterId, index) => {
      if (typeof window !== 'undefined' && window.location.href.match(filterId)) {
        this.setState({ activeIndex: index + 1 });
      }
      return filterId;
    });
  }
  getTitleHTML(index, imageOption) {
    const textInfo = imageOption.textInfo;
    const infos = Object.assign({}, { type_wrapper: textInfo.type_wrapper }, { texts: textInfo.texts });
    return (
      <div key={index} className="banner-copies">
        <Text info={infos} />
      </div>
    );
  }
  getImageHTML(index, imageOption, categoryUrl, filterIds) {
    const linkUrl = categoryUrl + filterIds[index - 1];
    imageOption.imgInfo.link_url = imageOption.imgInfo.link_url ? imageOption.imgInfo.link_url : linkUrl;
    imageOption.textInfo.slug.link = imageOption.textInfo.slug.link ? imageOption.textInfo.slug.link : linkUrl;
    const image = Object.assign({}, { analyticsId: imageOption.analyticsId }, { imgSrc: imageOption.imgSrc }, { imgInfo: imageOption.imgInfo });
    const aCategory = this.state.activeIndex === index ? "activeCategory" : "";
    return (
      <li key={index} className={aCategory} onMouseEnter={e => this.handleMouseEnter(e)} onMouseLeave={e => this.handleMouseLeave(e)}>
        <Image16x9 info={image} />
        <div className="type-wrapper" >
          {imageOption.textInfo && <Slug data={imageOption.textInfo.slug} />}
        </div>
      </li>
    );
  }
  handleMouseEnter(e) {
    if (this.props.data.topBanner.hover_effect) {
      const curTarget = e.currentTarget;
      curTarget.parentNode.classList.add("mouseHover");
      curTarget.classList.add("active");
    }
  }
  handleMouseLeave(e) {
    if (this.props.data.topBanner.hover_effect) {
      const curTarget = e.currentTarget;
      curTarget.parentNode.classList.remove("mouseHover");
      curTarget.classList.remove("active");
    }
  }
  renderBanner(data) {
    const topBanner = data.topBanner;
    let headerHtml;
    const imageHtml = [];
    const imageOptions = (typeof topBanner.imageOptions === "undefined") ? [] : topBanner.imageOptions;
    const filterIds = (typeof topBanner.filter_ids === "undefined") ? [] : topBanner.filter_ids;
    const categoryUrl = (typeof topBanner.category_url === "undefined") ? "" : topBanner.category_url;
    const gutter = (typeof topBanner.gutter === "undefined") ? true : topBanner.gutter;
    const wide = (typeof topBanner.wide_option === "undefined") ? false : topBanner.wide_option;
    imageOptions.forEach((imageOption, index) => {
      if (imageOption.textInfo && (imageOption.default || this.state.activeIndex === index)) {
        headerHtml = this.getTitleHTML(index, imageOption);
      }
      if (imageOption.textInfo && imageOption.imgInfo) {
        const imgHtml = this.getImageHTML(index, imageOption, categoryUrl, filterIds);
        imageHtml.push(imgHtml);
      }
    });
    return (
      <ComponentHeroBanner className="componentHeroBanner">
        <div className={`heroBannerSlot${imageHtml.length}${wide ? "-wide" : ""}${gutter ? "" : "-noGutter"}`}>
          {headerHtml}
          <ul className={`facets-wrapper${gutter ? "" : "-noGutter"}`}>
            {imageHtml}
          </ul>
        </div>
      </ComponentHeroBanner>
      );
  }
  render() {
    if (!this.props.data) {
      return null;
    }
    const { data } = this.props;
    return (
      <CompContainer infos={data}>
          {this.renderBanner(data)}
      </CompContainer>
    );
  }
}

export default TopBanner;
