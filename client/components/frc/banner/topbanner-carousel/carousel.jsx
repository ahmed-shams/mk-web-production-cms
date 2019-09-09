import React from 'react';
import Swiper from 'react-id-swiper/lib/custom';
import '../simple-gallery/gallery.css';
class Carousel extends React.Component {
  static defaultProps = {
    duration: 400,
    className: 'fade'
  };
  constructor(props) {
    super(props);
    this.swiper = null;
    this.adaFix = this.adaFix.bind(this);
    this.swapNavBtn = this.swapNavBtn.bind(this);
  }
  swapNavBtn(navigation) {
    setTimeout(() => {
      if (navigation.nextEl && navigation.prevEl) {
        const nextBtn = navigation.nextEl;
        const prevBtn = navigation.prevEl;
        const parentContainer = nextBtn.parentNode;
        const nextBtnSib = nextBtn.nextSibling;
        if (nextBtnSib === prevBtn) {
          parentContainer.insertBefore(prevBtn, nextBtn);
        }
      }
    }, 200);
  }
  handleKeyPress(event) {
    if (event.key === " " || event.key === "Enter") {
      this.swiper.slideTo(this.swiper.activeIndex);
    }
  }
  adaFix(slides) {
    const slidesDOM = Array.from(Object.values(slides));
    slidesDOM.forEach(item => {
      if (item.classList) {
        if (item.classList.contains("swiper-slide-active") || item.classList.contains("swiper-slide-duplicate-active")) {
          const links = [...item.querySelectorAll("a")];
          links.map((link) => {
            link.setAttribute('aria-hidden', false);
            link.setAttribute('tabindex', 0);
              return link;
          });
        } else {
          const links = [...item.querySelectorAll("a")];
          links.map((link) => {
            link.setAttribute('aria-hidden', true);
            link.setAttribute('tabindex', -1);
              return link;
          });
        }
      }
    });
  }

  render() {
    const { duration, nextButton, prevButton, defaultIndex } = this.props;
    const thisObject = this; // reference to react component
    const params = {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 12,
      freeMode: true,
      freeModeMomentumRatio: 0.6,
      loop: true,
      speed: duration,
      allowSlideNext: true,
      allowSlidePrev: true,
      initialSlide: defaultIndex,
      runCallbacksOnInit: true,
      keyboard: {
        enabled: true,
        onlyInViewport: false
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      on: {
        init() {
          thisObject.adaFix(this.slides);
          thisObject.swapNavBtn(this.navigation);
        }
      }
    };
    // check if prevButton is passed and add to params
    if (prevButton) {
      params.renderPrevButton = () => ({
        ...prevButton,
        props: {
          ...prevButton.props,
          className: "swiper-button-prev",
          onKeyPress: event => this.handleKeyPress(event),
          onClick: () => {
            this.swiper.slideTo(this.swiper.activeIndex);
            this.swiper.navigation.nextEl.classList.add("swiper-button-disabled");
            this.swiper.navigation.prevEl.classList.add("swiper-button-disabled");
          }
        }
      });
    }
    // check if nextButton is passed and add to params
    if (nextButton) {
      params.renderNextButton = () => ({
        ...nextButton,
        props: {
          ...nextButton.props,
          className: "swiper-button-next",
          onKeyPress: event => this.handleKeyPress(event),
          onClick: () => {
            this.swiper.slideTo(this.swiper.activeIndex);
            this.swiper.navigation.nextEl.classList.add("swiper-button-disabled");
            this.swiper.navigation.prevEl.classList.add("swiper-button-disabled");
          }
        }
      });
    }
    return (
      <Swiper
        {...params}
        ref={node => {
          if (node) {
            this.swiper = node.swiper;
          }
        }}
      >
        {this.props.render()}
      </Swiper>
    );
  }
}

export default Carousel;

