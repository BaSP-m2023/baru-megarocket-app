import {
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SET_AUTHENTICATION,
  GET_AUTH_PENDING,
  GET_AUTH_ERROR,
  GET_AUTH_SUCCESS,
  RESET_STATE
} from 'Redux/Auth/constants';

const initialState = {
  isLoading: false,
  authenticated: false,
  user: undefined,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
    case LOGOUT_PENDING:
    case SIGN_UP_PENDING:
    case GET_AUTH_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_ERROR:
    case LOGOUT_ERROR:
    case SIGN_UP_ERROR:
    case GET_AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        user: action.payload
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        authenticated: false,
        user: undefined,
        role: undefined,
        email: undefined
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isLoading: false
      };
    }
    case GET_AUTH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: action.payload
      };
    }
    case SET_AUTHENTICATION: {
      return {
        ...state,
        authenticated: true,
        role: action.payload.role,
        email: action.payload.email
      };
    }
    case RESET_STATE: {
      return {
        ...state,
        error: false
      };
    }
    default:
      return state;
  }
};

export default authReducer;
