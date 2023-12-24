import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';

import styled from 'styled-components';

import { AppContext } from '../../Contexts/AppContext';

import Logo from '../../Assets/Images/Logo.png';

import { navbarLight } from '../App';
import { API_URL } from '../..';

const StyledNavDropdown = styled(NavDropdown)`
  .dropdown-toggle {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
`;
const LoggedIn = ({
  username,
  profilePic,
  logout
}: {
  username?: string;
  profilePic?: string;
  logout: any;
}) => (
  <StyledNavDropdown
    title={
      <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
        <Image
          src={profilePic || '/profile.png'}
          alt={username || 'Profile'}
          style={{ margin: '0 10px 0 0', width: '20px', height: '20px' }}
        />
        <span>{username}</span>
      </div>
    }
    id='nav-dropdown'
    align='end'
  >
    <NavDropdown.Item as={Link} to={`/u/${username}`}>My Profile</NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
  </StyledNavDropdown>
);


const NavBar = () => {
  const context = useContext(AppContext);

  useEffect(() => {
    if (context) {
      // Any logic that depends on context
    }
  }, [context]);

  if (!context) {
    return null;
  }

  const { state, setState } = context;
  const logOut = async () => {
    try {
      var res = await fetch(`${API_URL as string + '/user/logout'}`, {credentials: 'include'}).then((x) =>
        x.json()
      );
    } catch (e) {}
    setState({ username: undefined, profilePic: undefined, isLoggedIn: false });
    localStorage.setItem('state', JSON.stringify(state));
  };
  return (
    <Navbar expand='md' style={{ backgroundColor: navbarLight }}>
      <Navbar.Brand href='/'>
        <img src={Logo} alt='Stryfe' />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to='/'>
            Home
          </Nav.Link>
        </Nav>
        <Nav className='ml-auto'>
          {state.isLoggedIn ? (
            <LoggedIn
              username={state.username}
              profilePic={state.profilePic || '/profile.png'}
              logout={logOut}
            />
          ) : (
            <>
              <Nav.Link as={Link} to='/login'>
                Login
              </Nav.Link>
              <Nav.Link as={Link} to='/register'>
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export { NavBar };
