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

const Item = styled.div`
  background: tomato;
  padding: 0.5rem;
  margin: 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const CloudSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Cloud = styled.div`
  background: #c0c0c0;
  padding: 0.5rem;
  margin: 5px;
  color: white;
  border-radius: 15px;
`;

const Clouds = ({
  clouds,
  cloudProviders,
  cloudRegions,
}: {
  clouds: Cloud[];
  cloudProviders: string[];
  cloudRegions: string[];
}) => {
  const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    const value = event.currentTarget.innerText;
    console.log('value', event.currentTarget.innerText);
    console.log('value', event.target);
  };

  return (
    <Container>
      <FilterSection>
        <Row>
          <Heading>Select regions to display:</Heading>
          <Options>
            {cloudRegions.map((region) => (
              <Item key={region} onClick={handleOnClick}>
                {region}
              </Item>
            ))}
          </Options>
        </Row>
        <Row>
          <Heading>Select providers to display:</Heading>
          <Options>
            {cloudProviders.map((provider) => (
              <Item key={provider} onClick={handleOnClick}>
                {provider}
              </Item>
            ))}
          </Options>
        </Row>
      </FilterSection>
      <CloudSection>
        <Row>
          <Heading>Clouds:</Heading>
          <Options>
            {clouds.map((cloud) => (
              <Cloud key={cloud.cloud_name}>{cloud.cloud_description}</Cloud>
            ))}
          </Options>
        </Row>
      </CloudSection>
    </Container>
  );
};

export default Clouds;
