import {
  setDefaultAdmin,
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  getAdminByIdPending,
  getAdminBydIdSuccess,
  getAdminByIdError,
  addAdminPending,
  addAdminSuccess,
  addAdminError,
  editAdminPending,
  editAdminSuccess,
  editAdminError,
  deleteAdminPending,
  deleteAdminSuccess,
  deleteAdminError
} from './actions';

import { handleDisplayToast, setContentToast } from '../Shared/ResponseToast/actions';

export const getAdmins = async (dispatch) => {
  dispatch(getAdminsPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
    const res = await response.json();
    dispatch(getAdminsSuccess(res.data));
    dispatch(setDefaultAdmin(res.data[0]));
  } catch (error) {
    dispatch(getAdminsError(error.message));
  }
};

export const getAdminsById = async (dispatch, id) => {
  dispatch(getAdminByIdPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
      method: 'GET'
    });
    const res = await response.json();
    const body = res.data;
    dispatch(getAdminBydIdSuccess(body));
  } catch (error) {
    dispatch(getAdminByIdError(error.message));
  }
};

export const addAdmin = async (dispatch, adminToAdd) => {
  dispatch(addAdminPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(adminToAdd)
    });
    const res = await response.json();
    if (response.ok) {
      dispatch(addAdminSuccess(res.data));
      dispatch(setContentToast({ message: res.message, state: 'success' }));
      dispatch(handleDisplayToast(true));
    } else {
      dispatch(addAdminError(res));
      dispatch(setContentToast({ message: res.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  } catch (error) {
    dispatch(addAdminError(error));
    dispatch(setContentToast({ message: error.message, state: 'fail' }));
    dispatch(handleDisplayToast(true));
  }
};

export const editAdmin = async (dispatch, id, adminToUpdate) => {
  dispatch(editAdminPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(adminToUpdate)
    });
    const res = await response.json();
    if (response.ok) {
      dispatch(editAdminSuccess(res.data));
      dispatch(setContentToast({ message: res.message, state: 'success' }));
      dispatch(handleDisplayToast(true));
      dispatch(setDefaultAdmin(res.data));
    } else {
      dispatch(editAdminError(res.message));
      dispatch(setContentToast({ message: res.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  } catch (error) {
    dispatch(editAdminError(error.message));
    dispatch(setContentToast({ message: error.message, state: 'fail' }));
    dispatch(handleDisplayToast(true));
  }
};

export const deleteAdmin = async (dispatch, id) => {
  dispatch(deleteAdminPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/delete/${id}`, {
      method: 'DELETE'
    });
    const res = await response.json();
    if (response.ok) {
      dispatch(deleteAdminSuccess(id));
      dispatch(setContentToast({ message: res.message, state: 'success' }));
      dispatch(handleDisplayToast(true));
      getAdmins(dispatch);
    } else {
      dispatch(deleteAdminError(res));
      dispatch(setContentToast({ message: res, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  } catch (error) {
    dispatch(deleteAdminError(error.message));
    dispatch(setContentToast({ message: error.message, state: 'fail' }));
    dispatch(handleDisplayToast(true));
  }
};
