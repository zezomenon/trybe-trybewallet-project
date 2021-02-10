import React from 'react';
import PropTypes from 'prop-types';
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
    const { login, history } = this.props;

    login(emailInput);
    history.push('/carteira');
  }

  render() {
    const { emailInput, passwordInput, disabled } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-5 col-lg-3 mx-auto">
            <div className="card my-5">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">
                      Email:
                      <input
                        type="email"
                        name="emailInput"
                        className="form-control"
                        data-testid="email-input"
                        value={ emailInput }
                        onChange={ this.handleChange }
                      />
                    </label>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">
                      Senha:
                      <input
                        type="password"
                        name="passwordInput"
                        className="form-control"
                        data-testid="password-input"
                        value={ passwordInput }
                        onChange={ this.handleChange }
                      />
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={ this.handleSubmit }
                    disabled={ disabled }
                  >
                    Entrar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
