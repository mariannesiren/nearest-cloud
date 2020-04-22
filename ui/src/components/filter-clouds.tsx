import React from 'react';
import { Cloud } from '../types';
import styled from 'styled-components';
import Collection from './collection';
import ShowClouds from './show-clouds';
import { locateUser } from '../utils/locate-user';
import { calculateDistance } from '../utils/calculate-distance';

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

const SortButton = styled.div`
  background: #ff7343;
  padding: 0.5rem;
  margin: 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
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
    sortClouds();
  }, [location]);

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
    const hasSelectedProvider = selectedProviders.length !== 0;
    const hasSelectedRegion = selectedRegions.length !== 0;

    if (!hasSelectedProvider && !hasSelectedRegion) {
      return;
    }

    let cloudsToDisplay: Cloud[] = [];

    initialClouds.forEach((cloud) => {
      if (hasSelectedProvider && !hasSelectedRegion) {
        selectedProviders.forEach((provider) => {
          if (cloud.cloud_description.includes(provider)) {
            cloudsToDisplay.push(cloud);
          }
        });
      }
      if (!hasSelectedProvider && hasSelectedRegion) {
        selectedRegions.forEach((region) => {
          if (cloud.cloud_description.includes(region)) {
            cloudsToDisplay.push(cloud);
          }
        });
      }
      if (hasSelectedProvider && hasSelectedRegion) {
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

  const sortClouds = () => {
    if (Object.values(location).every((x) => x === null)) {
      return;
    }

    const sortedClouds = clouds.sort((a, b) => {
      const aCloudLocation = {
        latitude: a.geo_latitude,
        longitude: a.geo_longitude,
      };
      const bCloudLocation = {
        latitude: b.geo_latitude,
        longitude: b.geo_longitude,
      };
      const aDistance = calculateDistance(
        location.latitude,
        location.longitude,
        aCloudLocation.latitude,
        aCloudLocation.longitude
      );
      const bDistance = calculateDistance(
        location.latitude,
        location.longitude,
        bCloudLocation.latitude,
        bCloudLocation.longitude
      );

      if (aDistance < bDistance) {
        return -1;
      }

      if (aDistance > bDistance) {
        return 1;
      }

      return 0;
    });

    setClouds([...sortedClouds]);
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
      <SortButton onClick={handleLocationClick}>
        Sort clouds by distance from your location
      </SortButton>
      <CloudSection>
        <Row>
          <ShowClouds heading="Clouds:" clouds={clouds} />
        </Row>
      </CloudSection>
    </Container>
  );
};

export default FilterClouds;
