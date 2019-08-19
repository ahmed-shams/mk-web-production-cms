import React from 'react';
import PropTypes from 'prop-types';
import MainNav from './MainNav';
import FakeNav from './FakeNav';
import styled from 'styled-components';

const AppLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <MainNav />
      <MainContentGrid>
        <FakeNav />
        { children }
      </MainContentGrid>
    </div>
  )
};

AppLayout.propTypes = {
  children: PropTypes.node
}

export default AppLayout;

const MainContentGrid = styled.div`
  width: 100%;
  height: auto;
  background-color: light-blue;
`;