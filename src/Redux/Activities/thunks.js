import { getError, getPending, getSuccess } from './actions';

export const getActivities = async (dispatch) => {
  try {
    dispatch(getPending());
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`);

    if (response.status === 200) {
      const { data } = await response.json();
      dispatch(getPending());
      dispatch(getSuccess(data));
    }
    if (response.status !== 200) {
      const { error } = await response.json();
      throw new Error(error.toString());
    }
  } catch (error) {
    dispatch(getPending());
    dispatch(getError(error));
  }
};
