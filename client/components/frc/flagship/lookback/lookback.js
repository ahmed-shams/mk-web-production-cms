import React from 'react';
import Styled from 'styled-components';
import Image16x9 from '../../global/image/plain';
import Text from '../../global/text';
import CompContainer from '../../global/comp-container';

const Debug = false;

const imageHTML = (state, imageData, actions) => {
  const index = imageData.index;
  const click = actions.open == null ? null : () => actions.open(index);
  const focus = state.focus ? " focus" : "";
  const className2 = "columns" + focus;
  const to = index < state.texts.length ? state.texts[index] : null;
  const image = <Image16x9 info={imageData} />;
  const text = to ? <Text info={to} /> : null;
  const tabIndex = state.hidden ? '-1' : '0';
  return (
    <div className="carousel-image small-6 medium-3 padding-bottom-20-mobile-only" key={(index + 4000)}>
      <button tabIndex={tabIndex} className={className2} onClick={click}>
        <picture>
          {image}
          {text}
        </picture>
      </button>
    </div>
  );
};

const displayButtonHTML = (state, actions) => {
  const tabIndex = state.hidden ? "-1" : "0";
  const className = state.focus ? "focus" : "";
  return (
    <ButtonDiv classname="type-wrapper lookback-view-all" key={'displayButton'}>
      <Button tabIndex={tabIndex} className={className} onClick={actions.displayAllLooks} >VIEW ALL LOOKS</Button>
    </ButtonDiv>
  );
};

const sectionBannerHTML = (data, index) => {
  return (
    <section className="mkwpdev mkwp padding-bottom-0" key={`sectionBanner${index}`}>
      <div className="row" data-linkcontainer="WHITNEY TK">
        <div className="small-12">
          <div className="type-wrapper text-center width-90-mobile-only width-50-tablet type-wrapper-padding-vertical padding-top-45-desktop">
            <div className="type-divider type-padding-bottom" />
            <a href={data.href} data-icid="_video">
              <h2 className="type-headline-h2-large wpHeadline type-padding-bottom">{data.title}</h2>
            </a>
            <p className="type-copy-caslon-deck wpText">{data.copy}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const sectionImageOption4by5 = (data, index) => {
  const img = data.imageOption;
  return (
    <section className="mkwp mkwp--wrapper row align-center flagship" key={`sectionImageOption4by5${index}`}>
      <figure className="promo columns medium-8" data-linkcontainer="WHITNEY TK">
        <figure className="gallery promo--gallery">
          <div className="gallery--pictures">
            <a className="gallery--picture promo-image" href={img.imgInfo.link_url}>
              <picture>
                <img src={img.imgSrc.desktop} alt={img.imgInfo.alt} />
              </picture>
            </a>
          </div>
        </figure>
      </figure>
    </section>
  );
};

const lookbackHTML = (state, actions) => {
  let index = 0;
  const htmls = [];
  const {objects} = state;
  while (index < objects.length) {
    const object = objects[index];
    if (Debug) console.log(`|LookbackHTML| switching component ${object.componentId} index: ${index} images`);
    switch (object.componentId) {
      case 'image': {
        const images = objects.slice(index, index + state.columns).filter(x => x.componentId === 'image').map(x => imageHTML(state, x, actions));
        if (Debug) console.log(`|LookbackHTML| creating ${images.length} images`);
        const html = (
          <section className="mkwpdev mkwp lookbook-grid padding-bottom-0" key={`image${index}`}>
            <div className="component componentLookbookGrid">
              <div className="mkwp--wrapper row small-uncollapse padding-bottom-30-tablet margin-top-0 padding-bottom-0">
                {images}
              </div>
            </div>
          </section>
        );
        htmls.push(html);
        index = index + images.length;
        break;
      }
      case 'sectionBanner':
        if (Debug) console.log(`|LookbackHTML| creating sectionBannerHTML`);
        htmls.push(sectionBannerHTML(object, index));
        index++;
        break;
      case 'sectionImageOption4by5':
        if (Debug) console.log(`|LookbackHTML| creating sectionImageOption4by5HTML`);
        htmls.push(sectionImageOption4by5(object, index));
        index++;
        break;
      case 'sectionImageOption': {
        if (Debug) console.log(`|LookbackHTML| creating sectionImage2HTML`);
        const html = (
          <CompContainer infos={object.imageOption} key={`sectionImageOption${index}`}>
            <Image16x9 info={object.imageOption} />
          </CompContainer>
        );
        htmls.push(html);
        index++;
        break;
      }
      case 'displayButton':
      if (Debug) console.log(`|LookbackHTML| creating displayButtonHTML`);
        htmls.push(displayButtonHTML(object, actions));
        index++;
        break;
      default:
        console.log(`|LookbackHTML| unknown componentId: |${object.componentId}|`);
        index++;
        break;
    }
  }
  return htmls;
};

const LookbackHTML = ({state, actions}) => {
  return lookbackHTML(state, actions);
};

export default LookbackHTML;

const Button = Styled.button`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.847);
  width: 16.66667%;
  min-width: 300px;
  margin: 0 auto;
  border: 1px solid black;
  padding: 16px 5px;
  cursor: pointer;
  font-family: "Gotham 5R", "Gotham Medium";
`;

const ButtonDiv = Styled.div`
  width: 100%;
  text-align: center;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 30px;
  padding-bottom: 0px;;
`;
