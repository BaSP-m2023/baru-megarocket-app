import {
  LOGIN_MEMBER_PENDING,
  LOGIN_MEMBER_SUCCESS,
  LOGIN_MEMBER_ERROR,
  LOGOUT_MEMBER
} from './constants';

export const loginMemberPending = () => {
  return {
    type: LOGIN_MEMBER_PENDING
  };
};

export const loginMemberSuccess = (data) => {
  return {
    type: LOGIN_MEMBER_SUCCESS,
    payload: data
  };
};

export const loginMemberError = (error) => {
  return {
    type: LOGIN_MEMBER_ERROR,
    payload: error
  };
};

export const logoutMember = () => {
  return {
    type: LOGOUT_MEMBER
  };
};
