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

interface ActiveProp {
  active: 'true' | 'false';
}

const Item = styled.div<ActiveProp>`
  background: ${(props) => (props.active === 'true' ? 'tomato' : '#c0c0c0')};
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
  const [selectedRegions, setSelectedRegions] = React.useState<string[]>([]);
  const [selectedProviders, setSelectedProviders] = React.useState<string[]>(
    []
  );
  const [filteredClouds, setFilteredClouds] = React.useState<Cloud[]>([]);

  React.useEffect(() => {
    filterClouds();
  }, [selectedRegions, selectedProviders]);

  const handleRegionClick = (event: React.MouseEvent<HTMLElement>) => {
    const value = event.currentTarget.innerText;

    if (selectedRegions.includes(value)) {
      let newState = selectedRegions.filter((region) => region !== value);
      setSelectedRegions([...newState]);
    } else {
      setSelectedRegions([...selectedRegions, value]);
    }
  };

  const handleProviderClick = (event: React.MouseEvent<HTMLElement>) => {
    const value = event.currentTarget.innerText;

    if (selectedProviders.includes(value)) {
      let newState = selectedProviders.filter((provider) => provider !== value);
      setSelectedProviders([...newState]);
    } else {
      setSelectedProviders([...selectedProviders, value]);
    }
  };

  const filterClouds = () => {
    let cloudsToDisplay: Cloud[];
    cloudsToDisplay = [];

    clouds.forEach((cloud) => {
      if (selectedProviders.length !== 0 && selectedRegions.length === 0) {
        selectedProviders.forEach((provider) => {
          if (cloud.cloud_description.includes(provider)) {
            cloudsToDisplay.push(cloud);
          }
        });
      }
      if (selectedRegions.length !== 0 && selectedProviders.length === 0) {
        selectedRegions.forEach((region) => {
          if (cloud.cloud_description.includes(region)) {
            cloudsToDisplay.push(cloud);
          }
        });
      }
      if (selectedRegions.length !== 0 && selectedProviders.length !== 0) {
        selectedRegions.forEach((region) => {
          selectedProviders.forEach((provider) => {
            if (
              cloud.cloud_description.includes(region) &&
              cloud.cloud_description.includes(provider)
            ) {
              cloudsToDisplay.push(cloud);
            }
          });
        });
      }
    });

    setFilteredClouds([...new Set(cloudsToDisplay)]);
  };

  const cloudsToShow =
    selectedProviders.length === 0 && selectedRegions.length === 0
      ? clouds
      : filteredClouds;

  return (
    <Container>
      <FilterSection>
        <Row>
          <Heading>Select regions to display:</Heading>
          <Options>
            {cloudRegions.map((region) => (
              <Item
                active={
                  selectedRegions.length === 0 ||
                  selectedRegions.includes(region)
                    ? 'true'
                    : 'false'
                }
                key={region}
                onClick={handleRegionClick}
              >
                {region}
              </Item>
            ))}
          </Options>
        </Row>
        <Row>
          <Heading>Select providers to display:</Heading>
          <Options>
            {cloudProviders.map((provider) => (
              <Item
                active={
                  selectedProviders.length === 0 ||
                  selectedProviders.includes(provider)
                    ? 'true'
                    : 'false'
                }
                key={provider}
                onClick={handleProviderClick}
              >
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
            {cloudsToShow.map((cloud) => (
              <Cloud key={cloud.cloud_name}>{cloud.cloud_description}</Cloud>
            ))}
          </Options>
        </Row>
      </CloudSection>
    </Container>
  );
};

export default Clouds;
