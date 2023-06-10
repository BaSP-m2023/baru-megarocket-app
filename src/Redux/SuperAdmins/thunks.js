import { getSuperadminsPending, getSuperadminsError, getSuperadminsSuccess } from './actions';

export const getSuperadmins = async (dispatch) => {
  dispatch(getSuperadminsPending());
  console.log('hi');
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`);
    const data = await response.json();
    dispatch(getSuperadminsSuccess(data.data));
  } catch (error) {
    dispatch(getSuperadminsError(error.toString()));
  }
};
