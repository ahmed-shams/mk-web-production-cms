import React from 'react';
import Styled from 'styled-components';
import Image16x9 from 'components/basic/edx/global/image/plain';
import Columns from 'components/basic/edx/flagship/columns';
import ArrowButton from 'components/basic/edx/global/button/arrow';
import CloseButton from 'components/basic/edx/global/button/close';
import NavigationDots from 'components/basic/edx/global/navigation-dots';
import CompContainer from 'components/basic/edx/global/comp-container';

const Debug = false;

const slideHTML = (info) => {
  const array = [];
  Object.keys(info.objects).forEach((index) => {
    let object = info.objects[index];
    Object.assign(object, {lazyload: false});
    let html = null;
    if (info.hasColumns) {
      const data = {};
      data.imageOptions = object;
      data.columnsNoSidePadding = true;
      html = (
        <Picture info={info} aria-hidden={info.hidden} key={(index + 5000)} >
          <Columns data={data} isMobile={info.isMobile} notcontained />
        </Picture>
      );
    } else {
      html = (
        <Picture info={info} aria-hidden={info.hidden} key={(index + 5000)} >
          <Image16x9 info={object} />
        </Picture>
      );
    }
    array.push(html);
  });
  return array;
};

const closeHTML = (info) => {
  const closeButtonSize = info.isMobile ? 'small' : 'large';
  const data = {
    componentId: 'closeButton',
    onClick: info.actions.close,
    closeButtonSize
  };
  return (
    <Close isMobile={info.isMobile}>
      <CloseButton data={data} />
    </Close>
  );
};

const sideBannerHTML = (info, direction) => {
  if (info.isMobile
    || info.theme !== 'lookback'
    || direction !== 'right') return null;
  const line1 = (
    <SideBanner>
      <PageText isMobile={info.isMobile}>{info.pageText}</PageText>
      {closeHTML(info)}
    </SideBanner>
  );
  const line2 = <Title isMobile={info.isMobile}>{info.title}</Title>;
  return [
    line1,
    line2
  ];
};

const arrowHTML = (type, info) => {
  if (!info.showButtons) return null;
  const action = type === 'prev' ? info.actions.prev : info.actions.next;
  const direction = type === 'prev' ? 'left' : 'right';
  const hideOnBlur = info.hasColumns;
  const block = info.isMobile;
  let arrow = null;
  if (action != null) {
    const data = {
      componentId: 'arrowButton',
      onClick: action,
      hideOnBlur,
      direction,
      block
    };
    arrow = <ArrowButton data={data} />;
    if (Debug) console.log(`|CarouselHTML| adding |${direction}| block: |${block}| arrow`);
  }
  if ((info.isMobile && !info.hasColumns) || (info.isMobile && info.theme === "columns4")) {
    return (
      <ArrowMobile direction={direction} >
        {arrow}
      </ArrowMobile>
    );
  }
  const sideBanner = sideBannerHTML(info, direction);
  return (
    <Arrow className={type} hasColumns={info.hasColumns}>
      {sideBanner}
      {arrow}
    </Arrow>
  );
};

const topBannerHTML = (info) => {
  if (info.isMobile
    && info.theme === 'lookback') {
    return (
      <TopBanner>
        <PageText isMobile={info.isMobile}>{info.pageText}</PageText>
        <Title isMobile={info.isMobile}>{info.title}</Title>
        {closeHTML(info)}
      </TopBanner>
    );
  }
  return null;
};

const dotsHTML = (info) => {
  if (!info.hasDots) return null;
  return <NavigationDots info={info} />;
};

const mainHTML = (info) => {
  const topBanner = topBannerHTML(info);
  const dots = dotsHTML(info);
  const actions = info.actions;
  const carouselHTML = (
    <CarouselDiv isMobile={info.isMobile}>
      {topBanner}
      <SlickList>
        <Swiper onMouseOut={actions.mouseout} onMouseDown={actions.mousedown} onMouseMove={actions.mousemove} onMouseUp={actions.mouseup} />
        <Carousel info={info}>
          {slideHTML(info)}
        </Carousel>
      </SlickList>
      {dots}
    </CarouselDiv>
  );
  return carouselHTML;
};

const CarouselHTML = ({info}) => {
  const main = mainHTML(info);
  const prevArrow = arrowHTML('prev', info);
  const nextArrow = arrowHTML('next', info);
  const internalComponents = [prevArrow, main, nextArrow];
  return (
    <CompContainer infos={info.compInfo}>
      <ContainerDiv>
        {internalComponents}
      </ContainerDiv>
    </CompContainer>
  );
};

export default CarouselHTML;

const Picture = Styled.picture`
  display: block;
  float: left;
  position: relative;
  width: calc(100% * (1 / ${props => props.info.slides}));
`;

const SideBanner = Styled.div`
  position: absolute;
  top: 0px;
`;

const TopBanner = Styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  justify-content: space-between;
  display: flex;
`;

const PageText = Styled.div`
  position: ${props => (props.isMobile ? 'inherit' : 'absolute')};
  padding-top: ${props => (props.isMobile ? 15 : 12)}px;
  font-family: "Gotham 3R", "Gotham Light";
  font-size: ${props => (props.isMobile ? 12 : 16)}px;
`;

const Title = Styled.div`
  position: ${props => (props.isMobile ? 'inherit' : 'absolute')};
  top: ${props => (props.isMobile ? 'inherit' : '70px')};
  padding-left: ${props => (props.isMobile ? 20 : 0)}px;
  padding-top: ${props => (props.isMobile ? 15 : 0)}px;
  font-family: ${props => (props.isMobile ? '"Gotham 3R", "Gotham Light"' : '"Gotham 5R", "Gotham Medium"')};
  font-size: ${props => (props.isMobile ? 12 : 26)}px;
`;

const Close = Styled.div`
  padding-left: ${props => (props.isMobile ? 0 : 10)}px;
`;

const Arrow = Styled.div`
  height: 100%;
  padding-left: ${props => (props.hasColumns ? 0 : 30)}px;
  padding-right: ${props => (props.hasColumns ? 30 : 60)}px;
  width: 30px;
  z-index: 350;
`;

const ArrowMobile = Styled.div`
  position: absolute;
  bottom: 50%;
  left: ${props => (props.direction === 'left' ? '15px' : 'calc(100% - 45px)')};
  z-index: 350;
`;

const ContainerDiv = Styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;

const CarouselDiv = Styled.div`
  padding-left: ${props => (props.isMobile ? 15 : 0)}px;
  padding-right: ${props => (props.isMobile ? 15 : 0)}px;
`;

const SlickList = Styled.div`
  overflow: hidden;
  position: relative;
`;

const Carousel = Styled.div`
  background: grey;
  opacity: 1;
  position: relative;
  width: calc(100% * ${props => props.info.slides});
  transform: ${props => props.info.transform};
  transition: ${props => props.info.transition};
`;

const Swiper = Styled.div`
  opacity: 0;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 300;
`;
