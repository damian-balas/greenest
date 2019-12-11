import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  height: 5rem;
  padding: 3rem;
`;

const StyledLogo = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.primary};
`;

const Header = () => (
  <StyledHeader>
    <StyledLogo>.greenest</StyledLogo>
  </StyledHeader>
);

export default Header;
