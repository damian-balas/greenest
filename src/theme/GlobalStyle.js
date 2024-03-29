import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:300,600&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    font-family: "Montserrat";
    line-height: 1.4;
    overflow-x: hidden;
    background-color: #edeadb;

    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  button, input {
    font-family: inherit;
  }

  #root {
    display: flex;
    flex-direction: column;
    flex: 1
  }
`;

export default GlobalStyle;
