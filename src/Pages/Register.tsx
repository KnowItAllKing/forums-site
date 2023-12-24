import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { AppContext } from '../Contexts/AppContext';
import { API_URL } from '..';

const StyledForm = styled(Form)`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const context = useContext(AppContext);

  // Regex for validation (similar to backend)
  const usernameRegex = /^[A-Za-z\d]{1,12}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/;

  const validateInput = () => {
    if (!usernameRegex.test(username)) {
      setErrorMessage('Invalid username. Should be alphanumeric and 1-12 characters long.');
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format.');
      return false;
    }
    if (!passwordRegex.test(password)) {
      setErrorMessage('Invalid password. Should be 8-25 characters long with at least one letter and one number.');
      return false;
    }
    return true;
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    if (!validateInput()) return;

    try {
      const response = await fetch(`${API_URL as string + '/user/register'}`, {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.error) {
        setErrorMessage(data.error);
        setSuccessMessage(''); // Clear any existing success message
      } else {
        setSuccessMessage('Successfully registered. You can now login.');
        setErrorMessage(''); // Clear any existing error message
        // Optionally, clear the form fields
        setUsername('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
      setSuccessMessage(''); // Clear any existing success message
    }
  };

  return (
    <StyledForm onSubmit={handleRegister}>
      <Form.Group controlId='formUsername'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='formEmail'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='formPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

      <Button variant='primary' type='submit'>
        Register
      </Button>
    </StyledForm>
  );
};
