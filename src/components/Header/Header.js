import React, { memo } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  height: 10rem;
  padding: 3rem;
  max-width: 130rem;
  width: 100%;
  margin: 0 auto;
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

export default memo(Header);
