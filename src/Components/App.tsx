import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';

import { AppContext } from '../Contexts/AppContext';
import { NavBar } from './Layout/NavBar';
import { Footer } from './Layout/Footer';


export const navbarLight = '#F9F9FA';

// Styles for the App container
const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; // Ensure it takes at least the full viewport height
  background-color: #fbf9ef;
`;

// Styles for the main content area
const MainContent = styled.div`
  flex-grow: 1; // Allows this element to grow and take up available space
`;

const App = () => {
  const context = useContext(AppContext);

  if (!context) {
    return null;
  }

  const { state, setState } = context;

  return (
    <StyledApp>
      <NavBar />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </StyledApp>
  );
};

export { App };
