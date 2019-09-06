import React from 'react';
import Styled from 'styled-components';
import Carousel from 'components/basic/edx/global/carousel';
import CompContainer from 'components/basic/edx/global/comp-container';

const Debug = false;

class LookbackCarousel extends Carousel {

  // Controller Life Cycle

  constructor(props) {
    super(props);
    if (Debug) console.log(`|Lookback-Carousel| did initialized`);
  }

  render() {
    if (Debug) console.log(`|Lookback-Carousel| did render`);
    const carouselHTML = this.htmlComponents();
    const hidden = this.state.hidden ? "true" : "false";
    const className = this.state.hidden ? "component componentLookbook initialized fadeout" : "component componentLookbook initialized";
    const html = (
      <Section className="mkwpdev mkwp" id="lookbook-modal-wrapper" aria-hidden={hidden} >
        <div className={className}>
          <div className="lookbook-wrapper" aria-modal="true" role="dialog" aria-hidden={hidden}>
            <div id="lookbook-index">{carouselHTML.ccd.pageText}</div>
            {carouselHTML.close}
            <div className="type-wrapper" id="lookbook-text">
              <h2 className="type-lookbook-title">{carouselHTML.ccd.title}</h2>
              <p className="type-lookbook-detail"></p>
            </div>
            <div className="carousel slick-initialized slick-slider-mk" id="mk-slider">
              {carouselHTML.prev}
              {carouselHTML.next}
              {carouselHTML.main}
            </div>
          </div>
        </div>
      </Section>
    );
    if (!this.props.full) return html;
    return (
      <CompContainer infos={this.props.data}>
          {html}
      </CompContainer>
    );
  }
}

const Section = Styled.section`
  padding-top: 0px;
  padding-bottom: 0px;
  margin-top: 0px;
`;

export default LookbackCarousel;
