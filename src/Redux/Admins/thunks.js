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
  deleteAdminError,
  setRedirect
} from 'Redux/Admins/actions';

import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';

const token = sessionStorage.getItem('token');

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token
        }
      });
      const res = await response.json();
      dispatch(getAdminsSuccess(res.data));
      dispatch(setDefaultAdmin(res.data[0]));
    } catch (error) {
      dispatch(getAdminsError(error.message));
    }
  };
};

export const getAdminsById = (id) => {
  return async (dispatch) => {
    dispatch(getAdminByIdPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token
        }
      });
      const res = await response.json();
      const body = res.data;
      dispatch(getAdminBydIdSuccess(body));
    } catch (error) {
      dispatch(getAdminByIdError(error.message));
    }
  };
};

export const addAdmin = (adminToAdd) => {
  return async (dispatch) => {
    dispatch(addAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          token: token
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
};

export const editAdmin = (id, adminToUpdate) => {
  return async (dispatch) => {
    dispatch(editAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          token: token
        },
        body: JSON.stringify(adminToUpdate)
      });
      const res = await response.json();
      if (response.ok) {
        dispatch(editAdminSuccess(res.data));
        dispatch(setContentToast({ message: res.message, state: 'success' }));
        dispatch(handleDisplayToast(true));
        dispatch(setDefaultAdmin(res.data));
        dispatch(setRedirect());
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
};

export const deleteAdmin = (id) => {
  return async (dispatch) => {
    dispatch(deleteAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          token: token
        }
      });
      const res = await response.json();
      if (response.ok) {
        dispatch(deleteAdminSuccess(id));
        dispatch(setContentToast({ message: res.message, state: 'success' }));
        dispatch(handleDisplayToast(true));
        dispatch(getAdmins());
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
};
