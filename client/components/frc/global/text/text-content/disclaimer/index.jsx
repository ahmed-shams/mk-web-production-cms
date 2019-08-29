import React from 'react';
import styled from 'styled-components';

const DisclaimerBox = styled.div`
  padding-top: 3px !important;
  padding-bottom: 0;
  text-align: ${props => props.textalign};
  z-index: 2;
`;

const Disclaimer = ({ data }) => {
  if (data === "undefined") {
    return null;
  }
  return (
    <DisclaimerBox textalign={data.text_align}>
      <small className="promo--legal">{ data.html ? <span dangerouslySetInnerHTML={{ __html: data.text }} /> : data.text }</small>
    </DisclaimerBox>
  );
};

export default Disclaimer;

