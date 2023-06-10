import * as actions from './constants';

export const getPending = () => {
  return {
    type: actions.GET_ACTIVITIES_PENDING
  };
};

export const getSuccess = (list) => {
  return {
    type: actions.GET_ACTIVITIES_SUCCESS,
    payload: {
      list
    }
  };
};

export const getError = (error) => {
  return {
    type: actions.GET_ACTIVITIES_ERROR,
    payload: {
      error
    }
  };
};
