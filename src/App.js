import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './theme/GlobalStyle';
import theme from './theme/mainTheme';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Form from './components/Form/Form';

class App extends Component {
  state = {
    country: '',
    isCountryInvalid: false,
  };

  handleSubmit = country => {
    const { countryMap } = this.props;
    if (!countryMap.has(country)) {
      this.setState({
        isCountryInvalid: true,
      });
    } else {
      this.setState({
        country,
        isCountryInvalid: false,
      });
    }
  };

  render() {
    const { handleSubmit } = this;
    const { isCountryInvalid } = this.state;
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Header />
          <main>
            <Hero />
            <Form
              isCountryInvalid={isCountryInvalid}
              handleSubmit={handleSubmit}
            />
          </main>
        </ThemeProvider>
      </>
    );
  }
}

App.defaultProps = {
  countryMap: new Map([
    ['Poland', 'PL'],
    ['Germany', 'DE'],
    ['Spain', 'ES'],
    ['France', 'FR'],
  ]),
};

App.propTypes = {
  countryMap: PropTypes.instanceOf(Map),
};
export default App;
