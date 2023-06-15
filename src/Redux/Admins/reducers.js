import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GET_ADMIN_BY_ID_PENDING,
  GET_ADMIN_BY_ID_SUCCESS,
  GET_ADMIN_BY_ID_ERROR,
  ADD_ADMIN_PENDING,
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_ERROR,
  EDIT_ADMIN_PENDING,
  EDIT_ADMIN_SUCCESS,
  EDIT_ADMIN_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR,
  RESET_STATE
} from './constants';

const INITIAL_STATE = {
  data: [],
  isPending: false,
  error: null,
  success: false
};

const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case GET_ADMINS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isPending: false,
        error: null
      };
    }
    case GET_ADMINS_ERROR: {
      return {
        ...state,
        data: [],
        isPending: false,
        error: action.payload
      };
    }
    case GET_ADMIN_BY_ID_PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case GET_ADMIN_BY_ID_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isPending: false
      };
    }
    case GET_ADMIN_BY_ID_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    }
    case ADD_ADMIN_PENDING: {
      return {
        ...state,
        isPending: true,
        error: null,
        success: false
      };
    }
    case ADD_ADMIN_SUCCESS: {
      return {
        ...state,
        data: [...state.data, action.payload],
        isPending: false,
        error: null,
        success: true
      };
    }
    case ADD_ADMIN_ERROR: {
      return {
        ...state,
        isPending: false,
        error: action.payload,
        success: false
      };
    }
    case EDIT_ADMIN_PENDING: {
      return {
        ...state,
        isPending: true,
        error: null,
        success: false
      };
    }
    case EDIT_ADMIN_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isPending: false,
        error: null,
        success: true
      };
    }
    case EDIT_ADMIN_ERROR: {
      return {
        ...state,
        data: [],
        isPending: false,
        error: action.payload,
        success: false
      };
    }
    case DELETE_ADMIN_PENDING: {
      return {
        ...state,
        isPending: false,
        error: null
      };
    }
    case DELETE_ADMIN_SUCCESS: {
      const newAdminData = state.data.filter((admin) => admin._id !== action.payload);
      return {
        ...state,
        data: newAdminData,
        isPending: false,
        error: null
      };
    }
    case DELETE_ADMIN_ERROR: {
      return {
        ...state,
        data: [],
        isPending: false,
        error: action.payload,
        success: false
      };
    }
    case RESET_STATE: {
      return {
        ...state,
        data: [],
        isPending: false,
        error: null,
        success: false
      };
    }
    default:
      return state;
  }
};

export default reducers;
