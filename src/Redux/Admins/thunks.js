import { getAdminsPending, getAdminsSuccess, getAdminsError } from './actions';

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
