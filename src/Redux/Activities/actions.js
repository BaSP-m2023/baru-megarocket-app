import {
  GET_ACTIVITIES_PENDING,
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_ERROR,
  ADD_ACTIVITIES_PENDING,
  ADD_ACTIVITIES_SUCCESS,
  ADD_ACTIVITIES_ERROR,
  EDIT_ACTIVITIES_PENDING,
  EDIT_ACTIVITIES_SUCCESS,
  EDIT_ACTIVITIES_ERROR,
  DELETE_ACTIVITIES_PENDING,
  DELETE_ACTIVITIES_SUCCESS,
  DELETE_ACTIVITIES_ERROR,
  RESET_PRIMARY_STATES
} from './constants';

export const getActivitiesPending = () => {
  return {
    type: GET_ACTIVITIES_PENDING
  };
};

export const getActivitiesSuccess = (list) => {
  return {
    type: GET_ACTIVITIES_SUCCESS,
    payload: {
      list
    }
  };
};

export const getActivitiesError = (error) => {
  return {
    type: GET_ACTIVITIES_ERROR,
    payload: {
      error
    }
  };
};

export const addActivityPending = () => {
  return {
    type: ADD_ACTIVITIES_PENDING
  };
};

export const addActivitySuccess = (newActivity) => {
  return {
    type: ADD_ACTIVITIES_SUCCESS,
    payload: {
      newActivity
    }
  };
};

export const addActivityError = (error) => {
  return {
    type: ADD_ACTIVITIES_ERROR,
    payload: {
      error
    }
  };
};

export const editActivityPending = () => {
  return {
    type: EDIT_ACTIVITIES_PENDING
  };
};

export const editActivitySuccess = (activityUpdated) => {
  return {
    type: EDIT_ACTIVITIES_SUCCESS,
    payload: {
      activityUpdated
    }
  };
};

export const editActivityError = (error) => {
  return {
    type: EDIT_ACTIVITIES_ERROR,
    payload: {
      error
    }
  };
};

export const deleteActivityPending = () => {
  return {
    type: DELETE_ACTIVITIES_PENDING
  };
};

export const deleteActivitySuccess = (idDeleted) => {
  return {
    type: DELETE_ACTIVITIES_SUCCESS,
    payload: {
      idDeleted
    }
  };
};

export const deleteActivityError = (error) => {
  return {
    type: DELETE_ACTIVITIES_ERROR,
    payload: {
      error
    }
  };
};

export const resetPrimaryStates = () => {
  return {
    type: RESET_PRIMARY_STATES
  };
};
