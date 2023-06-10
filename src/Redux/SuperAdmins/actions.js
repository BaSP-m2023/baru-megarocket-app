import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR
} from './constants';

export const getSuperadminsPending = () => ({
  type: GET_SUPERADMINS_PENDING
});

export const getSuperadminsSuccess = (data) => ({
  type: GET_SUPERADMINS_SUCCESS,
  payload: data
});

export const getSuperadminsError = (error) => ({
  type: GET_SUPERADMINS_ERROR,
  payload: error
});
