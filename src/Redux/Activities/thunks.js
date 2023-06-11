import { getActivitiesError, getActivitiesPending, getActivitiesSuccess } from './actions';

export const getActivities = async (dispatch) => {
  try {
    dispatch(getActivitiesPending());
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`);
    const { data, message } = await response.json();

    if (response.status === 200) {
      dispatch(getActivitiesSuccess(data));
      dispatch(getActivitiesPending());
    }

    if (response.status !== 200) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(getActivitiesError(error.toString()));
    dispatch(getActivitiesPending());
  }
};
