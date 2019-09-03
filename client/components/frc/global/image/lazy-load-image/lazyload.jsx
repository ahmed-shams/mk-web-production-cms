import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const useLazyImageObserver = (target) => {
  useEffect(() => {
    if (!target.current) {
      return;
    }
    const options = {
      rootMargin: '0px 2500px 500px 2500px'
    };

    let observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          [...lazyImage.children].forEach(ele => {
            ele.srcset = ele.dataset.src;
          });
          observer.unobserve(lazyImage);
        }
      });
    }, options);

    observer.observe(target.current);

    // eslint-disable-next-line consistent-return
    return () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
  }, [target]);
};


const LazyImage = ({ info }) => {
  const target = useRef(null);
  const { imgSrc, imgInfo } = info;
  // custom hook to observe the target
  useLazyImageObserver(target);

  // no script
  const noScriptImage = (
    <noscript>
      <img src={imgSrc.mobile} alt={imgSrc.alt} />
    </noscript>
  );

  const lazyPicture = (
    <picture ref={target} className="gallery-picture">
      <source data-src={imgSrc.desktop} media="(min-width:1025px)" />
      <source data-src={imgSrc.tablet} media="(min-width:768px)" />
      <source data-src={imgSrc.mobile} media="(max-width:767px)" />
      <img data-src={imgSrc.desktop} alt={imgSrc.alt} />
    </picture>
  );

  if (imgInfo && imgInfo.link_url) {
    return (
      <ImageLink href={imgInfo.link_url} data-icid={imgInfo.data_icid} aria-hidden={imgInfo.aria.hidden} aria-label={imgInfo.aria.hidden ? '' : imgInfo.aria.label} tabIndex={imgInfo.tabIndex} >
        {lazyPicture}
        {noScriptImage}
      </ImageLink>
    );
  }
  return (
    <div>
      {lazyPicture}
      {noScriptImage}
    </div>
  );
};

export default LazyImage;

const ImageLink = styled.a`
  width: 100%;
  cursor: pointer;
`;
