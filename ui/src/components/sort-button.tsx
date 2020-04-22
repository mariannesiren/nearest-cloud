import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  background: #ff7343;
  padding: 0.5rem;
  margin: 1rem auto auto auto;
  color: white;
  border-radius: 3px;
  cursor: pointer;
`;

const SortButton = ({
  handleClick,
}: {
  handleClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
  return (
    <>
      <Button onClick={handleClick}>
        Sort clouds by distance from your location
      </Button>
      <div id="locationInformation"></div>
    </>
  );
};

export default SortButton;
