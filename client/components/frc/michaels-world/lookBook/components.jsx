import styled from 'styled-components';
export const Section = styled.section`
  width: 100%;
  div[class^="modal__ModalView"] {
    .mkwpdev {
      margin: 0 auto;
    }
  }
  div[class^="carousel__CarouselDiv"] {
    position: relative;
    height: 100vh;
    width: auto;
    margin: 0 auto;
    display: inline-block;
    @media (min-width: 769px) {
      width: calc(66.66667vh);
    }
  }
  @media (min-width: 769px) {
    div[class^="carousel__Close"] {
      position: fixed;
      right: 30px;
      top: 0;
      cursor: pointer;
    }
  }
  .prev,
  .next {
    padding-left: 30px;
    padding-right: 30px;
    width: 200px;
  }
  .prev {
    text-align: right;
  }
`;
