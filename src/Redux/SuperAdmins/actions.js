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
  DELETE_SUPERADMIN_ERROR
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

export const addSuperadminSuccess = () => ({
  type: ADD_SUPERADMIN_SUCCESS
});

export const addSuperadminError = (error) => ({
  type: ADD_SUPERADMIN_ERROR,
  payload: error
});

export const editSuperadminPending = () => ({
  type: EDIT_SUPERADMIN_PENDING
});

export const editSuperadminSuccess = () => ({
  type: EDIT_SUPERADMIN_SUCCESS
});

export const editSuperadminError = (error) => ({
  type: EDIT_SUPERADMIN_ERROR,
  payload: error
});

export const deleteSuperadminPending = () => ({
  type: DELETE_SUPERADMIN_PENDING
});

export const deleteSuperadminSuccess = (idToDelete) => ({
  type: DELETE_SUPERADMIN_SUCCESS,
  payload: idToDelete
});

export const deleteSuperadminError = (error) => ({
  type: DELETE_SUPERADMIN_ERROR,
  payload: error
});
