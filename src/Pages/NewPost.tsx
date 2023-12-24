import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { AppContext } from '../Contexts/AppContext';
import styled from 'styled-components';
import { API_URL } from '..';

const StyledForm = styled(Form)`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const context = useContext(AppContext);

  if (!context) {
    return null;
  }

  const { state, setState } = context;

  const { isLoggedIn } = state;

  // Max length for content
  const MAX_CONTENT_LENGTH = 500;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Reset states
    setError('');
    setSuccess('');

    // Frontend validation
    if (!title || !content) {
      setError('Both title and content are required.');
      return;
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      setError(`Content is too long (maximum ${MAX_CONTENT_LENGTH} characters).`);
      return;
    }

    // Only proceed if user is logged in
    if (!isLoggedIn) {
      setError('You must be logged in to create a post.');
      return;
    }

    // Create post
    try {
      const response = await fetch(`${API_URL as string + '/posts'}`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Post created successfully.');
        setTitle('');
        setContent('');
      } else {
        setError(data.error || 'An error occurred while creating the post.');
      }
    } catch (error) {
      setError('Failed to connect to the server.');
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Form.Group controlId='postTitle'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter post title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='postContent'>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          placeholder='Enter post content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      {error && <Alert variant='danger'>{error}</Alert>}
      {success && <Alert variant='success'>{success}</Alert>}

      <Button variant='primary' type='submit' disabled={!isLoggedIn}>
        Create Post
      </Button>
    </StyledForm>
  );
};
