import { loginMemberPending, loginMemberSuccess, loginMemberError } from './actions';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';

export const loginMembers = async (dispatch) => {
  dispatch(loginMemberPending());
  const id = '647e03995744e5e9dd299290';
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`);
    const { data, message, error } = await response.json();
    if (!error) {
      dispatch(loginMemberSuccess(data));
      dispatch(handleDisplayToast(true));
      dispatch(setContentToast({ message: 'Successful login', state: 'success' }));
      return data;
    }
    if (error) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(loginMemberError(error.message));
  }
};
