import React from 'react';
import { Container, Col } from 'react-bootstrap';

import { AppContext } from '../../Contexts/AppContext';

const Jumbotron = ({
  children,
  title
}: {
    children: any;
    title: string;
}) => {
  return (
    <div className='p-5 mb-4 bg-light rounded-3'>
      <h1 className='display-6'>{title}</h1>
      <Container>
        <Col>{children}</Col>
      </Container>
    </div>
  );
};

export { Jumbotron };
