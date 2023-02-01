import { REQUEST_API,
  REQUEST_API_SUCCESS,
  REQUEST_API_ERROR,
  ADD_EXPENSES, DELETE_EXPENSES,
  EDIT_EXPENSES, EXPENSES_EDITED } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isLoading: false,
  errorMessage: null,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
    };
  case REQUEST_API_SUCCESS:
    return {
      ...state,
      isLoading: false,
      currencies: action.payload.currencies,
    };
  case REQUEST_API_ERROR:
    return {
      ...state,
      isLoading: false,
      errorMessage: action.payload.error || 'Error 404',
    };
  case ADD_EXPENSES:
    return {
      ...state,
      isLoading: false,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      isLoading: false,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case EXPENSES_EDITED:
    return {
      ...state,
      editor: false,
      expenses: action.payload,
    };

  default: return state;
  }
};

export default walletReducer;
