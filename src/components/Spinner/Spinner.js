import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  };
  100% {
    transform: rotate(360deg);
  };
`;

const defaultCss = css`
  border-radius: 50%;
  width: 12.5rem;
  height: 12.5rem;
`;

const StyledLoader = styled.div`
  ${defaultCss};
  margin: 3rem auto;
  font-size: 1rem;
  position: relative;
  text-indent: -9999em;
  border: 2rem solid rgba(0, 117, 98, 0.2);
  /* border-right: 1rem solid rgba(0, 117, 98, 0.2);
  border-bottom: 1rem solid rgba(0, 117, 98, 0.2); */
  border-left: 2rem solid ${({ theme }) => theme.primary};
  transform: translateZ(0);
  animation: ${spin} 1s infinite linear;

  ::after {
    ${defaultCss};
    position: absolute;
    top: 0;
    content: '';
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  height: 100vh;
  width: 100vw;
  text-align: center;
  font-size: 2.5rem;
`;

const Spinner = () => (
  <StyledWrapper>
    <StyledLoader />
    Fetching Data...
  </StyledWrapper>
);

export default Spinner;
