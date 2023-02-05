/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses, editExpenses, inputsAtt } from '../redux/actions';
import '../allCss/Table.css';
import trashImg from '../Img/trash.png';
import editImg from '../Img/edit.png';

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
          <tr className="trTable">
            <th className="thTable2"> Descrição </th>
            <th className="thTable2"> Tag </th>
            <th className="thTable2">
              Método de
              <br />
              pagamento
            </th>
            <th className="thTable2"> Valor </th>
            <th className="thTable2">Moeda </th>
            <th className="thTable2"> Câmbio utilizado </th>
            <th className="thTable2"> Valor convertido </th>
            <th className="thTable2">
              Moeda de
              <br />
              conversão
            </th>
            <th className="thTable2 "> Editar/Excluir </th>
          </tr>
          {expenses.map((expense) => (
            <tr key={ expense.id } className="trBody">
              <td className="tdTable desc">{expense.description}</td>
              <td className="tdTable">{expense.tag}</td>
              <td className="tdTable">{expense.method}</td>
              <td className="tdTable">{(+expense.value).toFixed(2)}</td>
              <td className="tdTable desc2">
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

                <img
                  src={ editImg }
                  alt="edit Img"
                  className="btn-edit"
                  onClick={ () => this.editSomeExpenses(expense.id) }
                />

                <img
                  src={ trashImg }
                  alt="trash Img"
                  className="btn-edit"
                  onClick={ () => this.deleteAllExpenses(expense.id) }
                />
              </td>
            </tr>
          ))}
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
