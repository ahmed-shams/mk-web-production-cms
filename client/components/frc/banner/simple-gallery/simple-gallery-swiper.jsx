import React from 'react';
import Swiper from 'react-id-swiper/lib/custom.js';
import './gallery.css';
class SwiperSimpleGallery extends React.Component {
  constructor(props) {
    super(props);
    this.swiper = null;
    this.adaFix = this.adaFix.bind(this);
    this.setHeaderClassList = this.setHeaderClassList.bind(this);
    this.setClientWidth = this.setClientWidth.bind(this);
    this.swapNavBtn = this.swapNavBtn.bind(this);
    this.addFade = this.addFade.bind(this);
    this.removeFade = this.removeFade.bind(this);
    this.getPagination = this.getPagination.bind(this);
    this.state = {
      swiper: this.swiper,
      w: this.setClientWidth()
    };
  }
  setClientWidth() {
    let clientWidthVal;
    if (typeof window !== 'undefined' && window.innerWidth) {
      clientWidthVal = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }
    return clientWidthVal;
  }
  setHeaderClassList(item) {
    const allHeadlines = [...item.querySelectorAll(".slider-image-headline")];
    allHeadlines.map((headline) => {
      const typeHeadLine = (this.state.w > 767) ? 'type-headline-mmk-2' : 'type-cta-1';
      return headline.classList.add(typeHeadLine);
    });
  }
  getPagination(sliderIndex) {
    return this.state.w > 767 ? {
      el: ".swiper-pagination.swiper-pagination-" + sliderIndex,
      type: "fraction",
      renderFraction: (currentClass, totalClass) => {
        return '<span class="' + currentClass + '"></span>' +
          ' of ' +
          '<span class="' + totalClass + '"></span>';
      }
    } : {
        el: ".swiper-pagination.swiper-pagination-" + sliderIndex,
        type: "fraction",
        renderFraction: (currentClass, totalClass) => {
          return '<span class="' + currentClass + '"></span>' +
            ' / ' +
            '<span class="' + totalClass + '"></span>';
        }
      };
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
  addFade(slides) {
    const slidesDOM = Array.from(Object.values(slides));
    slidesDOM.forEach(item => {
      if (item.classList && this.state.w > 767) {
        const toBeFadeDom = [...item.querySelectorAll('.picture-container, .text-container')];
        toBeFadeDom.map((toBeFade) => {
          return toBeFade.classList.add('fade');
        });
      }
    });
  }
  removeFade(slides) {
    const slidesDOM = Array.from(Object.values(slides));
    slidesDOM.forEach(item => {
      if (item.classList && this.state.w > 767 && item.classList.contains("swiper-slide-active")) {
        const removeFadeDom = [...item.querySelectorAll('.picture-container, .text-container')];
        removeFadeDom.map((removeFade) => {
          return removeFade.classList.remove('fade');
        });
      }
    });
  }
  adaFix(slides) {
    const slidesDOM = Array.from(Object.values(slides));
    slidesDOM.forEach(item => {
      if (item.classList) {
        if (item.classList.contains("swiper-slide-active")) {
          const links = [...item.querySelectorAll("a, .info-btn")];
          links.map((link) => {
            link.setAttribute('aria-hidden', false);
            link.setAttribute('tabindex', 0);
            return link;
          });
        } else {
          const links = [...item.querySelectorAll("a, .info-btn")];
          links.map((link) => {
            link.setAttribute('aria-hidden', true);
            link.setAttribute('tabindex', -1);
            return link;
          });
        }
        this.setHeaderClassList(item);
      }
    });
  }
  render() {
    const { duration, nextButton, prevButton, sliderIndex } = this.props;
    const { w } = this.state;
    const fadeOption = w > 767 ? 'fade' : '';
    const thisObject = this; // reference to react component
    const params = {
      slidesPerView: 1,
      speed: duration,
      allowSlideNext: true,
      allowSlidePrev: true,
      autoHeight: true,
      keyboard: {
        enabled: true,
        onlyInViewport: false
      },
      effect: fadeOption,
      on: {
        init() {
          thisObject.adaFix(this.slides);
          thisObject.swapNavBtn(this.navigation);
          thisObject.addFade(this.slides);
          thisObject.removeFade(this.slides);
        },
        slideChangeTransitionStart: () => {
          thisObject.addFade(this.swiper.slides);
        },
        slideChangeTransitionEnd: () => {
          thisObject.removeFade(this.swiper.slides);
        }
      },
      pagination: thisObject.getPagination(sliderIndex),
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      renderPrevButton: () => ({
        ...prevButton,
        props: {
          ...prevButton.props,
          className: "swiper-button-prev",
          onKeyPress: event => this.handleKeyPress(event),
          onClick: () => {
            this.swiper.slideTo(this.swiper.activeIndex);
          }
        }
      }),
      renderNextButton: () => ({
        ...nextButton,
        props: {
          ...nextButton.props,
          className: "swiper-button-next",
          onKeyPress: event => this.handleKeyPress(event),
          onClick: () => {
            this.swiper.slideTo(this.swiper.activeIndex);
          }
        }
      })
    };

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

export default SwiperSimpleGallery;
