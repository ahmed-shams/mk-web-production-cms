import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import DefaultBanner from '../frc/banner/banner16by9/index.jsx';


const ModalContainer = styled.div`
 ${props => props.show && css`
   display: flex;
  `}
  ${props => !props.show && css`
     display: none;
  `}
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

const ModalHeader= styled.div`
  display: flex;
   justify-content: center;
  align-items: center;
  font-size: 45px;
  font-weight: bold;
  background-color: black;
  color: white;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  height: 200px;
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
  background-color: white;
  color: black;
  border-radius: 5px;
    &:hover {
    cursor: pointer;
  } 
`

const ModalClose = styled.div`  
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10000;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: 50px;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;


const PreviewContent = styled.div`
  position: absolute;
  top: 200px;
`


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

const Modal = ({ show = false, onClose, fileJson }) => {
  const ContentContainer = useRef(null);

  const copyHtml = () => {
    console.log('in copyHtml ---->');
    let previewHTML='';
    if(ContentContainer && ContentContainer.current && ContentContainer.current.innerHTML) {
      previewHTML = ContentContainer.current.innerHTML;
    }
    navigator.clipboard.writeText(previewHTML).then(()=>{
      alert('Copying to clipboard was successful');
    }, (e) => {
      alert('error happened while trying to copy josn. please try again');
    })
  }

  if(!fileJson) {
    return (
      <ModalContainer show={show}>
      <ModalClose onClick={onClose}>X</ModalClose>
    </ModalContainer>
    );
  }; 
  // console.log('in showModal show is ', show);
  // console.log('data ', data);
  // console.log('fileJson ', fileJson);
  console.log('rendering modal ssv ', fileJson);
  if(fileJson) {
    console.log('in if', fileJson);
    console.log('fileJson ', JSON.parse(fileJson));
  }

  let json = renderJSONComponents(JSON.parse(fileJson.toString()));

  // console.log('fileJson ', JSON.parse(fileJson));
// if(fileJson) {
//   let json = renderJSONComponents(JSON.parse(fileJson.toString()));
// }
  return (
  <div>  
  	<ModalContainer show={show}>
    <CopyHtml onClick={copyHtml}>COPY HTML</CopyHtml>
    <ModalHeader>PREVIEW</ModalHeader>
      <ModalClose onClick={onClose}>X</ModalClose>
      <PreviewContent ref={ContentContainer}>{json}</PreviewContent>
    </ModalContainer>
  </div>
  );

}


export default Modal;

