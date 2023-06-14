import {
  EDIT_SUBSCRIPTIONS_PENDING,
  EDIT_SUBSCRIPTIONS_SUCCESS,
  EDIT_SUBSCRIPTIONS_ERROR,
  DELETE_SUBSCRIPTIONS_PENDING,
  DELETE_SUBSCRIPTIONS_SUCCESS,
  DELETE_SUBSCRIPTIONS_ERROR,
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

const subscriptionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDIT_SUBSCRIPTIONS_PENDING:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case EDIT_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        isPending: false,
        data: action.payload,
        success: true,
        error: false
      };
    case EDIT_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        isPending: false,
        data: null,
        error: action.payload
      };
    case DELETE_SUBSCRIPTIONS_PENDING:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case DELETE_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        isPending: false,
        data: action.payload,
        success: true,
        error: false
      };
    case DELETE_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        isPending: false,
        data: null,
        error: action.payload
      };
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
        data: action.payload,
        success: true
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
        data: action.payload,
        success: true
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

export default subscriptionReducer;
