import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Jumbotron } from '../Components/Layout/Jumbotron';
import { API_URL } from '..';
import styled from 'styled-components';

const StyledImage = styled.img`
  width: 100px; // Adjust as needed
  height: 100px; // Adjust as needed
  object-fit: cover;
  border-radius: 50%; // Circular image
  margin-bottom: 20px;
`;

const Profile = () => {
  const [userInfo, setUserInfo] = useState({ username: '', profilePic: '', points: 0 });
  const { username } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${API_URL}/user/info/${username}`, {
          credentials: 'include'
        });
        const data = await response.json();
        if (data.error) {
          console.error(data.error);
        } else {
          setUserInfo(data);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [username]);

  return (
    <Container>
      <Jumbotron title={' '}>
        <Row>
          <Col className="text-center">
            <StyledImage src={userInfo.profilePic || '/profile.png'} alt='Profile' />
            <h2>{userInfo.username}</h2>
            <p>Points: {userInfo.points}</p>
          </Col>
        </Row>
      </Jumbotron>
    </Container>
  );
};

export { Profile };
