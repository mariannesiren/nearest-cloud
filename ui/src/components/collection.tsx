import React from 'react';
import styled from 'styled-components';
import Heading from './Heading';
import Options from './Options';

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

const Collection = ({
  heading,
  options,
  selectedOptions,
  handleClick,
}: {
  heading: string;
  options: string[];
  selectedOptions: string[];
  handleClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
  return (
    <>
      <Heading>{heading}</Heading>
      <Options>
        {options.map((option) => (
          <Item
            active={
              selectedOptions.length === 0 || selectedOptions.includes(option)
                ? 'true'
                : 'false'
            }
            key={option}
            onClick={handleClick}
          >
            {option}
          </Item>
        ))}
      </Options>
    </>
  );
};

export default Collection;
