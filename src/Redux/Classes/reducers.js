import {
  GET_CLASS_PENDING,
  GET_CLASS_SUCCESS,
  GET_CLASS_ERROR,
  ADD_CLASS_PENDING,
  ADD_CLASS_SUCCESS,
  ADD_CLASS_ERROR,
  RESET_PRIMARY_STATES
} from './constants';

const INITIAL_STATE = {
  data: [],
  classId: {},
  isPending: false,
  error: false,
  success: false
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
        error: true
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
        data: [...state.data, action.payload],
        success: true
      };
    case ADD_CLASS_ERROR:
      return {
        ...state,
        isPending: false,
        error: true
      };
    case RESET_PRIMARY_STATES: {
      return {
        ...state,
        error: false,
        success: false
      };
    }
    default:
      return state;
  }
};

export default classReducer;
