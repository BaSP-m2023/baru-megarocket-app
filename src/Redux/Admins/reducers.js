import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GET_ADMIN_BY_ID_PENDING,
  GET_ADMIN_BY_ID_SUCCESS,
  GET_ADMIN_BY_ID_ERROR,
  ADD_ADMIN_PENDING,
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_ERROR
} from './constants';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  error: null,
  stateRes: null,
  successMessage: null
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
    case GET_ADMIN_BY_ID_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case GET_ADMIN_BY_ID_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isPending: false
      };
    }
    case GET_ADMIN_BY_ID_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case ADD_ADMIN_PENDING: {
      return {
        ...state,
        data: [],
        isPending: true,
        error: null,
        stateRes: null
      };
    }
    case ADD_ADMIN_SUCCESS: {
      return {
        ...state,
        data: [...state.data, action.payload.adminCreated],
        isPending: false,
        error: null,
        stateRes: 'success',
        successMessage: action.payload.successMessage
      };
    }
    case ADD_ADMIN_ERROR: {
      return {
        ...state,
        data: [],
        isPending: false,
        error: action.payload,
        stateRes: 'fail'
      };
    }
    default:
      return state;
  }
};

export default reducers;
