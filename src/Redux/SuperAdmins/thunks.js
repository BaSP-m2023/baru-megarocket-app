import {
  getSuperadminsPending,
  getSuperadminsError,
  getSuperadminsSuccess,
  addSuperadminPending,
  addSuperadminError,
  addSuperadminSuccess,
  editSuperadminPending,
  editSuperadminError,
  editSuperadminSuccess,
  deleteSuperadminPending,
  deleteSuperadminError,
  deleteSuperadminSuccess,
  resetPrimaryStates
} from 'Redux/SuperAdmins/actions';

import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';

const token = sessionStorage.getItem('token');

export const getSuperadmins = async (dispatch) => {
  dispatch(getSuperadminsPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: token
      }
    });
    const data = await response.json();
    dispatch(getSuperadminsSuccess(data.data));
    dispatch(resetPrimaryStates());
  } catch (error) {
    dispatch(getSuperadminsError(error));
  }
};

export const addSuperadmin = (superadminToAdd, callback) => {
  return async (dispatch) => {
    dispatch(addSuperadminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(superadminToAdd)
      });
      const { message } = await response.json();
      dispatch(resetPrimaryStates());

      if (response.ok) {
        callback();
        dispatch(addSuperadminSuccess());
        dispatch(setContentToast({ message, state: 'success' }));
        dispatch(handleDisplayToast(true));
      } else {
        throw new Error(message);
      }
    } catch (error) {
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
      dispatch(addSuperadminError());
    }
  };
};

export const editSuperadmin = (idToEdit, editedSuperadmin, callback) => {
  return async (dispatch) => {
    dispatch(editSuperadminPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/super-admins/${idToEdit}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            token: token
          },
          body: JSON.stringify(editedSuperadmin)
        }
      );
      const { message } = await response.json();
      dispatch(resetPrimaryStates());

      if (response.ok) {
        callback();
        dispatch(editSuperadminSuccess());
        dispatch(setContentToast({ message, state: 'success' }));
        dispatch(handleDisplayToast(true));
      } else {
        throw new Error(message);
      }
    } catch (error) {
      dispatch(editSuperadminError());
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  };
};

export const deleteSuperadmin = (idToDelete) => {
  return async (dispatch) => {
    dispatch(deleteSuperadminPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/super-admins/${idToDelete}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            token: token
          }
        }
      );
      const { message } = await response.json();
      dispatch(resetPrimaryStates());

      if (response.ok) {
        dispatch(deleteSuperadminSuccess());
        dispatch(getSuperadmins);
        dispatch(setContentToast({ message, state: 'success' }));
        dispatch(handleDisplayToast(true));
      } else {
        throw new Error(message);
      }
    } catch (error) {
      dispatch(deleteSuperadminError());
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  };
};
