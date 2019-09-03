import React, { Component } from 'react';
import SwiperSimpleGallery from './simple-gallery-swiper';
import { StyledSwipe, Inner, CustomButtonPrev, CustomButtonNext, SimpleGalleryContainer } from './components';
import CompContainer from '../../global/comp-container';
import SimpleGalleryModal from './gallery-modal';
import Text from '../../global/text';
import Image16x9 from '../../global/image/plain';
import Slug from '../../global/text/text-content/slug';
const getImage = (image) => {
  return (
    <div className="picture-container small-12 medium-6 large-6">
      <Image16x9 info={image} />
    </div>
  );
};
class SimpleGallery extends Component {
  constructor(props) {
    super(props);
    this.state = { modalState: false, selectedPayload: null, sliderIndex: this.props.sliderIndex};
    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.renderSlideModal = this.renderSlideModal.bind(this);
  }
  getslider(slider) {
    const imageObj = Object.assign({}, { analyticsId: slider.analyticsId }, { imgSrc: slider.imgSrc }, { imgInfo: slider.imgInfo });
    const sliderIndex = this.state.sliderIndex;
    return (
      <React.Fragment>
        <div className="small-12 mobile-pagination-container show-for-mobile">
          <span className={`swiper-pagination swiper-pagination-${sliderIndex} type-copy-gotham-deck`}></span>
        </div>
        {getImage(imageObj)}
        <div className="text-container small-12 medium-6 large-6">
          <div className="text-wrapper">
            <div className={`swiper-pagination swiper-pagination-${sliderIndex} hide-mobile-only type-copy-gotham-deck`}></div>
            <div className="text-subwrapper">
              <div className="hide-mobile-only"><Text info={slider.textInfo} /></div>
              <div className="show-for-mobile slider-image-headline">{slider.textInfo.slug ? <Slug data={slider.textInfo.slug} /> : ""}
                {this.sliderIconGenerate(slider)}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  getGalleySlide(slider) {
    if (slider) {
      if (slider.sliderInfo && slider.sliderInfo.link_url) {
        return (
          <div className="simpleGalleryContent">
            <a href={slider.sliderInfo.link_url} className="sliderWrapper outer row" data-icid={slider.sliderInfo.data_icid} aria-hidden={slider.sliderInfo.aria.hidden} aria-label={slider.sliderInfo.aria.hidden ? '' : slider.sliderInfo.aria.label} tabIndex={slider.sliderInfo.tabindex}>
              {this.getslider(slider)}
            </a>
          </div>
        );
      }
      return (
        <div className="simpleGalleryContent">
          <div className="sliderWrapper outer row" data-icid={slider.sliderInfo.data_icid} aria-hidden={slider.sliderInfo.aria.hidden} aria-label={slider.sliderInfo.aria.hidden ? '' : slider.sliderInfo.aria.label} tabIndex={slider.sliderInfo.tabindex}>
            {this.getslider(slider)}
          </div>
        </div>
      );
    }
    return null;
  }
  activateModal(e, slider) {
    e.preventDefault();
    this.setState({ modalState: true, selectedPayload: slider });
  }
  deactivateModal() {
    this.setState({ modalState: false });
  }
  sliderIconGenerate(slider) {
    const moreInfo = this.props.data.moreInfo_icon;
    if (slider) {
      return (<img id="simple-c-info-icon" className="info-btn" role="button" src={moreInfo.src} alt={moreInfo.alt} tabIndex="0" aria-hidden="false" aria-label={`More information about ${slider.textInfo.slug ? slider.textInfo.slug.text : ""}`} onClick={(e) => this.activateModal(e, slider)} />);
    }
    return null;
  }
  createContent(data) {
    if (data) {
      const sliders = data.sliders;
      return (
        sliders.map((slider, i) => {
          return (
            <StyledSwipe key={i}>
              <Inner sliderInfo={slider.sliderInfo ? slider.sliderInfo : ""} >
                {this.getGalleySlide(slider)}
              </Inner>
            </StyledSwipe>
          );
        })
      );
    }
    return null;
  }
  renderSlideModal() {
    return (<SimpleGalleryModal selectedPayload={this.state.selectedPayload} mounted={this.state.modalState} onExit={this.deactivateModal} deactivateModal={this.deactivateModal} />);
  }
  renderSlider(data) {
    if (data) {
      return (
        <SimpleGalleryContainer>
          <SwiperSimpleGallery
            duration={400}
            nextButton={<CustomButtonNext />}
            prevButton={<CustomButtonPrev />}
            sliderIndex={this.state.sliderIndex}
            render={() => this.createContent(data)} />
        </SimpleGalleryContainer>
      );
    }
    return null;
  }
  render() {
    const { data } = this.props;
    return (
      <CompContainer infos={this.props.data}>
        <div className="small-12">
          {this.renderSlider(data)}
          {this.renderSlideModal()}
        </div>
      </CompContainer>
    );
  }
}

export default SimpleGallery;
