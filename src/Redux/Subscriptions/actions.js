import {
  PUT_MEMBERS_PENDING,
  PUT_MEMBERS_SUCCESS,
  PUT_MEMBERS_ERROR,
  DELETE_MEMBERS_PENDING,
  DELETE_MEMBERS_SUCCESS,
  DELETE_MEMBERS_ERROR
} from './constants';

export const putSubscriptionPending = () => {
  return {
    type: PUT_MEMBERS_PENDING
  };
};
export const putSubscriptionSuccess = (data) => {
  return {
    type: PUT_MEMBERS_SUCCESS,
    payload: data
  };
};
export const putSubscriptionError = (error) => {
  return {
    type: PUT_MEMBERS_ERROR,
    payload: error
  };
};

export const deleteSubscriptionPending = () => {
  return {
    type: DELETE_MEMBERS_PENDING
  };
};
export const deleteSubscriptionSuccess = (data) => {
  return {
    type: DELETE_MEMBERS_SUCCESS,
    payload: data
  };
};
export const deleteSubscriptionError = (error) => {
  return {
    type: DELETE_MEMBERS_ERROR,
    payload: error
  };
};
