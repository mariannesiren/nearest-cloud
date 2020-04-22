import React from 'react';
import { Cloud } from '../types';
import styled from 'styled-components';
import Collection from './collection';
import ShowClouds from './show-clouds';
import { locateUser } from './locate-user';

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
  initialClouds,
  cloudProviders,
  cloudRegions,
}: {
  initialClouds: Cloud[];
  cloudProviders: string[];
  cloudRegions: string[];
}) => {
  const [selectedRegions, setSelectedRegions] = React.useState<string[]>([]);
  const [selectedProviders, setSelectedProviders] = React.useState<string[]>(
    []
  );
  const [clouds, setClouds] = React.useState<Cloud[]>(initialClouds);
  const [location, setLocation] = React.useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  React.useEffect(() => {
    setClouds(initialClouds);
  }, [initialClouds]);

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

  const handleLocationClick = () => {
    locateUser().then((result) => {
      setLocation({
        latitude: result.latitude,
        longitude: result.longitude,
      });
    });
  };

  const filterClouds = () => {
    let cloudsToDisplay: Cloud[];
    cloudsToDisplay = [];

    initialClouds.forEach((cloud) => {
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

    setClouds([...new Set(cloudsToDisplay)]);
  };


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
      <OrderButton onClick={handleLocationClick}>
        Sort clouds by distance from your location
      </OrderButton>
      <CloudSection>
        <Row>
          <ShowClouds heading="Clouds:" clouds={clouds} />
        </Row>
      </CloudSection>
    </Container>
  );
};

export default FilterClouds;
