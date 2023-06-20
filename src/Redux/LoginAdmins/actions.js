import {
  LOGIN_ADMIN_PENDING,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_ERROR,
  LOGOUT_ADMIN
} from './constants';

export const loginAdminPending = () => {
  return {
    type: LOGIN_ADMIN_PENDING
  };
};

export const loginAdminSuccess = (data) => {
  return {
    type: LOGIN_ADMIN_SUCCESS,
    payload: data
  };
};

export const loginAdminError = (error) => {
  return {
    type: LOGIN_ADMIN_ERROR,
    payload: error
  };
};

export const logoutAdmin = () => {
  return {
    type: LOGOUT_ADMIN
  };
};
