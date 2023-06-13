import {
  GET_SUBSCRIPTIONS_PENDING,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_ERROR,
  GET_BY_ID_SUBSCRIPTIONS_PENDING,
  GET_BY_ID_SUBSCRIPTIONS_SUCCESS,
  GET_BY_ID_SUBSCRIPTIONS_ERROR,
  POST_SUBSCRIPTIONS_PENDING,
  POST_SUBSCRIPTIONS_SUCCESS,
  POST_SUBSCRIPTIONS_ERROR,
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

export const postSubscriptionsPending = () => {
  return {
    type: POST_SUBSCRIPTIONS_PENDING
  };
};
export const postSubscriptionsSuccess = (data) => {
  return {
    type: POST_SUBSCRIPTIONS_SUCCESS,
    payload: data
  };
};

export const postSubscriptionsError = (error) => {
  return {
    type: POST_SUBSCRIPTIONS_ERROR,
    payload: error
  };
};
export const reset = () => {
  return {
    type: RESET_STATE
  };
};
