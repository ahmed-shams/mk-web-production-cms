import styled from 'styled-components';
export const Parallax4by5 = styled.div`
  &.componentParallax4by5EvenLeft {
    width: 100%;
    div[class^="components__TextBox"] {
      padding-top: 15px;
    }
    .caption--slug {
      line-height: 1.3;
      display: inline;
      border-bottom: 1px solid #000;     
    }
    .parallaxContainer {
      position: relative;
      margin-top: auto;
      transform : translate3d(0, ${props => props.transform}px, 0);
      @media (max-width: 767px) { 
        position: initial;
        transform : none;
      }
    }
  }
`;
