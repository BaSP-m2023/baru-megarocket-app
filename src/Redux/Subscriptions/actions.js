import {
  PUT_SUBSCRIPTIONS_PENDING,
  PUT_SUBSCRIPTIONS_SUCCESS,
  PUT_SUBSCRIPTIONS_ERROR,
  DELETE_SUBSCRIPTIONS_PENDING,
  DELETE_SUBSCRIPTIONS_SUCCESS,
  DELETE_SUBSCRIPTIONS_ERROR,
  RESET_STATE
} from './constants';

export const putSubscriptionPending = () => {
  return {
    type: PUT_SUBSCRIPTIONS_PENDING
  };
};
export const putSubscriptionSuccess = (data) => {
  return {
    type: PUT_SUBSCRIPTIONS_SUCCESS,
    payload: data
  };
};
export const putSubscriptionError = (error) => {
  return {
    type: PUT_SUBSCRIPTIONS_ERROR,
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
export const reset = () => {
  return {
    type: RESET_STATE
  };
};
