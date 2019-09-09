import styled, { css } from "styled-components";
const createCSS = () => {
  const alpha = 50;
  const beta = 50;
  let styles = '';
  for (let i = 1; i <= alpha; i = i + 1) {
    styles += `
      .animates-${i} {
        -webkit-transform: translate3d(0, ${i * (22 / alpha)}%, 0);
        transform: translate3d(0, ${i * (22 / alpha)}%, 0);
      }
    `;
  }
  for (let i = 1; i <= beta; i = i + 1) {
    styles += `
      .animates-${i + alpha} {
        -webkit-transform: translate3d(0, ${22 + i * 13 / beta}%, 0);
        transform: translate3d(0, ${22 + i * 13 / beta}%, 0);
      }
    `;
  }
  return css`${styles}`;
};
export const ParallaxParagraph = styled.div`
  &.componentParallaxFixedParagraph {
    width: 100%;  
    .type-wrapper {
      @media (min-width: 768px) {
        position: relative;
        top: ${props => props.styles.top};
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
      }
      &.setFixed {
        @media (min-width: 768px) {
          position: fixed;
          max-width: ${props => props.styles.maxWidth};
          margin-top: ${props => props.styles.marginTop};
        }
      }
    }
    .type-padding-bottom {
      padding-bottom: 20px;
      @media (min-width: 1025px) {
        padding-bottom: 30px;
      }
    }
    .padding-bottom-30 {
      padding-bottom: 30px !important;
    }
    @media (max-width: 767px) {
      .imageContainer {
        position: relative;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        -webkit-transition: -webkit-transform 0.75s ease-out;
        transition: transform 0.75s ease-out;
        -webkit-transform-style: preserve-3d;
        -moz-transform-style: preserve-3d;
        transform-style: preserve-3d;
      }
      ${createCSS()};
    }
  }
`;
export const WhitneyProductChapter = styled.section`
  &.whitney-product-chapters {
    position: relative;
    width: 100%;
    display: none;
    transition: display 1s;
    pointer-events: none;
    padding-bottom: 0;    
    &.active {
      pointer-events: initial;
      display: block;
    }
  }
`;
