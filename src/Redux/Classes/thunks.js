import {
  getClassPending,
  getClassSuccess,
  getClassError,
  postClassPending,
  // postClassSuccess,
  postClassError
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

export const createClass = async (dispatch) => {
  dispatch(postClassPending());
  try {
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class`);
  } catch (error) {
    dispatch(postClassError('failed to fetch classes'));
  }
};
