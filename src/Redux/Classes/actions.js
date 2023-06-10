import {
  GET_CLASS_PENDING,
  GET_CLASS_SUCCESS,
  GET_CLASS_ERROR,
  ADD_CLASS_PENDING,
  ADD_CLASS_SUCCESS,
  ADD_CLASS_ERROR
} from './constants';

export const getClassPending = () => {
  return {
    type: GET_CLASS_PENDING
  };
};

export const getClassSuccess = (data) => {
  return {
    type: GET_CLASS_SUCCESS,
    payload: data
  };
};

export const getClassError = (error) => {
  return {
    type: GET_CLASS_ERROR,
    payload: error
  };
};

export const postClassPending = () => {
  return {
    type: ADD_CLASS_PENDING
  };
};

export const postClassSuccess = (data) => {
  return {
    type: ADD_CLASS_SUCCESS,
    payload: data
  };
};

export const postClassError = (error) => {
  return {
    type: ADD_CLASS_ERROR,
    payload: error
  };
};
