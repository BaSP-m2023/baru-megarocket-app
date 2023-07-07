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
} from 'Redux/Activities/actions';

import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';

const token = sessionStorage.getItem('token');

export const getActivities = () => {
  return async (dispatch) => {
    dispatch(getActivitiesPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token
        }
      });
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
};

export const addActivity = (newActivity) => {
  return async (dispatch) => {
    dispatch(addActivityPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          token: token
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
};

export const editActivity = (id, { name, description, isActive, trainers }) => {
  return async (dispatch) => {
    dispatch(editActivityPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          token: token
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
};

export const deleteActivity = (id) => {
  return async (dispatch) => {
    dispatch(deleteActivityPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: token
        }
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
};
