import {
  GET_CLASS_PENDING,
  GET_CLASS_SUCCESS,
  GET_CLASS_ERROR,
  PUT_CLASS_ERROR,
  PUT_CLASS_PENDING,
  PUT_CLASS_SUCCESS,
  DELETE_CLASS_PENDING,
  DELETE_CLASS_SUCCESS,
  DELETE_CLASS_ERROR,
  REFRESH_DATA
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

export const putClassPending = () => {
  return {
    type: PUT_CLASS_PENDING
  };
};

export const putClassSuccess = (data) => {
  return {
    type: PUT_CLASS_SUCCESS,
    payload: data
  };
};
export const putClassError = (error) => {
  return {
    type: PUT_CLASS_ERROR,
    payload: error
  };
};

export const deleteClassPending = () => {
  return {
    type: DELETE_CLASS_PENDING
  };
};

export const deleteClassSuccess = (data) => {
  return {
    type: DELETE_CLASS_SUCCESS,
    payload: data
  };
};

export const deleteClassError = (error) => {
  return {
    type: DELETE_CLASS_ERROR,
    payload: error
  };
};

export const refreshData = (data) => {
  return {
    type: REFRESH_DATA,
    payload: data
  };
};
