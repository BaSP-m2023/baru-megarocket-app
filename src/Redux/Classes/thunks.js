import {
  getClassPending,
  getClassSuccess,
  getClassError,
  deleteClassPending,
  deleteClassSuccess,
  deleteClassError,
  putClassPending,
  putClassSuccess,
  putClassError
} from './actions';

import { handleDisplayToast, setContentToast } from '../Shared/ResponseToast/actions';
export const getClasses = async (dispatch) => {
  dispatch(getClassPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/search`);
    const data = await response.json();
    dispatch(getClassSuccess(data.data));
  } catch (error) {
    dispatch(handleDisplayToast(true));
    setContentToast({ message: error.message, state: 'fail' });
    dispatch(getClassError('failed to fetch classes'));
  }
};
export const putClass = async (dispatch, classes, id, history) => {
  dispatch(putClassPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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
        method: 'DELETE'
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
