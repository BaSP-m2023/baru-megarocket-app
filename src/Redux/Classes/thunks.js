import {
  getClassPending,
  getClassSuccess,
  getClassError,
  postClassPending,
  postClassSuccess,
  postClassError,
  resetPrimaryStates
} from './actions';

import { handleDisplayToast, setContentToast } from '../Shared/ResponseToast/actions';

export const getClasses = async (dispatch) => {
  dispatch(getClassPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/search`);
    const { data, message, error } = await response.json();
    dispatch(resetPrimaryStates());
    if (!error) {
      dispatch(getClassSuccess(data));
    }
    if (error) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(getClassError(error.message));
  }
};

export const addClass = async (dispatch, createdClass) => {
  dispatch(postClassPending());
  const reqBody = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createdClass)
  };
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class`, reqBody);
    const { message, data, error } = await response.json();
    dispatch(resetPrimaryStates());

    if (!error) {
      dispatch(postClassSuccess(data));
      dispatch(setContentToast({ message, state: 'success' }));
      dispatch(handleDisplayToast(true));
    }
    if (error) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(postClassError(error.message));
    dispatch(setContentToast({ message: error.message, state: 'fail' }));
    dispatch(handleDisplayToast(true));
  }
};
