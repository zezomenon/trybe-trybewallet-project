import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletAddCurrencies, walletAddExpenses } from '../actions';
import fetchData from '../services/api';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
    };
    this.fetchApi = this.fetchApi.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  async fetchApi() {
    const { addCurrencies } = this.props;
    const api = await fetchData();
    const filteredData = Object.keys(api).filter((item) => item !== 'USDT');
    addCurrencies(filteredData);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { addExpenses } = this.props;
    const { id } = this.state;
    const zero = 0;
    if (id === '') {
      this.setState({
        id: zero,
        exchangeRates: await fetchData(),
      });
    } else {
      this.setState({
        id: id + 1,
        exchangeRates: await fetchData(),
      });
    }
    addExpenses(this.state);
  }

  render() {
    const paymentMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    const { userEmail, currencies } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const totalField = 0;

    return (
      <div>
        <div>
          <h2 data-testid="email-field">
            Usuário:
            { userEmail }
          </h2>
          <h3 data-testid="total-field">{ totalField }</h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </div>
        <form>
          <label htmlFor="value">
            Valor despesa:
            <input
              type="text"
              name="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição despesa:
            <input
              type="text"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              type="select"
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              {/* <option selected>Escolha...</option> */}
              {currencies.map(
                (item) => (
                  <option
                    key={ item }
                    value={ item }
                    data-testid={ item }
                  >
                    {item}
                  </option>),
              )}
            </select>
          </label>
          <label htmlFor="method">
            Método pagamento:
            <select
              type="select"
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              {paymentMethod.map(
                (item) => (
                  <option
                    key={ item }
                    value={ item }
                    data-testid={ item }
                  >
                    {item}
                  </option>),
              )}
            </select>
          </label>
          <label htmlFor="tag">
            Tags:
            <select
              type="select"
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              {tags.map(
                (item) => (
                  <option
                    key={ item }
                    value={ item }
                    data-testid={ item }
                  >
                    {item}
                  </option>),
              )}
            </select>
          </label>
          <div>
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrencies: (currencie) => dispatch(walletAddCurrencies(currencie)),
  addExpenses: (expense) => dispatch(walletAddExpenses(expense)),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  addCurrencies: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
