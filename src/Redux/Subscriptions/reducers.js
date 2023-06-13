import {
  PUT_MEMBERS_PENDING,
  PUT_MEMBERS_SUCCESS,
  PUT_MEMBERS_ERROR,
  DELETE_MEMBERS_PENDING,
  DELETE_MEMBERS_SUCCESS,
  DELETE_MEMBERS_ERROR
} from './constants';

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null
};

const subscriptionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PUT_MEMBERS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case PUT_MEMBERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false
      };
    case PUT_MEMBERS_ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload
      };
    case DELETE_MEMBERS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_MEMBERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false
      };
    case DELETE_MEMBERS_ERROR:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default subscriptionReducer;
