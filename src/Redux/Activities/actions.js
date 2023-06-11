import * as actionType from './constants';

export const getActivitiesPending = () => {
  return {
    type: actionType.GET_ACTIVITIES_PENDING
  };
};

export const getActivitiesSuccess = (list) => {
  return {
    type: actionType.GET_ACTIVITIES_SUCCESS,
    payload: {
      list
    }
  };
};

export const getActivitiesError = (error) => {
  return {
    type: actionType.GET_ACTIVITIES_ERROR,
    payload: {
      error
    }
  };
};
