import {
  GET_CLASS_PENDING,
  GET_CLASS_SUCCESS,
  GET_CLASS_ERROR,
  DELETE_CLASS_PENDING,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_ERROR,
  REFRESH_DATA,
  RESPONSE_MODAL
} from './constants';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  error: null,
  response: { show: false, msg: '', state: '' }
};

const classReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CLASS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case GET_CLASS_SUCCESS:
      return {
        ...state,
        isPending: false,
        data: action.payload
      };
    case GET_CLASS_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    case DELETE_CLASS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case DELETE_CLASS_SUCCESS:
      return {
        ...state,
        isPending: false,
        data: action.payload
      };
    case DELETE_CLASS_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    case RESPONSE_MODAL:
      return {
        ...state,
        isPending: false,
        response: action.payload,
        error: false
      };
    case REFRESH_DATA:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};

export default classReducer;
