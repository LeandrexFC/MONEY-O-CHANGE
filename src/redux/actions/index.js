import getEconomys from '../../services/EconomyApi';

export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_API = 'REQUEST_ISS';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const REQUEST_API_ERROR = 'REQUEST_API_ERROR';

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
    api: Object.keys(api).filter((key) => key !== 'USDT'),
  },
});

const responseApiError = (error) => ({
  type: REQUEST_API_ERROR,
  payload: {
    error,
  },
});

export const fetchEconomyApi = () => async (dispatch) => {
  dispatch(requestIss());
  try {
    const response = await getEconomys();
    dispatch(responseApiSuccess(response));
  } catch (error) {
    dispatch(responseApiError(error));
  }
};
