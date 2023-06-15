import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  ADD_SUPERADMIN_PENDING,
  ADD_SUPERADMIN_SUCCESS,
  ADD_SUPERADMIN_ERROR,
  EDIT_SUPERADMIN_PENDING,
  EDIT_SUPERADMIN_SUCCESS,
  EDIT_SUPERADMIN_ERROR,
  DELETE_SUPERADMIN_PENDING,
  DELETE_SUPERADMIN_SUCCESS,
  DELETE_SUPERADMIN_ERROR,
  RESET_PRIMARY_STATES
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

export const addSuperadminPending = () => ({
  type: ADD_SUPERADMIN_PENDING
});

export const addSuperadminSuccess = (data) => ({
  type: ADD_SUPERADMIN_SUCCESS,
  payload: data
});

export const addSuperadminError = (error) => ({
  type: ADD_SUPERADMIN_ERROR,
  payload: error
});

export const editSuperadminPending = () => ({
  type: EDIT_SUPERADMIN_PENDING
});

export const editSuperadminSuccess = (data) => ({
  type: EDIT_SUPERADMIN_SUCCESS,
  payload: data
});

export const editSuperadminError = (error) => ({
  type: EDIT_SUPERADMIN_ERROR,
  payload: error
});

export const deleteSuperadminPending = () => ({
  type: DELETE_SUPERADMIN_PENDING
});

export const deleteSuperadminSuccess = (data) => ({
  type: DELETE_SUPERADMIN_SUCCESS,
  payload: data
});

export const deleteSuperadminError = (error) => ({
  type: DELETE_SUPERADMIN_ERROR,
  payload: error
});

export const resetPrimaryStates = () => {
  return {
    type: RESET_PRIMARY_STATES
  };
};
