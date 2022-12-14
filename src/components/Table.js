import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses, editExpenses } from '../redux/actions';

class Table extends Component {
  deleteAllExpenses = (expenseId) => {
    const { dispatch } = this.props;

    dispatch(deleteExpenses(expenseId));
  };

  editSomeExpenses = (expense) => {
    const { dispatch } = this.props;

    dispatch(editExpenses(expense));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th> Descrição </th>
              <th> Tag </th>
              <th> Método de pagamento </th>
              <th> Valor </th>
              <th> Moeda </th>
              <th> Câmbio utilizado </th>
              <th> Valor convertido </th>
              <th> Moeda de conversão </th>
              <th> Editar/Excluir </th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>
                    {expense.description}
                  </td>
                  <td>
                    {expense.tag}
                  </td>
                  <td>
                    {expense.method}
                  </td>
                  <td>
                    { (+expense.value).toFixed(2) }
                  </td>
                  <td>
                    { expense.exchangeRates[expense.currency].name }
                  </td>
                  <td>
                    { (+expense.exchangeRates[expense.currency].ask).toFixed(2) }
                  </td>
                  <td>
                    { (+expense.value
                  * expense.exchangeRates[expense.currency].ask).toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
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
              ))
            }
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
