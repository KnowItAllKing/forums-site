import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Jumbotron } from '../Layout/Jumbotron';
import { ThreadItem } from './ThreadItem';
import { API_URL } from '../..';
import styled from 'styled-components';

export type Thread = {
  id: string;
  content: string;
  title: string;
  authorId: string;
  timeCreated: number;
  username?: string;
  profilePic?: string;
};

const HeaderRow = styled(Row)`
  font-weight: bold;
  margin-bottom: 10px;
`;

const Threads = () => {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetch(`${API_URL as string + '/posts'}`);
        const data = await response.json();
        setThreads(data || []);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    fetchThreads();
  }, []);

  return (
    <Container style={{ padding: 0, maxWidth: '100%' }}>
      <Jumbotron title={'Threads'}>
        <Container>
          <HeaderRow>
            <Col xs={3} style={{ paddingLeft: '35px' }}>Username</Col>
            <Col xs={5}>Title</Col>
            <Col xs={4}>Description</Col>
          </HeaderRow>
          {threads.map((thread) => (
            <ThreadItem key={thread.id} {...thread} />
          ))}
        </Container>
      </Jumbotron>
    </Container>
  );
};

export { Threads };
