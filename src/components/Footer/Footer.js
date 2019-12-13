import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  min-height: 10rem;
  margin-top: auto;
  background-color: ${({ theme }) => theme.primary};
  padding: 3rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.span`
  color: white;
  max-width: 130rem;
  margin: 0 auto;
`;

const StyledLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 600;
  :hover {
    text-decoration: underline;
  }
`;

const Footer = () => (
  <StyledFooter>
    <StyledText>
      &copy; 2019 Damian Balas <br />
      Thanks for using this app ❤️ <br />
      Save the world and plant some
      <StyledLink
        href="https://teamtrees.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {' '}
        trees
      </StyledLink>
      <br />
      Image created by
      <StyledLink
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.freepik.com/free-vector/environment-concept_799751.htm#page=5&query=pollution%20earth&position=46"
      >
        {' '}
        freepik
      </StyledLink>
    </StyledText>
  </StyledFooter>
);

export default Footer;
