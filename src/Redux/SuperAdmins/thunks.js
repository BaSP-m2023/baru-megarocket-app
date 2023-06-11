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
  deleteSuperadminSuccess
} from './actions';

export const getSuperadmins = async (dispatch) => {
  dispatch(getSuperadminsPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`);
    const data = await response.json();
    dispatch(getSuperadminsSuccess(data.data));
  } catch (error) {
    dispatch(getSuperadminsError(error.toString()));
  }
};

export const addSuperadmin = (superadminToAdd) => {
  return async (dispatch) => {
    dispatch(addSuperadminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superadminToAdd)
      });
      if (response.ok) {
        dispatch(addSuperadminSuccess());
        sessionStorage.setItem('state', 'success');
        sessionStorage.setItem('resMessage', 'New superadmin created');
      } else {
        dispatch(addSuperadminError('Failed to create superadmin'));
      }
    } catch (error) {
      dispatch(addSuperadminError('Failed to create superadmin'));
    }
  };
};

export const editSuperadmin = (idToEdit, editedSuperadmin) => {
  return async (dispatch) => {
    dispatch(editSuperadminPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/super-admins/${idToEdit}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedSuperadmin)
        }
      );
      if (response.ok) {
        dispatch(editSuperadminSuccess());
      } else {
        dispatch(editSuperadminError('Failed to edit superadmin'));
      }
    } catch (error) {
      dispatch(editSuperadminError('Failed to edit superadmin'));
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
          method: 'DELETE'
        }
      );
      if (response.ok) {
        dispatch(deleteSuperadminSuccess(idToDelete));
      } else {
        dispatch(deleteSuperadminError('Failed to delete superadmin'));
      }
    } catch (error) {
      dispatch(deleteSuperadminError(error));
    }
  };
};
