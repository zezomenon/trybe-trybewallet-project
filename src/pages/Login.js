import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailInput: '',
      passwordInput: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { emailInput, passwordInput } = this.state;
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
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
