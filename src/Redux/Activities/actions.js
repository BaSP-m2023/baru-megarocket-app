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

export const addActivityPending = () => {
  return {
    type: actionType.ADD_ACTIVITIES_PENDING
  };
};

export const addActivitySuccess = (newActivity) => {
  return {
    type: actionType.ADD_ACTIVITIES_SUCCESS,
    payload: {
      newActivity
    }
  };
};

export const addActivityError = (error) => {
  return {
    type: actionType.ADD_ACTIVITIES_ERROR,
    payload: {
      error
    }
  };
};

export const editActivityPending = () => {
  return {
    type: actionType.EDIT_ACTIVITIES_PENDING
  };
};

export const editActivitySuccess = (activityUpdated) => {
  return {
    type: actionType.EDIT_ACTIVITIES_SUCCESS,
    payload: {
      activityUpdated
    }
  };
};

export const editActivityError = (error) => {
  return {
    type: actionType.EDIT_ACTIVITIES_ERROR,
    payload: {
      error
    }
  };
};

export const setResponseMessage = ({ message, state }) => {
  return {
    type: actionType.RESPONSE_ACTIVITIES_MESSAGE,
    payload: {
      response: {
        message,
        state
      }
    }
  };
};

export const resetPrimaryStates = () => {
  return {
    type: actionType.RESET_PRIMARY_STATES
  };
};
