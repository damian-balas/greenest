import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-3rem);
  };
  to {
    opacity: 1;
    transform: translateY(0);
  };
`;

const StyledCitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  grid-gap: 3rem;
  margin: 6.5rem auto;
  max-width: 130rem;
  padding: 0 3rem;
`;

const StyledCity = styled.div`
  display: inline-flex;
  flex-direction: column;
  animation: ${fadeIn} 0.3s ease-out;
`;

const StyledCityName = styled.span`
  font-weight: 600;
  font-size: 2rem;
  text-align: center;
  border-radius: 2rem 2rem 0 0;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  padding: 1rem;
`;

const StyledCityDescription = styled.span`
  background: #fff;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
  border-radius: 0 0 2rem 2rem;
  padding: 3rem;
  flex: 1;
`;

const CitiesGrid = ({ cities }) => (
  <StyledCitiesGrid>
    {cities.map(({ pageid, title, extract }) => (
      <StyledCity key={pageid}>
        <StyledCityName>{title}</StyledCityName>
        <StyledCityDescription>{extract}</StyledCityDescription>
      </StyledCity>
    ))}
  </StyledCitiesGrid>
);

CitiesGrid.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CitiesGrid;
