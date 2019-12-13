import React, { memo } from 'react';
import styled from 'styled-components';
import bgImage from '../../assets/images/environment.jpg';

const StyledHero = styled.section`
  padding: 5rem 3rem 0;
`;

const StyledImage = styled.div`
  background: url(${bgImage}) center/contain no-repeat;
  height: 55vh;
  min-height: 20rem;
  max-height: 40rem;
  @media (min-width: 35em) {
    max-height: 70rem;
  }
`;

const StyledText = styled.h2`
  font-size: 3rem;
  font-weight: 300;
  text-align: center;
  @media (min-height: 45em) and (min-width: 62.5em) {
    font-size: 4.5rem;
  }
`;

const PrimaryColorText = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

const Hero = () => (
  <StyledHero>
    <StyledText>
      Let us save <br /> the <PrimaryColorText>world</PrimaryColorText>
    </StyledText>
    <StyledImage />
  </StyledHero>
);

export default memo(Hero);
