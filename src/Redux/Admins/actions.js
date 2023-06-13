import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GET_ADMIN_BY_ID_PENDING,
  GET_ADMIN_BY_ID_SUCCESS,
  GET_ADMIN_BY_ID_ERROR,
  ADD_ADMIN_PENDING,
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_ERROR
} from './constants';

export const getAdminsPending = () => {
  return {
    type: GET_ADMINS_PENDING
  };
};

export const getAdminsSuccess = (admins) => {
  return {
    type: GET_ADMINS_SUCCESS,
    payload: admins
  };
};

export const getAdminsError = (error) => {
  return {
    type: GET_ADMINS_ERROR,
    payload: error
  };
};

export const getAdminByIdPending = () => {
  return {
    type: GET_ADMIN_BY_ID_PENDING
  };
};

export const getAdminBydIdSuccess = (admin) => {
  return {
    type: GET_ADMIN_BY_ID_SUCCESS,
    payload: admin
  };
};

export const getAdminByIdError = (error) => {
  return {
    type: GET_ADMIN_BY_ID_ERROR,
    payload: error
  };
};

export const addAdminPending = () => {
  return {
    type: ADD_ADMIN_PENDING
  };
};

export const addAdminSuccess = (admin) => {
  return {
    type: ADD_ADMIN_SUCCESS,
    payload: admin
  };
};

export const addAdminError = (error) => {
  return {
    type: ADD_ADMIN_ERROR,
    payload: error
  };
};
