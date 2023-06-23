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
  resetPrimaryStates
} from './actions';

import { handleDisplayToast, setContentToast } from '../Shared/ResponseToast/actions';

export const getActivities = async (dispatch) => {
  dispatch(getActivitiesPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`);
    const { data, message, error } = await response.json();
    dispatch(resetPrimaryStates());

    if (!error) {
      dispatch(getActivitiesSuccess(data));
    }

    if (error) {
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
    const { message, data, error } = await response.json();
    dispatch(resetPrimaryStates());

    if (!error) {
      dispatch(addActivitySuccess(data));
      dispatch(setContentToast({ message, state: 'success' }));
      dispatch(handleDisplayToast(true));
    }

    if (error) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(addActivityError(error.message));
    dispatch(setContentToast({ message: error.message, state: 'fail' }));
    dispatch(handleDisplayToast(true));
  }
};

export const editActivity = async (dispatch, id, { name, description, isActive, trainers }) => {
  dispatch(editActivityPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name, description, isActive, trainers })
    });
    const { message, data, error } = await response.json();
    dispatch(resetPrimaryStates());

    if (!error) {
      dispatch(editActivitySuccess(data));
      dispatch(setContentToast({ message, state: 'success' }));
      dispatch(handleDisplayToast(true));
    }

    if (error) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(editActivityError(error.message));
    dispatch(setContentToast({ message: error.message, state: 'fail' }));
    dispatch(handleDisplayToast(true));
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
      dispatch(setContentToast({ message, state: 'success' }));
      dispatch(handleDisplayToast(true));
    }

    if (error) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(deleteActivityError(error.message));
    dispatch(setContentToast({ message: error.message, state: 'fail' }));
    dispatch(handleDisplayToast(true));
  }
};
