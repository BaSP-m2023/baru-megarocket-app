import {
  GET_CLASS_PENDING,
  GET_CLASS_SUCCESS,
  GET_CLASS_ERROR,
  ADD_CLASS_PENDING,
  ADD_CLASS_SUCCESS,
  ADD_CLASS_ERROR
} from './constants';

const INITIAL_STATE = {
  data: [],
  classId: {},
  isPending: false,
  error: false
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
        data: [...state.data, action.payload]
      };
    case ADD_CLASS_ERROR:
      return {
        ...state,
        isPending: false,
        error: true
      };
    default:
      return state;
  }
};

export default classReducer;
