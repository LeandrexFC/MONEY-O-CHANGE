import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, fetchEconomyApi } from '../redux/actions';
import getEconomys from '../services/EconomyApi';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchEconomyApi());
  }

  onInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  saveExpenses = async () => {
    const { method, value, description, tag, currency, id } = this.state;

    const returnApi = await getEconomys();

    this.setState((prevState) => ({
      ...prevState,
      id: prevState.id + 1,
    }));

    const expensesObj = {
      id,
      method,
      value,
      description,
      tag,
      currency,
      exchangeRates: returnApi,
    };

    const { dispatch } = this.props;

    dispatch(addExpenses(expensesObj));

    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { wallet } = this.props;
    const { method, value, description,
      tag, currency } = this.state;
    return (
      <form>
        Despesa:
        <input
          type="number"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.onInputChange }
        />
        Descrição:
        <input
          type="text"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.onInputChange }
        />
        Moeda:
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.onInputChange }
        >
          {wallet.map((eachWallet) => (
            <option key={ eachWallet } value={ eachWallet }>
              {eachWallet}
            </option>
          ))}
        </select>
        <select
          name="method"
          data-testid="method-input"
          value={ method }
          onChange={ this.onInputChange }
        >
          <option
            value="Dinheiro"
            onChange={ this.onInputChange }
          >
            Dinheiro
          </option>
          <option
            value="Cartão de crédito"
            onChange={ this.onInputChange }
          >
            Cartão de crédito
          </option>
          <option
            value="Cartão de débito"
            onChange={ this.onInputChange }
          >
            Cartão de débito
          </option>
        </select>

        <select
          name="tag"
          data-testid="tag-input"
          onChange={ this.onInputChange }
          value={ tag }
        >
          <option
            value="Alimentação"
            onChange={ this.onInputChange }
          >
            Alimentação
          </option>
          <option
            value="Lazer"
            onChange={ this.onInputChange }
          >
            Lazer
          </option>
          <option
            value="Trabalho"
            onChange={ this.onInputChange }
          >
            Trabalho
          </option>
          <option
            value="Transporte"
            onChange={ this.onInputChange }
          >
            Transporte
          </option>
          <option
            value="Saúde"
            onChange={ this.onInputChange }
          >
            Saúde
          </option>
        </select>
        <button type="button" onClick={ this.saveExpenses }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (globalState) => ({
  wallet: globalState.wallet.currencies,
  ask: globalState.wallet.exchangeRates,
});

WalletForm.propTypes = {
  wallet: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
