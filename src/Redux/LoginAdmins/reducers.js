import {
  LOGIN_ADMIN_PENDING,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_ERROR,
  LOGOUT_ADMIN
} from './constants';

const INITIAL_STATE = {
  adminData: [],
  isPending: false,
  error: false,
  adminIsLogged: false
};

const loginAdminsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_ADMIN_PENDING:
      return {
        ...state,
        isPending: true
      };
    case LOGIN_ADMIN_SUCCESS:
      return {
        ...state,
        isPending: false,
        adminIsLogged: true,
        adminData: action.payload
      };
    case LOGIN_ADMIN_ERROR:
      return {
        ...state,
        isPending: false,
        error: true
      };
    case LOGOUT_ADMIN:
      return {
        ...state,
        adminData: [],
        adminIsLogged: false
      };
    default:
      return state;
  }
};

export default loginAdminsReducer;
