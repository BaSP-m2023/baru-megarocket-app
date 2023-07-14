import {
  GET_TRAINERS_PENDING,
  GET_TRAINERS_ERROR,
  GET_TRAINERS_SUCCESS,
  ADD_TRAINER_PENDING,
  ADD_TRAINER_SUCCESS,
  ADD_TRAINER_ERROR,
  EDIT_TRAINER_PENDING,
  EDIT_TRAINER_SUCCESS,
  EDIT_TRAINER_ERROR,
  DELETE_TRAINER_PENDING,
  DELETE_TRAINER_SUCCESS,
  DELETE_TRAINER_ERROR,
  SET_REDIRECT
} from './constants';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  error: null,
  redirect: false
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
    case ADD_TRAINER_PENDING:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case ADD_TRAINER_SUCCESS:
      return {
        ...state,
        isPending: false,
        data: [...state.data, action.payload],
        error: null,
        redirect: true
      };
    case ADD_TRAINER_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    case EDIT_TRAINER_PENDING:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case EDIT_TRAINER_SUCCESS: {
      const updated = state.data.find((trainer) => trainer._id === action.payload._id);
      const index = state.data.indexOf(updated);

      state.data[index] = action.payload;
      return {
        ...state,
        data: state.data,
        isPending: false,
        error: null,
        redirect: true
      };
    }
    case EDIT_TRAINER_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    case DELETE_TRAINER_PENDING:
      return {
        ...state,
        isPending: true,
        error: null
      };
    case DELETE_TRAINER_SUCCESS:
      return {
        ...state,
        isPending: false,
        data: state.data.filter((trainer) => trainer.id !== action.payload),
        error: null
      };
    case DELETE_TRAINER_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    case SET_REDIRECT: {
      return {
        ...state,
        redirect: false
      };
    }
    default:
      return state;
  }
};

export default trainersReducer;
