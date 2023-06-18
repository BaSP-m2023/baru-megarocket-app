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
  deleteMemberError
} from './actions';

import { handleDisplayToast, setContentToast } from '../Shared/ResponseToast/actions';

export const getMembers = async (dispatch) => {
  dispatch(getMembersPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member`);
    const data = await response.json();
    dispatch(getMembersSuccess(data.data));
  } catch (error) {
    dispatch(getMembersError(error.toString()));
  }
};

export const addMember = async (dispatch, member) => {
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

export const updateMember = async (dispatch, id, updatedMember) => {
  dispatch(editMemberPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedMember)
    });
    const { message, data, error } = await response.json();
    if (!error) {
      dispatch(editMemberSuccess(data));
      dispatch(setContentToast({ message, state: 'success' }));
      dispatch(handleDisplayToast(true));
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

export const deleteMember = async (dispatch, id) => {
  dispatch(deleteMemberPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, {
      method: 'DELETE'
    });
    const { message, data, error } = await response.json();
    if (!error) {
      dispatch(deleteMemberSuccess(data));
      dispatch(setContentToast({ message, state: 'success' }));
      dispatch(handleDisplayToast(true));
      getMembers(dispatch);
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
