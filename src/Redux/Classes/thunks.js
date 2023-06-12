import {
  getClassPending,
  getClassSuccess,
  getClassError,
  deleteClassPending,
  deleteClassSuccess,
  deleteClassError
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
    }
  };
};
