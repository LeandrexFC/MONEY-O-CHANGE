import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const { wallet } = this.props;

    return (
      <form>
        Despesa:
        <input type="number" data-testid="value-input" />
        Descrição:
        <input type="text" data-testid="description-input" />
        Moeda:
        <select data-testid="currency-input">
          {wallet.map((eachWallet) => (
            <option key={ eachWallet } value={ eachWallet }>
              {eachWallet}
            </option>
          ))}
        </select>
        <select data-testid="method-input">
          <option> Dinheiro </option>
          <option> Cartão de crédito </option>
          <option> Cartão de débito </option>
        </select>

        <select data-testid="tag-input">
          <option> Alimentação </option>
          <option> Lazer </option>
          <option> Trabalho </option>
          <option> Transporte </option>
          <option> Saúde </option>

        </select>
      </form>
    );
  }
}

const mapStateToProps = (globalState) => ({
  wallet: globalState.wallet.currencies,
});

WalletForm.propTypes = {
  wallet: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
