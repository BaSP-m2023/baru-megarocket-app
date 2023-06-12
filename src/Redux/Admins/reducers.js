import { GET_ADMINS_PENDING, GET_ADMINS_SUCCESS, GET_ADMINS_ERROR } from './constants';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  error: null
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING: {
      return {
        ...state,
        data: [],
        isPending: true,
        error: null
      };
    }
    case GET_ADMINS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isPending: false,
        error: null
      };
    }
    case GET_ADMINS_ERROR: {
      return {
        ...state,
        data: [],
        isPending: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default reducers;
