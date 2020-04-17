import React from 'react';
import { Cloud } from '../types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h1`
  font-family: inherit;
  font-weight: 400;
  font-size: 24px;
`;

const Clouds = ({ clouds }: { clouds: Cloud[] }) => {
  return (
    <Container>
      <Heading>All the available clouds</Heading>
      {clouds.map((cloud) => (
        <div key={cloud.cloud_name}>{cloud.cloud_description}</div>
      ))}
    </Container>
  );
};

export default Clouds;
