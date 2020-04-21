import React from 'react';
import { Cloud } from '../types';
import styled from 'styled-components';
import Heading from './Heading';
import Options from './Options';

const Cloud = styled.div`
  background: #c0c0c0;
  padding: 0.5rem;
  margin: 5px;
  color: white;
  border-radius: 15px;
`;

const ShowClouds = ({
  clouds,
  heading,
}: {
  clouds: Cloud[];
  heading: string;
}) => {
  return (
    <>
      <Heading>{heading}</Heading>
      <Options>
        {clouds.map((cloud) => (
          <Cloud key={cloud.cloud_name}>{cloud.cloud_description}</Cloud>
        ))}
      </Options>
    </>
  );
};

export default ShowClouds;
