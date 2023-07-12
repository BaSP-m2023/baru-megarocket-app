import {
  GET_MEMBERS_PENDING,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  ADD_MEMBER_PENDING,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_ERROR,
  EDIT_MEMBER_PENDING,
  EDIT_MEMBER_SUCCESS,
  EDIT_MEMBER_ERROR,
  DELETE_MEMBER_PENDING,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_ERROR,
  RESET_REDIRECT
} from './constants';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  error: null,
  redirect: false
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MEMBERS_PENDING: {
      return {
        ...state,
        isPending: true,
        redirect: false
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
        isPending: true,
        redirect: false
      };
    }
    case ADD_MEMBER_SUCCESS: {
      return {
        ...state,
        isPending: false,
        data: [...state.data, action.payload],
        redirect: true
      };
    }
    case ADD_MEMBER_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case EDIT_MEMBER_PENDING: {
      return {
        ...state,
        isPending: true,
        redirect: false
      };
    }
    case EDIT_MEMBER_SUCCESS: {
      const updated = state.data.find((mem) => mem._id === action.payload._id);
      const index = state.data.indexOf(updated);

      state.data[index] = action.payload;
      return {
        ...state,
        isPending: false,
        data: state.data,
        redirect: true
      };
    }
    case EDIT_MEMBER_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case DELETE_MEMBER_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case DELETE_MEMBER_SUCCESS: {
      const filteredMembers = state.data.filter((member) => member._id !== action.payload.id);
      return {
        ...state,
        isPending: false,
        data: filteredMembers
      };
    }
    case DELETE_MEMBER_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case RESET_REDIRECT: {
      return {
        ...state,
        redirect: false
      };
    }
    default:
      return state;
  }
};

export default reducers;
