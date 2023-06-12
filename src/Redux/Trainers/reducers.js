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
  SHOW_RESPONSE_MODAL,
  HIDE_RESPONSE_MODAL
} from './constants';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  error: null,
  responseModal: false
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
        error: null
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
    case EDIT_TRAINER_SUCCESS:
      return {
        ...state,
        isPending: false,
        data: state.data.map((trainer) =>
          trainer.id === action.payload.id ? action.payload : trainer
        ),
        error: null
      };
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
    case SHOW_RESPONSE_MODAL:
      return {
        ...state,
        responseModal: {
          message: action.payload.message,
          state: action.payload.state
        }
      };
    case HIDE_RESPONSE_MODAL:
      return {
        ...state,
        responseModal: false
      };
    default:
      return state;
  }
};

export default trainersReducer;
