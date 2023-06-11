import {
  GET_MEMBERS_PENDING,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  ADD_MEMBER_PENDING,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_ERROR
} from './constants';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  error: null
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MEMBERS_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case GET_MEMBERS_SUCCESS: {
      return {
        ...state,
        isPending: false,
        data: action.payload
      };
    }
    case GET_MEMBERS_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case ADD_MEMBER_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case ADD_MEMBER_SUCCESS: {
      return {
        ...state,
        isPending: false,
        data: [...state.data, action.payload]
      };
    }
    case ADD_MEMBER_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default reducers;
