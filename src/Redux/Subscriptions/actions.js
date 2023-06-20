import {
  GET_SUBSCRIPTIONS_PENDING,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_ERROR,
  ADD_SUBSCRIPTIONS_PENDING,
  ADD_SUBSCRIPTIONS_SUCCESS,
  ADD_SUBSCRIPTIONS_ERROR,
  EDIT_SUBSCRIPTIONS_PENDING,
  EDIT_SUBSCRIPTIONS_SUCCESS,
  EDIT_SUBSCRIPTIONS_ERROR,
  DELETE_SUBSCRIPTIONS_PENDING,
  DELETE_SUBSCRIPTIONS_SUCCESS,
  DELETE_SUBSCRIPTIONS_ERROR,
  RESET_STATE
} from './constants';

export const editSubscriptionPending = () => {
  return {
    type: EDIT_SUBSCRIPTIONS_PENDING
  };
};
export const editSubscriptionSuccess = (data) => {
  return {
    type: EDIT_SUBSCRIPTIONS_SUCCESS,
    payload: data
  };
};
export const editSubscriptionError = (error) => {
  return {
    type: EDIT_SUBSCRIPTIONS_ERROR,
    payload: error
  };
};

export const getSubscriptionsPending = () => {
  return {
    type: GET_SUBSCRIPTIONS_PENDING
  };
};

export const getSubscriptionsSuccess = (data) => {
  return {
    type: GET_SUBSCRIPTIONS_SUCCESS,
    payload: data
  };
};

export const getSubscriptionsError = (error) => {
  return {
    type: GET_SUBSCRIPTIONS_ERROR,
    payload: error
  };
};

export const deleteSubscriptionPending = () => {
  return {
    type: DELETE_SUBSCRIPTIONS_PENDING
  };
};
export const deleteSubscriptionSuccess = (data) => {
  return {
    type: DELETE_SUBSCRIPTIONS_SUCCESS,
    payload: data
  };
};
export const deleteSubscriptionError = (error) => {
  return {
    type: DELETE_SUBSCRIPTIONS_ERROR,
    payload: error
  };
};
export const addSubscriptionsPending = () => {
  return {
    type: ADD_SUBSCRIPTIONS_PENDING
  };
};
export const addSubscriptionsSuccess = (data) => {
  return {
    type: ADD_SUBSCRIPTIONS_SUCCESS,
    payload: data
  };
};

export const addSubscriptionsError = (error) => {
  return {
    type: ADD_SUBSCRIPTIONS_ERROR,
    payload: error
  };
};
export const resetState = () => {
  return {
    type: RESET_STATE
  };
};
