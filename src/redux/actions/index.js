import getEconomys from '../../services/EconomyApi';

export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_API = 'REQUEST_ISS';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const REQUEST_API_ERROR = 'REQUEST_API_ERROR';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REQUEST_TASK_SUCCESS = 'REQUEST_TASK_SUCCESS';
export const ATT_STATE_REDUX = 'ATT_STATE_REDUX';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: {
    email,
  },
});

const requestIss = () => ({
  type: REQUEST_API,
});

const responseApiSuccess = (api) => ({
  type: REQUEST_API_SUCCESS,
  payload: {
    currencies: api,
  },
});

const responseApiError = (error) => ({
  type: REQUEST_API_ERROR,
  payload: {
    error,
  },
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  payload: expenses,

});

export const getFetchEconomyApi = () => async (dispatch) => {
  dispatch(requestIss());
  try {
    const response = await getEconomys();
    dispatch(attStateRedux(response));
  } catch (error) {
    dispatch(responseApiError(error));
  }
};

export const fetchEconomyApi = () => async (dispatch) => {
  dispatch(requestIss());
  try {
    const response = await getEconomys();
    dispatch(responseApiSuccess(Object.keys(response)
      .filter((results) => results !== 'USDT')));
  } catch (error) {
    dispatch(responseApiError(error));
  }
};
