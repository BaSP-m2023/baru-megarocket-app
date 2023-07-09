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
  UPDATE_USER
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
    case UPDATE_USER: {
      let updatedUser;

      if (action.payload.name) {
        updatedUser = {
          ...state.user,
          name: action.payload.name,
          lastName: action.payload.lastName
        };
      } else {
        updatedUser = {
          ...state.user,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName
        };
      }
      console.log(updatedUser);

      return {
        ...state,
        user: updatedUser
      };
    }

    default:
      return state;
  }
};

export default authReducer;
