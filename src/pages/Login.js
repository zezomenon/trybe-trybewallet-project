import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailInput: '',
      passwordInput: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateEmail(email) {
    const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (email.match(regexEmail)) {
      return true;
    }
    return false;
  }
  // source: github rafaelmguimaraes

  validatePassword(password) {
    const minLength = 6;

    if (password.length >= minLength) {
      return true;
    }
    return false;
  }
  // source: github rafaelmguimaraes

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value }, () => {
      const { emailInput, passwordInput } = this.state;
      if (this.validateEmail(emailInput) && this.validatePassword(passwordInput)) {
        this.setState({
          disabled: false,
        });
      } else {
        this.setState({
          disabled: true,
        });
      }
    });
    // source: github rafaelmguimaraes
  }

  handleSubmit() {
    const { emailInput } = this.state;
    const { login } = this.props;

    login(emailInput);
  }

  render() {
    const { emailInput, passwordInput, disabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="emailInput">
            Email:
            <input
              type="email"
              name="emailInput"
              data-testid="email-input"
              value={ emailInput }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="passwordInput">
            Senha:
            <input
              type="password"
              name="passwordInput"
              data-testid="password-input"
              value={ passwordInput }
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/carteira">
            <button
              type="submit"
              onClick={ this.handleSubmit }
              disabled={ disabled }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
