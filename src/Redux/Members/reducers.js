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
  DELETE_MEMBER_ERROR
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
    case EDIT_MEMBER_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case EDIT_MEMBER_SUCCESS: {
      let updatedMembers = state.data.map((member) =>
        member._id === action.payload.id ? action.payload : member
      );
      return {
        ...state,
        isPending: false,
        data: updatedMembers
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
    default:
      return state;
  }
};

export default reducers;
