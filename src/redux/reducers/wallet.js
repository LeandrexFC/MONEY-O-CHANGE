import { REQUEST_API, REQUEST_API_SUCCESS, REQUEST_API_ERROR } from '../actions';

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
  case REQUEST_API: {
    return {
      ...state,
      isLoading: true,
    };
  }

  case REQUEST_API_SUCCESS: {
    return {
      ...state,
      isLoading: false,
      currencies: action.payload.api,
    };
  }

  case REQUEST_API_ERROR: {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.payload.error || 'Error 404',
    };
  }

  default: return state;
  }
};

export default walletReducer;
