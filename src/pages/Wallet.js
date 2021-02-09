import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { walletAddCurrencies, walletAddExpenses, walletDelExpenses } from '../actions';
import fetchData from '../services/api';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
    this.fetchApi = this.fetchApi.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTotal = this.handleTotal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
    this.setState({
      value: 0,
    });
  }

  handleTotal() {
    const { expenses } = this.props;
    const totalField = expenses.reduce((acc, expense) => {
      const cot = expense.exchangeRates[expense.currency].ask;
      // console.log(cot);
      return acc + (parseFloat(expense.value) * parseFloat(cot));
    }, 0).toFixed(2);

    return totalField; // Rafa ajudou no entendimento do pq estava concatenando e não somando... (parseFloat)
  }

  handleDelete(id) {
    const { expenses, deleteExpenses } = this.props;
    const deleteItemFromID = expenses.filter((item) => item.id !== id);
    deleteExpenses(deleteItemFromID);
  }

  render() {
    const paymentMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    const { userEmail, currencies, expenses } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <div>
        <div>
          <h2 data-testid="email-field">
            Usuário:
            { userEmail }
          </h2>
          <h3
            data-testid="total-field"
          >
            { this.handleTotal() }
          </h3>
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
              id="currency"
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
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
              id="method"
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
              id="tag"
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
              onClick={ () => this.handleClick() }
            >
              Adicionar despesa
            </button>
          </div>
        </form>
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Descrição</th>
                <th scope="col">Tag</th>
                <th scope="col">Método de pagamento</th>
                <th scope="col">Valor</th>
                <th scope="col">Moeda</th>
                <th scope="col">Câmbio utilizado</th>
                <th scope="col">Valor convertido</th>
                <th scope="col">Moeda de conversão</th>
                <th scope="col">Editar/Excluir</th>
              </tr>
            </thead>
            <tbody>
              { expenses.map((item) => (
                <tr key={ item.id }>
                  <td>{item.description}</td>
                  <td>{item.tag}</td>
                  <td>{item.method}</td>
                  <td>{item.value}</td>
                  <td>{item.exchangeRates[item.currency].name}</td>
                  <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
                  <td>
                    {parseFloat(item.exchangeRates[item.currency].ask
                    * item.value).toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      className="btn btn-warning btn-sm"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      className="btn btn-danger btn-sm"
                      onClick={ () => this.handleDelete(item.id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
  addCurrencies: (currency) => dispatch(walletAddCurrencies(currency)),
  addExpenses: (expense) => dispatch(walletAddExpenses(expense)),
  deleteExpenses: (delexpense) => dispatch(walletDelExpenses(delexpense)),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  addCurrencies: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  deleteExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf.isRequired,
  expenses: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
