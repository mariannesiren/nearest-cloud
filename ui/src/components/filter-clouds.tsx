import React from 'react';
import { Cloud } from '../types';
import styled from 'styled-components';
import Collection from './collection';
import ShowClouds from './show-clouds';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
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

const FilterClouds = ({
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
          <Collection
            heading="Select regions to display:"
            options={cloudRegions}
            selectedOptions={selectedRegions}
            handleClick={handleRegionClick}
          />
        </Row>
        <Row>
          <Collection
            heading="Select providers to display:"
            options={cloudProviders}
            selectedOptions={selectedProviders}
            handleClick={handleProviderClick}
          />
        </Row>
      </FilterSection>
      <CloudSection>
        <Row>
          <ShowClouds heading="Clouds:" clouds={cloudsToShow} />
        </Row>
      </CloudSection>
    </Container>
  );
};

export default FilterClouds;
