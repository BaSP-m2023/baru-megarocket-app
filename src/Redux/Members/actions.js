import {
  GET_MEMBERS_PENDING,
  GET_MEMBERS_SUCCESS,
  GET_MEMBERS_ERROR,
  ADD_MEMBER_PENDING,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_ERROR,
  EDIT_MEMBER_PENDING,
  EDIT_MEMBER_SUCCESS,
  EDIT_MEMBER_ERROR,
  DELETE_MEMBER_PENDING,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_ERROR,
  RESET_REDIRECT
} from './constants';

export const getMembersPending = () => {
  return {
    type: GET_MEMBERS_PENDING
  };
};

export const getMembersSuccess = (data) => {
  return {
    type: GET_MEMBERS_SUCCESS,
    payload: data
  };
};

export const getMembersError = (error) => {
  return {
    type: GET_MEMBERS_ERROR,
    payload: error
  };
};

export const addMemberPending = () => {
  return {
    type: ADD_MEMBER_PENDING
  };
};

export const addMemberSuccess = (data) => {
  return {
    type: ADD_MEMBER_SUCCESS,
    payload: data
  };
};

export const addMemberError = (error) => {
  return {
    type: ADD_MEMBER_ERROR,
    payload: error
  };
};

export const editMemberPending = () => {
  return {
    type: EDIT_MEMBER_PENDING
  };
};

export const editMemberSuccess = (data) => {
  return {
    type: EDIT_MEMBER_SUCCESS,
    payload: data
  };
};

export const editMemberError = (error) => {
  return {
    type: EDIT_MEMBER_ERROR,
    payload: error
  };
};

export const deleteMemberPending = () => {
  return {
    type: DELETE_MEMBER_PENDING
  };
};

export const deleteMemberSuccess = (data) => {
  return {
    type: DELETE_MEMBER_SUCCESS,
    payload: data
  };
};

export const deleteMemberError = (error) => {
  return {
    type: DELETE_MEMBER_ERROR,
    payload: error
  };
};

export const resetRedirect = () => {
  return {
    type: RESET_REDIRECT
  };
};
