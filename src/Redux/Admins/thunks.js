import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  getAdminByIdPending,
  getAdminBydIdSuccess,
  getAdminByIdError,
  addAdminPending,
  addAdminSuccess,
  addAdminError
} from './actions';

export const getAdmins = async (dispatch) => {
  dispatch(getAdminsPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
    const res = await response.json();
    dispatch(getAdminsSuccess(res.data));
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
      dispatch(addAdminSuccess({ adminCreated: res, successMessage: 'admin created' }));
    } else {
      dispatch(addAdminError(res.message));
    }
  } catch (error) {
    dispatch(addAdminError(error.message));
  }
};
