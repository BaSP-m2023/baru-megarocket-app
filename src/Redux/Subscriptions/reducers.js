import {
  GET_SUBSCRIPTIONS_PENDING,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_ERROR,
  GET_BY_ID_SUBSCRIPTIONS_PENDING,
  GET_BY_ID_SUBSCRIPTIONS_SUCCESS,
  GET_BY_ID_SUBSCRIPTIONS_ERROR,
  ADD_SUBSCRIPTIONS_PENDING,
  ADD_SUBSCRIPTIONS_SUCCESS,
  ADD_SUBSCRIPTIONS_ERROR,
  RESET_STATE
} from './constants';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  success: false,
  error: null
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUBSCRIPTIONS_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case GET_SUBSCRIPTIONS_SUCCESS: {
      return {
        ...state,
        isPending: false,
        data: action.payload
      };
    }
    case GET_SUBSCRIPTIONS_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case GET_BY_ID_SUBSCRIPTIONS_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case GET_BY_ID_SUBSCRIPTIONS_SUCCESS: {
      return {
        ...state,
        isPending: false,
        data: action.payload
      };
    }
    case GET_BY_ID_SUBSCRIPTIONS_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case ADD_SUBSCRIPTIONS_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case ADD_SUBSCRIPTIONS_SUCCESS: {
      return {
        ...state,
        isPending: false,
        success: true,
        data: [...state.data, action.payload]
      };
    }
    case ADD_SUBSCRIPTIONS_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case RESET_STATE: {
      return {
        ...state,
        isPending: false,
        success: false,
        error: null
      };
    }
    default:
      return state;
  }
};

export default reducers;
