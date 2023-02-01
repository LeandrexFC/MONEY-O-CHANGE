import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logoTrybe from '../Img/logoTrybeWallet.png';
import '../allCss/Header.css';

class Header extends Component {
  render() {
    const { email, wallet } = this.props;
    const getExpensesSum = wallet.reduce((acc, acum) => acc
  + acum.value * acum.exchangeRates[acum.currency].ask, 0);

    return (
      <div className="header">
        <div className="allHeader">
          <img src={ logoTrybe } alt="logo Img" className="headerImg" />
          <p className="expenses">
            Total de despesas:
            { ' ' }
            <span data-testid="total-field">
              { getExpensesSum.toFixed(2) }
            </span>
            <span data-testid="header-currency-field"> BRL </span>
          </p>
          <p data-testid="email-field" className="email">
            Email:
            {' '}
            { email }
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  wallet: globalState.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  reduce: PropTypes.func.isRequired,
  wallet: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
