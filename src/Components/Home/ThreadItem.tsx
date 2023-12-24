import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ThreadRow = styled(Row)`
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 20px;
  height: 20px;
  object-fit: cover;
  margin-right: 10px;
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ContentCol = styled(Col)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface ThreadItemProps {
  title: string;
  content: string;
  username?: string;
  profilePic?: string;
  id: string;
}

export const ThreadItem: React.FC<ThreadItemProps> = ({
  title,
  content,
  username,
  profilePic,
  id
}) => (
  <Row>
    <Col xs={12}>
      <Container fluid className='p-0'>
        <Col xs={3} className='d-inline-block'>
          <UserInfo>
            <StyledImage
              src={profilePic || '/profile.png'}
              alt='Profile Picture'
            />
            <StyledLink to={`/u/${username}`}>{username}</StyledLink>
          </UserInfo>
        </Col>
        <Col xs={5} className='d-inline-block'>
        <StyledLink to={`/${id}`}>{title}</StyledLink>
        </Col>
        <Col xs={4} className='d-inline-block'>
          {content}
        </Col>
      </Container>
    </Col>
  </Row>
);
