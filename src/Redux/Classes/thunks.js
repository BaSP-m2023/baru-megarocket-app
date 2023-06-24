import {
  getClassPending,
  getClassSuccess,
  getClassError,
  postClassPending,
  postClassSuccess,
  postClassError,
  deleteClassPending,
  deleteClassSuccess,
  deleteClassError,
  putClassPending,
  putClassSuccess,
  putClassError
} from './actions';

import { handleDisplayToast, setContentToast } from '../Shared/ResponseToast/actions';

const token = sessionStorage.getItem('token');

export const getClasses = async (dispatch) => {
  dispatch(getClassPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/search`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      }
    });
    const { data, message, error } = await response.json();
    if (!error) {
      dispatch(getClassSuccess(data));
      return data;
    }
    if (error) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(getClassError(error.message));
    dispatch(setContentToast({ message: error.message, state: 'fail' }));
    dispatch(handleDisplayToast(true));
  }
};

export const addClass = async (dispatch, createdClass, history) => {
  dispatch(postClassPending());
  const reqBody = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify(createdClass)
  };
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class`, reqBody);
    const { message, data, error } = await response.json();
    if (!error) {
      history.push('/classes');
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
    return error;
  }
};

export const putClass = async (dispatch, classes, id, history) => {
  dispatch(putClassPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify(classes)
    });
    const { data, message, error } = await response.json();
    if (response.ok) {
      history.push('/classes');
      dispatch(putClassSuccess(data));
      dispatch(setContentToast({ message, state: 'success' }));
      dispatch(handleDisplayToast(true));
    }
    if (error) {
      throw new Error(message);
    }
  } catch (error) {
    dispatch(putClassError(error.message));
    dispatch(setContentToast({ message: error.message, state: 'fail' }));
    dispatch(handleDisplayToast(true));
    return error;
  }
};

export const deleteClass = (classId) => {
  return async (dispatch) => {
    dispatch(deleteClassPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/delete/${classId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        }
      });
      const { data, message, error } = await response.json();
      if (!error) {
        dispatch(deleteClassSuccess(data));
        dispatch(setContentToast({ message, state: 'success' }));
        dispatch(handleDisplayToast(true));
        return data._id;
      }
      if (error) {
        throw new Error(message);
      }
    } catch (error) {
      dispatch(deleteClassError(error.message));
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  };
};
