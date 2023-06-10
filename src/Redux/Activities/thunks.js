import { getError, getPending, getSuccess } from './actions';

export const getActivities = async () => {
  return async (dispatch) => {
    try {
      dispatch(getPending());

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`);
      if (response.status === 200) {
        dispatch(getPending());
        const { data } = await response.json();
        dispatch(getSuccess(data));
      }

      if (response.status !== 200) {
        dispatch(getPending());
        const { error } = await response.json();
        throw new Error(error);
      }
    } catch (error) {
      dispatch(getError(error));
    }
  };
};
