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
  closeMessage
} from './actions';

const responseInfo = { resState: '', resMessage: '', superadmins: [] };

export const getSuperadmins = async (dispatch) => {
  dispatch(getSuperadminsPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`);
    const data = await response.json();
    responseInfo.superadmins = data.data;
    dispatch(getSuperadminsSuccess(responseInfo));
  } catch (error) {
    responseInfo.resState = 'fail';
    responseInfo.resMessage = error.message;
    dispatch(getSuperadminsError(responseInfo));
  }
};

export const addSuperadmin = (superadminToAdd, goBack) => {
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
        goBack();
        responseInfo.resState = 'success';
        responseInfo.resMessage = 'New superadmin created';
        dispatch(addSuperadminSuccess(responseInfo));
        setTimeout(() => dispatch(closeMessage()), 3500);
      } else {
        responseInfo.resState = 'fail';
        responseInfo.resMessage = 'Failed to create superadmin';
        dispatch(addSuperadminError(responseInfo));
      }
    } catch (error) {
      responseInfo.resState = 'fail';
      responseInfo.resMessage = 'Failed to create superadmin';
      dispatch(addSuperadminError(responseInfo));
    }
  };
};

export const editSuperadmin = (idToEdit, editedSuperadmin, goBack) => {
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
        goBack();
        responseInfo.resState = 'success';
        responseInfo.resMessage = 'Superadmin updated';
        dispatch(editSuperadminSuccess(responseInfo));
      } else {
        responseInfo.resState = 'fail';
        responseInfo.resMessage = 'Failed to edit superadmin';
        dispatch(editSuperadminError(responseInfo));
      }
    } catch (error) {
      responseInfo.resState = 'fail';
      responseInfo.resMessage = 'Failed to edit superadmin';
      dispatch(editSuperadminError(responseInfo));
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
        responseInfo.resState = 'success';
        responseInfo.resMessage = 'Superadmin deleted';
        dispatch(deleteSuperadminSuccess(responseInfo));
        dispatch(getSuperadmins);
      } else {
        responseInfo.resState = 'fail';
        responseInfo.resMessage = 'Failed to delete superadmin';
        dispatch(deleteSuperadminError(responseInfo));
      }
    } catch (error) {
      responseInfo.resState = 'fail';
      responseInfo.resMessage = 'Failed to delete superadmin';
      dispatch(deleteSuperadminError(responseInfo));
    }
  };
};
