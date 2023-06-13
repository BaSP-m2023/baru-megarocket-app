import {
  PUT_SUBSCRIPTIONS_PENDING,
  PUT_SUBSCRIPTIONS_SUCCESS,
  PUT_SUBSCRIPTIONS_ERROR,
  DELETE_SUBSCRIPTIONS_PENDING,
  DELETE_SUBSCRIPTIONS_SUCCESS,
  DELETE_SUBSCRIPTIONS_ERROR,
  RESET_STATE
} from './constants';

const INITIAL_STATE = {
  isPending: false,
  data: [],
  success: false,
  error: null
};

const subscriptionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PUT_SUBSCRIPTIONS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case PUT_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        success: true,
        error: false
      };
    case PUT_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.payload
      };
    case DELETE_SUBSCRIPTIONS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case DELETE_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        success: true,
        error: false
      };
    case DELETE_SUBSCRIPTIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.payload
      };
    case RESET_STATE:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: null
      };
    default:
      return state;
  }
};

export default subscriptionReducer;
