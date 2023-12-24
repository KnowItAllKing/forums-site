import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { AppContext } from '../Contexts/AppContext';
import { Threads } from '../Components/Home/Threads';

const Home = () => {
  const context = useContext(AppContext);

  // useEffect should be placed at the top level
  useEffect(() => {
    if (context) {
      document.title = 'Home | Stryfe';
    }
  }, [context]);

  // Early return if context is not available
  if (!context) {
    return null;
  }

  // const { darkMode } = context;

  return (
    <Container style={{ padding: '30px 1%' }}>
          <Threads />
    </Container>
  );
};

export { Home };