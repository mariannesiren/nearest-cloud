import React from 'react';
import Clouds from './clouds';
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

  console.log(loadingState);
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
      console.log('data: ', loadingState.data.clouds);
      return <Clouds clouds={loadingState.data.clouds} />;
    case 'ERROR':
      return <div>An error occured, contact support 🙁</div>;
  }
};

export default FetchClouds;
