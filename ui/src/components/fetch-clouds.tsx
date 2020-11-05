import React from 'react';
import FilterClouds from './filter-clouds';
import { Cloud } from '../types';
import SyncLoader from 'react-spinners/SyncLoader';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

type Initial = {
  type: 'INITIAL';
};
type Fetching = {
  type: 'FETCHING';
};
type DataLoaded = {
  type: 'LOADED';
  data: { clouds: Cloud[] };
};
type Error = {
  type: 'ERROR';
};

type LoadingState = Initial | Fetching | DataLoaded | Error;

const FetchClouds = () => {
  const [loadingState, setLoadingState] = React.useState<LoadingState>({
    type: 'INITIAL',
  });

  React.useEffect(() => {
    async function fetchClouds() {
      setLoadingState({ type: 'FETCHING' });
      const result = await fetch('/api');
      const data = await result.json();
      if (data.success) {
        setLoadingState({ type: 'LOADED', data: data.clouds });
      } else {
        setLoadingState({ type: 'ERROR' });
      }
    }
    fetchClouds();
  }, []);

  return (
    <Container>
      <ShowState loadingState={loadingState} />
    </Container>
  );
};

const ShowState = ({ loadingState }: { loadingState: LoadingState }) => {
  switch (loadingState.type) {
    case 'INITIAL':
      return <SyncLoader />;
    case 'FETCHING':
      return <SyncLoader />;
    case 'LOADED':
      const cloudDescriptions = loadingState.data.clouds.map(
        (cloud) => cloud.cloud_description
      );
      return (
        <FilterClouds
          initialClouds={loadingState.data.clouds}
          cloudProviders={parseCloudProviders(cloudDescriptions)}
          cloudRegions={parseCloudRegions(cloudDescriptions)}
        />
      );
    case 'ERROR':
      return <div>An error occured, contact support 🙁</div>;
  }
};

export const parseCloudProviders = (cloudDescriptions: string[]) => {
  const parsedCloudProviders = cloudDescriptions.map((cloud) =>
    // Get characters between "-" and ":"
    cloud.substring(cloud.indexOf('-') + 2, cloud.indexOf(':'))
  );

  return [...new Set(parsedCloudProviders)];
};

export const parseCloudRegions = (cloudDescriptions: string[]) => {
  const parsedCloudRegions = cloudDescriptions.map((cloud) =>
    // Get characters before "-"
    cloud.substring(0, cloud.indexOf('-') - 1)
  );

  return [...new Set(parsedCloudRegions)];
};

export default FetchClouds;
