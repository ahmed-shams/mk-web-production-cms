import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import DefaultBanner from '../frc/banner/banner16by9/index.jsx';
import SimpleGallery from '../frc/banner/simple-gallery/index.jsx';
import TopBanner from '../frc/banner/topbanner/index.jsx';
import TopBannerCarousel from '../frc/banner/topbanner-carousel/index.jsx';
import Resize from '../frc/global/resize/index.js';
import PageDivider from '../frc/global/text/text-content/page-divider';
import DkNavigation from '../frc/banner/dk-navigation';
import GiftServices from '../frc/flagship/gift-services';
import MwRunway from '../frc/michaels-world/mw-runway';
import MwTravelDiaries from '../frc/michaels-world/mw-travel-diaries';
import LookBook from '../frc/michaels-world/lookBook';
import ArrowButton from '../frc/global/button/arrow';
import CloseButton from '../frc/global/button/close';
import Modal from '../frc/global/modal';
import Grid from '../frc/global/grid';
import Carousel from '../frc/global/carousel';
import Countdown from '../frc/flagship/countdown';
import Lookback from '../frc/flagship/lookback';
import Columns from '../frc/columns';
import ParallaxFixedParagraph from '../frc/parallax/parallax-fixed-Paragraph';
import ParallaxFixedBackground from '../frc/parallax/parallax-fixed-background';
import YouTubeVideoPlay from '../frc/video/youtube-video';
import HtmlVideoPlay from '../frc/video/html-video';
import Video4by5 from '../frc/video/video4by5';

export const ModalContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  padding-top: 300px;
  top: 0;
  left: 0;
  z-index: 10000;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

export const ModalHeader= styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-bottom: 1px solid lightgrey;
  font-size: 45px;
  font-weight: bold;
  background-color: white;
  color: black;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  height: 200px;
`;

export const ModalHeaderTop= styled.div`
  display: flex;
  justify-content: center;
  font-size: 45px;
  font-weight: bold;
  color: black;
  height: 100px;
  align-items: flex-end;
  width: 100%;
  @media (max-width: 768px) {  
    font-size: 25px;
  }
`;

export const ModalHeaderBottom= styled.div`
  display: flex;
   justify-content: center;
  font-size: 45px;
  font-weight: bold;
  height: 100px;
  color: white;
  align-items: flex-end;
  width: 100%;
  @media (max-width: 768px) {  
    display: none;
  }
`;


export const ModalHeaderNav= styled.ul`
  display: flex; 
  justify-content: center;
  align-items:flex-end;
  color: white;
  margin: 0;
  width: 75%;
`;

export const ModalHeaderNavItem= styled.li`
  display: flex; 
  justify-content: center;
  align-items: center;
  color: black;
  width: 11%;
  font-size: 14px;
  height: 60px;
  @media (max-width: 1024px) {
    font-size: 8px;
  }
`


const CopyHtml = styled.button`
  position: absolute;
  z-index: 999;
  top: 35px;
  left: 25px;
  height: 50px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  border-radius: 5px;
    &:hover {
    cursor: pointer;
  } 
`

export const ModalClose = styled.div`  
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10000;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 50px;
  color: black;

  &:hover {
    cursor: pointer;
  }
`;


const PreviewContentContainer = styled.div`
  position: absolute;
  top: 200px;
`;

export const PreviewContent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const renderJSONComponents = (dataObj, isMobile, key, ref) => {
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

//mk-style.min has css rules that are necessary for proper component rendering i.e. picture>img width: 100%

const ModalPreview = ({ onClose, fileJson }) => {
  const ContentContainer = useRef(null);

  const copyHtml = () => {
    let previewHTML='';
    if(ContentContainer && ContentContainer.current && ContentContainer.current.innerHTML) {
      previewHTML = ContentContainer.current.innerHTML;
    }
    navigator.clipboard.writeText(previewHTML).then(()=>{
      alert('Copying to clipboard was successful');
    }, (e) => {
      alert('error happened while trying to copy json. please try again');
    })
  }

  if(!fileJson) {
    return (
      <ModalContainer>
      <ModalClose onClick={onClose}>X</ModalClose>
    </ModalContainer>
    );
  }; 
  // console.log('in showModal show is ', show);
  // console.log('data ', data);
  console.log('fileJson ', fileJson);
  // console.log('rendering modal ssv ', fileJson);
  if(fileJson) {
    console.log('in if', fileJson);
    // console.log('fileJson ', JSON.parse(fileJson));
  }

  let json = renderJSONComponents(JSON.parse(fileJson.toString()));
  return (
  <div>  
  	<ModalContainer>
      <CopyHtml onClick={copyHtml}>COPY HTML</CopyHtml>
      <ModalHeader>
        <ModalHeaderTop>
          MICHAEL KORS
        </ModalHeaderTop>
        <ModalHeaderBottom>
          <ModalHeaderNav>
            <ModalHeaderNavItem>
              WOMEN
            </ModalHeaderNavItem>
            <ModalHeaderNavItem>
              MEN
            </ModalHeaderNavItem>
            <ModalHeaderNavItem>
              COLLECTION
            </ModalHeaderNavItem>
            <ModalHeaderNavItem>
              HANDBAGS
            </ModalHeaderNavItem>
            <ModalHeaderNavItem>
              WALLETS
            </ModalHeaderNavItem>
            <ModalHeaderNavItem>
              SHOES
            </ModalHeaderNavItem>
            <ModalHeaderNavItem>
             WATCHES
            </ModalHeaderNavItem>
            <ModalHeaderNavItem>
              GIFTS
            </ModalHeaderNavItem>
            <ModalHeaderNavItem>
              SALE
            </ModalHeaderNavItem>
          </ModalHeaderNav>
        </ModalHeaderBottom>
      </ModalHeader>
      <ModalClose onClick={onClose}>X</ModalClose>
      <PreviewContentContainer><PreviewContent ref={ContentContainer}>{json}</PreviewContent></PreviewContentContainer>
    </ModalContainer>
  </div>
  );

}


export default ModalPreview;


