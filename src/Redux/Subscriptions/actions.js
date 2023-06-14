import {
  GET_SUBSCRIPTIONS_PENDING,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_ERROR,
  GET_BY_ID_SUBSCRIPTIONS_PENDING,
  GET_BY_ID_SUBSCRIPTIONS_SUCCESS,
  GET_BY_ID_SUBSCRIPTIONS_ERROR,
  ADD_SUBSCRIPTIONS_PENDING,
  ADD_SUBSCRIPTIONS_SUCCESS,
  ADD_SUBSCRIPTIONS_ERROR,
  RESET_STATE
} from './constants';

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
export const getByIdSubscriptionsPending = () => {
  return {
    type: GET_BY_ID_SUBSCRIPTIONS_PENDING
  };
};

export const getByIdSubscriptionsSuccess = (data) => {
  return {
    type: GET_BY_ID_SUBSCRIPTIONS_SUCCESS,
    payload: data
  };
};
export const getByIdSubscriptionsError = (error) => {
  return {
    type: GET_BY_ID_SUBSCRIPTIONS_ERROR,
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
export const reset = () => {
  return {
    type: RESET_STATE
  };
};
