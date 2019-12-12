import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './theme/GlobalStyle';
import theme from './theme/mainTheme';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Form from './components/Form/Form';
import getDateString from './utils/getDateString';

class App extends Component {
  state = {
    country: '',
    isCountryInvalid: false,
    cities: [],
    errorMessage: '',
  };

  getPollutedCities = async (countryAbbr, citiesLimit) => {
    const POLLUTED_CITIES_URL = `https://api.openaq.org/v1/measurements?country=${countryAbbr}&parameter=pm25&sort=desc&limit=500&order_by=value&date_from=${getDateString(
      new Date(),
    )}`;

    const response = await axios.get(POLLUTED_CITIES_URL);
    const { results } = response.data;
    const citiesSet = new Set();

    results.some(result => {
      if (!citiesSet.has(result.city)) {
        citiesSet.add(result.city);
      }
      return citiesSet.size === citiesLimit;
    });

    // remove part after backslash to be able to get data from wikipedia api
    return [...citiesSet].map(city =>
      city.includes('/') ? city.substring(0, city.indexOf('/')) : city,
    );
  };

  getCitiesDescription = async cities => {
    const CITIES_DESCRIPTION_URL = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&exsentences=2&format=json&origin=*&titles=${cities}`;

    const response = await axios.get(CITIES_DESCRIPTION_URL);

    return response;
  };

  handleSubmit = country => {
    const { COUNTRY_MAP, CITIES_LIMIT } = this.props;
    if (!COUNTRY_MAP.has(country)) {
      this.setState({
        isCountryInvalid: true,
      });
    } else {
      this.setState(
        {
          country,
          isCountryInvalid: false,
        },
        async () => {
          try {
            localStorage.setItem('country', country);
            this.setState({
              errorMessage: '',
            });
          } catch {
            this.setState({
              errorMessage: "Couldn't save to local storage",
            });
          }

          try {
            const countryAbbr = COUNTRY_MAP.get(country);
            const cities = await this.getPollutedCities(
              countryAbbr,
              CITIES_LIMIT,
            );

            const citiesWikipediaQuery = encodeURI(cities.join('|'));
            const citiesDescription = await this.getCitiesDescription(
              citiesWikipediaQuery,
            );
            const citiesArray = Object.values(
              citiesDescription.data.query.pages,
            );

            this.setState({
              cities: citiesArray,
              errorMessage: '',
            });
          } catch (error) {
            this.setState({
              errorMessage: error.message,
            });
          }
        },
      );
    }
  };

  render() {
    const { handleSubmit } = this;
    const { isCountryInvalid, errorMessage } = this.state;
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Header />
          <main>
            <Hero />
            <Form
              errorMessage={errorMessage}
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
  COUNTRY_MAP: new Map([
    ['Poland', 'PL'],
    ['Germany', 'DE'],
    ['Spain', 'ES'],
    ['France', 'FR'],
  ]),
  CITIES_LIMIT: 10,
};

App.propTypes = {
  COUNTRY_MAP: PropTypes.instanceOf(Map),
  CITIES_LIMIT: PropTypes.number,
};
export default App;
