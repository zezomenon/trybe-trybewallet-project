import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { userEmail } = this.props;
    const totalField = 0;
    return (
      <div>
        <h2 data-testid="email-field">
          Usuário:
          { userEmail }
        </h2>
        <h3 data-testid="total-field">{ totalField }</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
