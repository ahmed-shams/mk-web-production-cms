import React from 'react';
import PropTypes from 'prop-types';
import MainNavigation from './main-navigation';
import styled from 'styled-components';

const AppLayout = ({ children }) => {
  return (
    <div>
      <MainNavigation />
      <MainContentGrid>
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