import {
  GET_CLASS_PENDING,
  GET_CLASS_SUCCESS,
  GET_CLASS_ERROR,
  ADD_CLASS_PENDING,
  ADD_CLASS_SUCCESS,
  ADD_CLASS_ERROR,
  RESPONSE_MODAL
} from './constants';

const INITIAL_STATE = {
  data: [],
  createData: null,
  isPending: false,
  response: { show: false, msg: '', state: '' },
  error: null
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
    case ADD_CLASS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case ADD_CLASS_SUCCESS:
      return {
        ...state,
        isPending: false,
        createData: action.payload,
        error: false
      };
    case ADD_CLASS_ERROR:
      return {
        ...state,
        isPending: false,
        createData: null,
        error: action.payload
      };
    case RESPONSE_MODAL:
      return {
        ...state,
        isPending: false,
        response: action.payload,
        createData: null
      };
    default:
      return state;
  }
};

export default classReducer;
