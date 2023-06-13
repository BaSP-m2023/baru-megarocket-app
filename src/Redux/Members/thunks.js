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
    const data = await response.json();
    dispatch(addMemberSuccess(data));
  } catch (error) {
    dispatch(addMemberError(error.toString()));
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
    const data = await response.json();
    dispatch(editMemberSuccess(data));
  } catch (error) {
    dispatch(editMemberError(error.toString()));
  }
};

export const deleteMember = async (dispatch, id) => {
  dispatch(deleteMemberPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    dispatch(deleteMemberSuccess(data));
    getMembers(dispatch);
  } catch (error) {
    dispatch(deleteMemberError(error.toString()));
  }
};
