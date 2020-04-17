import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import FetchClouds from './components/fetch-clouds';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Ubuntu', sans-serif;
    font-weight: 400;
  }
`;

const Content = styled.div`
  text-align: center;
`;

const Banner = styled.div`
  background-image: linear-gradient(
    -217deg,
    #ff7343 0%,
    #ff3554 97%,
    #ff3554 97%,
    #f35 100%
  );
  padding: 1.5rem;
`;

const Heading = styled.h1`
  font-family: inherit;
  font-weight: 500;
  color: white;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Content>
        <Banner>
          <Heading>Aiven Database as a Service</Heading>
        </Banner>
        <FetchClouds />
      </Content>
    </>
  );
};

export default App;
