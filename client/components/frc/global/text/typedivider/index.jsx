import styled from 'styled-components';

export const TypeDivider = styled.p`
  width: 50px;
  height: 1px;
  border-top: 1px solid black;
  padding-bottom: 30px;
  display: inline-block;
  @media and screen(max-width: 768px) {
    padding-bottom: 20px;
  }
`;
