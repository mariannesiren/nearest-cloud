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
  let cloudProviders: string[];
  cloudProviders = [];

  for (let i = 0; i < cloudDescriptions.length; i++) {
    let provider = cloudDescriptions[i].substring(
      cloudDescriptions[i].indexOf('-') + 2,
      cloudDescriptions[i].indexOf(':')
    );
    if (cloudProviders.indexOf(provider) === -1) {
      cloudProviders.push(provider);
    }
  }
  return cloudProviders;
};

export const parseCloudRegions = (cloudDescriptions: string[]) => {
  var cloudRegions: string[];
  cloudRegions = [];

  for (let i = 0; i < cloudDescriptions.length; i++) {
    let provider = cloudDescriptions[i].substring(
      0,
      cloudDescriptions[i].indexOf('-') - 1
    );
    if (cloudRegions.indexOf(provider) === -1) {
      cloudRegions.push(provider);
    }
  }
  return cloudRegions;
};

export default FetchClouds;
