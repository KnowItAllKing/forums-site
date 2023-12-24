import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Jumbotron } from '../Components/Layout/Jumbotron';
import { API_URL } from '..';
import { AppContext } from '../Contexts/AppContext';
import styled from 'styled-components';
import { Thread as Thread_Type } from '../Components/Home/Threads';

import { FaTrashAlt } from 'react-icons/fa';

const StyledImage = styled.img`
  width: 20px; // Adjust as needed
  height: 20px; // Adjust as needed
  object-fit: cover;
`;

const Thread = () => {
  const [thread, setThread] = useState<ThreadType>();
  const { threadId } = useParams();

  const context = useContext(AppContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this thread?')) {
      try {
        const response = await fetch(`${API_URL}/posts/${threadId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        const data = await response.json();
        if (data.message === 'Post deleted successfully') {
          navigate('/');
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error deleting thread:', error);
      }
    }
  };

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await fetch(`${API_URL}/posts/${threadId}`, { credentials: 'include' });
        const data = await response.json();
        setThread(data);
      } catch (error) {
        console.error('Error fetching thread:', error);
      }
    };

    fetchThread();
  }, [threadId]);

  if (!thread) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Jumbotron title={''}>
        <Row>
          <Col>
            {thread.isAuthor && (
              <FaTrashAlt style={{ cursor: 'pointer', float: 'right' }} onClick={handleDelete} />
            )}
            <h1>{thread.title}</h1>
            <p><StyledImage src={thread.profilePic || '/profile.png'} alt='Profile' /> {thread.username}</p>
            <p>{thread.content}</p>
          </Col>
        </Row>
      </Jumbotron>
    </Container>
  );
};

interface ThreadType extends Thread_Type {
  isAuthor: boolean;
}

export { Thread };
