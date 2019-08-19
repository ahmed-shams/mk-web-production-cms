import React from 'react';
import styled from 'styled-components';

const FakeNav = () => {
  return (
    <Header>
      <LOGO>MK LOGO</LOGO>
      <Nav>
        <ul>
          <li>WOMEN</li>
          <li>MEN</li>
          <li>COLEECTION</li>
          <li>HANDBAG</li>
          <li>WALLETS</li>
          <li>SHOES</li>
          <li>WATCHES</li>
          <li>GIFTS</li>
          <li>SALE</li>
        </ul>
      </Nav>
    </Header>
  );
}

export default FakeNav;

const Header = styled.header`
  width: 100%;
  background-color: rgba(233,233,233,0.8);
  display: flex;
  flex-direction: column;
`;

const LOGO = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 0;
`

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  ul {
    display: flex;
    justify-content: space-around;
    list-style: none;

    li {
      padding: 5px 10px;
    }
  }
`;
