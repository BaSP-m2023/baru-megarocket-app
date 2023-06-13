import {
  getActivitiesPending,
  getActivitiesSuccess,
  getActivitiesError,
  addActivityPending,
  addActivitySuccess,
  addActivityError,
  editActivityPending,
  editActivitySuccess,
  editActivityError,
  deleteActivityPending,
  deleteActivitySuccess,
  deleteActivityError,
  setResponseMessage,
  resetPrimaryStates
} from './actions';

export const getActivities = async (dispatch) => {
  dispatch(getActivitiesPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`);
    const { data, message } = await response.json();
    dispatch(resetPrimaryStates());

    if (response.status === 200) {
      dispatch(getActivitiesSuccess(data));
    }

    if (response.status !== 200) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(getActivitiesError(error.message));
  }
};

export const addActivity = async (dispatch, newActivity) => {
  dispatch(addActivityPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newActivity)
    });
    const { message, data } = await response.json();
    dispatch(resetPrimaryStates());

    if (response.status === 201) {
      dispatch(addActivitySuccess(data));
      dispatch(setResponseMessage({ message, state: 'success' }));
    }

    if (response.status === 400) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(addActivityError(error.message));
  }
};

export const editActivity = async (dispatch, id, { name, description, isActive }) => {
  dispatch(editActivityPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name, description, isActive })
    });
    const { message, data } = await response.json();
    dispatch(resetPrimaryStates());

    if (response.status === 200) {
      dispatch(editActivitySuccess(data));
      dispatch(setResponseMessage({ message, state: 'success' }));
    }

    if (response.status === 404) {
      throw new Error(message);
    }

    if (response.status === 400) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(editActivityError(error.message));
  }
};

export const deleteActivity = async (dispatch, id) => {
  dispatch(deleteActivityPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
      method: 'DELETE'
    });
    const { message, error } = await response.json();
    dispatch(resetPrimaryStates());

    if (!error) {
      dispatch(deleteActivitySuccess(id));
      dispatch(setResponseMessage({ message, state: 'success' }));
    }

    if (error) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(deleteActivityError(error.message));
  }
};
