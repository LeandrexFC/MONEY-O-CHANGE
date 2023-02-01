/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses, editExpenses, inputsAtt } from '../redux/actions';
import '../allCss/Table.css';

class Table extends Component {
  deleteAllExpenses = (expenseId) => {
    const { dispatch } = this.props;

    dispatch(deleteExpenses(expenseId));
  };

  editSomeExpenses = (expense) => {
    const { dispatch, expenses } = this.props;

    const { value, description, currency, method, tag } = expenses[expense];

    const inputsObj = {
      value,
      description,
      currency,
      method,
      tag,
    };

    dispatch(editExpenses(expense));
    dispatch(inputsAtt(inputsObj));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="allTable">
        <table className="table">
          <thead className="thead">
            <tr className="trTable">
              <th> Descrição </th>
              <th> Tag </th>
              <th>
                Método de
                <br />
                pagamento
              </th>
              <th> Valor </th>
              <th> Moeda </th>
              <th> Câmbio utilizado </th>
              <th> Valor convertido </th>
              <th>
                Moeda de
                <br />
                conversão
              </th>
              <th> Editar/Excluir </th>
            </tr>
          </thead>
          <tbody className="tbody">
            {expenses.map((expense) => (
              <tr key={ expense.id } className="trBody">
                <td className="tdTable">{expense.description}</td>
                <td className="tdTable">{expense.tag}</td>
                <td className="tdTable">{expense.method}</td>
                <td className="tdTable3">{(+expense.value).toFixed(2)}</td>
                <td className="tdTable">
                  {expense.exchangeRates[expense.currency].name.split('/')[0]}
                </td>
                <td className="tdTable">
                  {(+expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td className="tdTable">
                  {(
                    +expense.value * expense.exchangeRates[expense.currency].ask
                  ).toFixed(2)}
                </td>
                <td className="tdTable">Real</td>
                <td className="tdTable">
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editSomeExpenses(expense.id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteAllExpenses(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
  edit: globalState.wallet.editor,
});

export default connect(mapStateToProps)(Table);
