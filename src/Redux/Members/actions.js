import { GET_MEMBERS_PENDING, GET_MEMBERS_SUCCESS, GET_MEMBERS_ERROR } from './constants';

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
