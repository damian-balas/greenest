import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled.input`
  padding: 1rem 2rem;
  border-radius: 5rem 0 0 5rem;
  border: none;
  font-size: 1.6rem;
  outline: none;
  width: 100%;
  box-shadow: 0px 10px 40px -15px rgba(0, 0, 0, 0.3);

  :focus {
    background: linear-gradient(
        90deg,
        rgb(197, 218, 139, 0.15),
        rgb(197, 218, 139, 0.15)
      ),
      linear-gradient(90deg, white, white);
  }
`;

const StyledForm = styled.form`
  display: flex;
  max-width: 40rem;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0 3rem;
`;

const StyledLabel = styled.label`
  text-align: center;
`;

const StyledList = styled.ul`
  text-align: center;
  list-style: none;
`;

const StyledErrorMessage = styled.div`
  color: rgb(214, 69, 65);
  padding: 1rem;
  text-align: center;
`;

const StyledListItem = styled.li`
  cursor: pointer;
  margin-top: 1rem;

  :hover {
    text-decoration: underline;
  }

  ${({ selected, theme }) =>
    selected &&
    css`
      color: ${theme.primary};
      font-weight: 600;
    `}
`;

const StyledButton = styled.button`
  font-size: 1.6rem;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0 5rem 5rem 0;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  cursor: pointer;
  outline: none;

  :disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  :hover,
  :focus {
    opacity: 0.8;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
`;

const localStorageCountry = localStorage.getItem('country');

class Form extends PureComponent {
  state = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: localStorageCountry || '',
  };

  handleChange = event => {
    const { suggestions } = this.props;
    const userInput = event.currentTarget.value;
    const filteredSuggestions = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(userInput.toLowerCase()),
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: !!filteredSuggestions.length && userInput,
      userInput,
    });
  };

  handleSuggestionClick = event => {
    const { handleSubmit } = this;
    this.setState(
      {
        activeSuggestion: 0,
        showSuggestions: false,
        filteredSuggestions: [],
        userInput: event.currentTarget.textContent,
      },
      () => handleSubmit(),
    );
  };

  handleKeyDown = event => {
    const {
      activeSuggestion,
      filteredSuggestions,
      showSuggestions,
    } = this.state;

    const isArrowUpPressed = event.keyCode === 38;
    const isArrowDownPressed = event.keyCode === 40;
    const isEnterPressed = event.keyCode === 13;

    if (isArrowUpPressed || isArrowDownPressed) {
      event.preventDefault();
    }

    if (isEnterPressed && showSuggestions) {
      this.setState(prevState => ({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[prevState.activeSuggestion],
      }));
    } else if (isArrowUpPressed) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState(prevState => ({
        activeSuggestion: prevState.activeSuggestion - 1,
      }));
    } else if (isArrowDownPressed) {
      if (activeSuggestion + 1 === filteredSuggestions.length) {
        return;
      }

      this.setState(prevState => ({
        activeSuggestion: prevState.activeSuggestion + 1,
      }));
    }
  };

  handleSubmit = event => {
    const { handleSubmit } = this.props;
    const { userInput } = this.state;
    if (event) {
      event.preventDefault();
    }
    handleSubmit(userInput);
  };

  render() {
    const {
      handleChange,
      handleSuggestionClick,
      handleKeyDown,
      handleSubmit,
    } = this;

    const {
      activeSuggestion,
      filteredSuggestions,
      showSuggestions,
      userInput,
    } = this.state;

    const { suggestions, errorMessage, isCountryInvalid } = this.props;

    return (
      <StyledForm autoComplete="off" onSubmit={handleSubmit}>
        <StyledLabel htmlFor="country">
          Find most polluted cities for country
        </StyledLabel>
        <StyledWrapper>
          <StyledInput
            type="text"
            id="country"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={userInput}
            required
            placeholder="I.e. Germany"
          />

          <StyledButton type="submit">submit</StyledButton>
        </StyledWrapper>
        {showSuggestions && (
          <StyledList>
            {filteredSuggestions.length !== 0 &&
              filteredSuggestions.map((suggestion, index) => (
                <StyledListItem
                  selected={index === activeSuggestion}
                  key={suggestion}
                  onClick={handleSuggestionClick}
                >
                  {suggestion}
                </StyledListItem>
              ))}
          </StyledList>
        )}
        {isCountryInvalid && (
          <StyledErrorMessage>
            Invalid country, try {suggestions.join(', ')}
          </StyledErrorMessage>
        )}
        {errorMessage && (
          <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
        )}
      </StyledForm>
    );
  }
}

Form.defaultProps = {
  suggestions: ['Poland', 'Germany', 'Spain', 'France'],
  errorMessage: '',
};

Form.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string),
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  isCountryInvalid: PropTypes.bool.isRequired,
};
export default Form;
