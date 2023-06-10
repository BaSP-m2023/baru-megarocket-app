import { GET_TRAINERS_PENDING, GET_TRAINERS_ERROR, GET_TRAINERS_SUCCESS } from './constants';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  error: null
};

const trainersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TRAINERS_PENDING:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case GET_TRAINERS_SUCCESS:
      return {
        ...state,
        isPending: false,
        data: action.payload,
        error: null
      };
    case GET_TRAINERS_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default trainersReducer;
