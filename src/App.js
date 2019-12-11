import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './theme/GlobalStyle';
import theme from './theme/mainTheme';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';

class App extends Component {
  state = {};

  render() {
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Header />
          <main>
            <Hero />
          </main>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
