import React, { Component } from 'react';
import Header from './components/Header/Header';
import GlobalStyle from './theme/GlobalStyle';

class App extends Component {
  state = {};

  render() {
    return (
      <>
        <GlobalStyle />
        <Header />
      </>
    );
  }
}

export default App;
