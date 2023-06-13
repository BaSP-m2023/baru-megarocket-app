import { getMembersPending, getMembersSuccess, getMembersError } from './actions';

export const getMembers = async (dispatch) => {
  dispatch(getMembersPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member`);
    const data = await response.json();
    dispatch(getMembersSuccess(data.data));
  } catch (error) {
    dispatch(getMembersError(error.toString()));
  }
};
