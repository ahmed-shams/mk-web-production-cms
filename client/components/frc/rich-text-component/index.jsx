import React, {Component} from 'react';
// import {sanitizeHTML} from 'service/security';
import SimpleGallery from '../banner/simple-gallery';
// import YouTubeVideoPlay from '../edx/video/youtube-video';
import HtmlVideoPlay from '../video/html-video';
import Video4by5 from '../video/video4by5';
// /* eslint-enable */
// import Json from './json.jsx'; // eslint-disable-line
import ArrowButton from '../global/button/arrow';
import CloseButton from '../global/button/close';
import Resize from '../global/resize';
import Modal from '../global/modal';
import Grid from '../global/grid';
import Carousel from '../global/carousel';
import DefaultBanner from '../banner/banner16by9';
import Countdown from '../flagship/countdown';
import Lookback from '../flagship/lookback';
import Columns from '../columns';
import YouTubeVideoPlay from '../video/youtube-video';
import LookbackCarousel from '../flagship/lookback-carousel';
// import Columns4by5 from '../flagship/columns4by5';
import ParallaxFixedParagraph from '../parallax/parallax-fixed-Paragraph';
import ParallaxFixedBackground from '../parallax/parallax-fixed-background';
// import TestMockData from '../global/test-mock-data';
import Parallax4by5EvenLeft from '../parallax/parallax4by5-evenleft';
import PageDivider from '../global/text/text-content/page-divider';
import DkNavigation from '../banner/dk-navigation';
import GiftServices from '../flagship/gift-services';
import TopBanner from '../banner/topbanner';
import TopBannerCarousel from '../banner/topbanner-carousel';
import MwRunway from '../michaels-world/mw-runway';
import MwTravelDiaries from '../michaels-world/mw-travel-diaries';
import LookBook from '../michaels-world/lookBook';

class RichTextComponent extends Component {



  renderJSONComponents(dataObj, isMobile, key, ref) {
    const compsArr = [];
    dataObj.forEach((compObj, i) => {
      if (key) i = key + i;
      switch (compObj.componentId) {
        case 'banner16by9':
          compsArr.push(<DefaultBanner data={compObj} key={i} contained />);
          break;
        case 'arrowButton':
          compsArr.push(<ArrowButton data={compObj} key={i} />);
          break;
        case 'closeButton':
          compsArr.push(<CloseButton data={compObj} key={i} />);
          break;
        case 'resize':
          compsArr.push(<Resize data={compObj} key={i} />);
          break;
        case 'countdown':
          compsArr.push(<Countdown data={compObj} key={i} />);
          break;
        case 'modal':
          compsArr.push(<Modal data={compObj} isMobile={isMobile} key={i} />);
          break;
        case 'grid':
          compsArr.push(<Grid data={compObj} isMobile={isMobile} key={i} />);
          break;
        case 'lookback':
          compsArr.push(<Lookback data={compObj} isMobile={isMobile} key={i} />);
          break;
        case 'carousel':
          compsArr.push(<Carousel data={compObj} ref={ref} isMobile={isMobile} key={i} />);
          break;
        case 'columns':
          compsArr.push(<Columns data={compObj} isMobile={isMobile} key={i} />);
          break;
        case 'youTubeVideo':
          compsArr.push(<YouTubeVideoPlay data={compObj} key={i} />);
          break;
        case 'htmlVideo':
          compsArr.push(<HtmlVideoPlay data={compObj} key={i} />);
        break;
        case 'video4by5':
          compsArr.push(<Video4by5 data={compObj} key={i} />);
          break;
        case 'testMockData':
          compsArr.push(<TestMockData data={compObj} isMobile={isMobile} key={i} />);
          break;
        case 'banner4by5':
          compsArr.push(<DefaultBanner data={compObj} key={i} contained />);
          break;
        case 'toi':
          compsArr.push(<DefaultBanner data={compObj} key={i} contained />);
          break;
        case 'parallax4by5EvenLeft':
          compsArr.push(<Parallax4by5EvenLeft data={compObj} key={i} />);
          break;
        case 'parallaxFixedParagraph':
          compsArr.push(<ParallaxFixedParagraph data={compObj} key={i} />);
          break;
        case 'parallaxFixedBackground':
          compsArr.push(<ParallaxFixedBackground data={compObj} key={i} />);
          break;
        case 'simpleGallery':
          compsArr.push(<SimpleGallery sliderIndex={i} data={compObj} key={i} />);
          break;
        case 'pageDivider':
          compsArr.push(<PageDivider data={compObj} key={i} contained />);
          break;
        case 'dk-navigation':
          compsArr.push(<DkNavigation data={compObj} key={i} />);
          break;
        case 'giftServices':
          compsArr.push(<GiftServices data={compObj} key={i} />);
          break;
        case 'topBanner':
          compsArr.push(<TopBanner data={compObj} key={i} />);
          break;
        case 'topBannerCarousel':
          compsArr.push(<TopBannerCarousel data={compObj} key={i} />);
          break;
        case 'mwRunway':
          compsArr.push(<MwRunway data={compObj} key={i} />);
          break;
        case 'mwTravelDiaries':
          compsArr.push(<MwTravelDiaries data={compObj} key={i} />);
          break;
        case 'lookBook':
          compsArr.push(<LookBook data={compObj} key={i} />);
          break;
        default:
      }
    });
    return compsArr;
  }
  render() {
    let payload = this.props.payload || '';
    // let payload = Json;
    const {tagType,
      cssClass,
      cartridgeIndex,
      linkContainer,
      catridgeType,
      catridgeLayout, linkTitleOverride} = this.props;

      return (
            <div className="page-level-mkwpdev">
              {this.renderJSONComponents(payloadObj)}
            </div>
            );


    return null;
  }
}


export default RichTextComponent;
