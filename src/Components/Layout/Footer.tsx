import React, { useContext } from 'react';

import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import { AppContext } from '../../Contexts/AppContext';

const Footer = () => {
  const context = useContext(AppContext);
  const nav = useNavigate();

  if (!context) {
    return null;
  }

  const { state, setState } = context;
  const onClick = () => {
    nav('/newpost');
  };

  return (
    <>
      <div className='d-flex flex-row-reverse'>
        <div className='p-2'>
          {state.isLoggedIn ? (
            <Button
              className='float-md-right'
              color='secondary'
              id='dark-mode-switcher'
              onClick={onClick}>
              <span role='img' aria-label='emoji'>
                + New Post
              </span>
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export { Footer };
