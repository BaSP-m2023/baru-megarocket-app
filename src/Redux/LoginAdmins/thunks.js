import { loginAdminPending, loginAdminSuccess, loginAdminError } from './actions';
import { handleDisplayToast, setContentToast } from '../Shared/ResponseToast/actions';

export const loginAdmins = async (dispatch) => {
  dispatch(loginAdminPending());
  const id = '648f6b7d7a32110a6b2109bf';
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`);
    const { data, message, error } = await response.json();
    if (!error) {
      dispatch(loginAdminSuccess(data));
      dispatch(handleDisplayToast(true));
      dispatch(setContentToast({ message: 'Successful login', state: 'success' }));
      return data;
    }
    if (error) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(loginAdminError(error.message));
  }
};
