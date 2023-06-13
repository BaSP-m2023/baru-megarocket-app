import {
  getClassPending,
  getClassSuccess,
  getClassError,
  deleteClassPending,
  deleteClassSuccess,
  deleteClassError,
  responseModal,
  putClassPending,
  putClassSuccess,
  putClassError
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
export const putClass = async (dispatch, classes, id) => {
  dispatch(putClassPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(classes)
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(putClassSuccess(data.data));
      return data;
    }
    dispatch(putClassError(data.message));
    return data;
  } catch (data) {
    dispatch(putClassError(data));
    return data;
  }
};

export const deleteClass = (classId) => {
  return async (dispatch) => {
    dispatch(deleteClassPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/delete/${classId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      dispatch(deleteClassSuccess(data.data));
      return data;
    } catch (error) {
      dispatch(deleteClassError('Error deleting the Class'));
      return error;
    }
  };
};
export const setShowModal = async (dispatch, data) => {
  dispatch(responseModal({ show: data.show, msg: data.msg, state: data }));
};
