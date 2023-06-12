import * as actionCreator from './actions';

export const getActivities = async (dispatch) => {
  dispatch(actionCreator.getActivitiesPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`);
    const { data, message } = await response.json();
    dispatch(actionCreator.resetPrimaryStates());

    if (response.status === 200) {
      dispatch(actionCreator.getActivitiesSuccess(data));
    }

    if (response.status !== 200) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(actionCreator.getActivitiesError(error.message));
  }
};

export const addActivity = async (dispatch, newActivity) => {
  dispatch(actionCreator.addActivityPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newActivity)
    });
    const { message, data } = await response.json();
    dispatch(actionCreator.resetPrimaryStates());

    if (response.status === 201) {
      dispatch(actionCreator.addActivitySuccess(data));
      dispatch(actionCreator.setResponseMessage({ message, state: 'success' }));
    }

    if (response.status === 400) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(actionCreator.addActivityError(error.message));
  }
};
