import { GET_ADMINS_PENDING, GET_ADMINS_SUCCESS, GET_ADMINS_ERROR } from './constants';

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
