import {
  getSuperadminsPending,
  getSuperadminsError,
  getSuperadminsSuccess,
  addSuperadminPending,
  addSuperadminError,
  addSuperadminSuccess
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
