import {
  getMembersPending,
  getMembersSuccess,
  getMembersError,
  addMemberPending,
  addMemberSuccess,
  addMemberError,
  editMemberPending,
  editMemberSuccess,
  editMemberError,
  deleteMemberPending,
  deleteMemberSuccess,
  deleteMemberError,
  resetRedirect
} from 'Redux/Members/actions';

import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';

const token = sessionStorage.getItem('token');

export const getMembers = () => {
  return async (dispatch) => {
    dispatch(getMembersPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token
        }
      });
      const data = await response.json();
      dispatch(getMembersSuccess(data.data));
      return data.data;
    } catch (error) {
      dispatch(getMembersError(error.toString()));
    }
  };
};

export const addMember = (member) => {
  return async (dispatch) => {
    dispatch(addMemberPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(member)
      });
      const { message, data, error } = await response.json();
      if (!error) {
        dispatch(addMemberSuccess(data));
        dispatch(setContentToast({ message, state: 'success' }));
        dispatch(handleDisplayToast(true));
      }

      if (error) {
        throw new Error(message);
      }
    } catch (error) {
      dispatch(addMemberError(error.message));
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  };
};

export const updateMember = (id, updatedMember) => {
  return async (dispatch) => {
    dispatch(editMemberPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(updatedMember)
      });
      const { message, data, error } = await response.json();
      if (!error) {
        dispatch(editMemberSuccess(data));
        dispatch(handleDisplayToast(true));
        dispatch(setContentToast({ message, state: 'success' }));
        dispatch(resetRedirect());
        return data;
      }

      if (error) {
        throw new Error(message);
      }
    } catch (error) {
      dispatch(editMemberError(error.message));
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  };
};

export const deleteMember = (id) => {
  return async (dispatch) => {
    dispatch(deleteMemberPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: token
        }
      });
      const { message, data, error } = await response.json();
      if (!error) {
        dispatch(deleteMemberSuccess(data));
        dispatch(setContentToast({ message, state: 'success' }));
        dispatch(handleDisplayToast(true));
        dispatch(getMembers());
      }

      if (error) {
        throw new Error(message);
      }
    } catch (error) {
      dispatch(deleteMemberError(error.message));
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  };
};
