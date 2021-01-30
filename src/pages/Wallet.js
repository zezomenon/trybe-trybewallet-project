import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchData, wallet } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.fetchApi = this.fetchApi.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  async fetchApi() {
    const { walletData } = this.props;
    const api = await fetchData();
    const filteredData = Object.keys(api).filter((item) => item !== 'USDT');
    walletData(filteredData);
  }

  render() {
    const paymentMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    const { userEmail, currencies } = this.props;
    // const {  } = this.state;
    console.log(currencies);
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
          <label htmlFor="valueInput">
            Valor despesa:
            <input
              type="text"
              name="valueInput"
              data-testid="value-input"
              // value={ valueInput }
              // onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descriptionInput">
            Descrição despesa:
            <input
              type="text"
              name="descriptionInput"
              data-testid="description-input"
              // value={ valueInput }
              // onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currencyInput">
            Moeda:
            <select
              type="select"
              name="currencyInput"
              data-testid="currency-input"
              // value={ valueInput }
              // onChange={ this.handleChange }
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
          <label htmlFor="methodInput">
            Método pagamento:
            <select
              type="select"
              name="methodInput"
              data-testid="method-input"
              // value={ valueInput }
              // onChange={ this.handleChange }
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
          <label htmlFor="tagInput">
            Tags:
            <select
              type="select"
              name="tagInput"
              data-testid="tag-input"
              // value={ valueInput }
              // onChange={ this.handleChange }
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
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  walletData: (currencie) => dispatch(wallet(currencie)),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  walletData: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
