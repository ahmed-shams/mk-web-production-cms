import styled from 'styled-components';
export const RunwaySection = styled.section`
  width: 100%;
  @media (max-width: 767px) {
    div[class^="columns__Row"] {
      padding-top: 5px;
      div[class^="components__TextBox"]:not(.wpCta) {
        padding-top: 25px;
      }
      .wpCta {
        padding-bottom: 0;
      }
    }
    div[class^="button__ButtonDiv"] {
      padding-top: 0;
    }
  }
  button {
    font-size: 11px;
    @media (min-width: 768px) {
      font-size: 12px;
    }
    @media (min-width: 1025px) {
      font-size: 14px;
    }
  }
`;
