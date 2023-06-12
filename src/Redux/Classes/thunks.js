import {
  getClassPending,
  getClassSuccess,
  getClassError,
  postClassPending,
  postClassSuccess,
  postClassError,
  responseModal
} from './actions';

export const getClasses = async (dispatch) => {
  dispatch(getClassPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/search`);
    const data = await response.json();
    dispatch(getClassSuccess(data.data));
  } catch (error) {
    dispatch(getClassError('failed to fetch classes'));
  }
};

export const setShowModal = async (dispatch, data) => {
  dispatch(responseModal({ show: data.show, msg: data.msg, state: data }));
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
    const data = await response.json();
    if (response.ok) {
      dispatch(postClassSuccess(data.data));
      return dispatch(responseModal({ show: true, msg: data.message, state: 'success' }));
    }
    dispatch(postClassError(data.message));
    return dispatch(responseModal({ show: true, msg: data.message, state: 'fail' }));
  } catch (error) {
    dispatch(postClassError(error));
    return dispatch(responseModal({ show: true, msg: error, state: 'fail' }));
  }
};
