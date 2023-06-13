import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  getAdminByIdPending,
  getAdminBydIdSuccess,
  getAdminByIdError,
  addAdminPending,
  addAdminSuccess,
  addAdminError,
  editAdminPending,
  editAdminSuccess,
  editAdminError,
  deleteAdminPending,
  deleteAdminSuccess,
  deleteAdminError
} from './actions';

export const getAdmins = async (dispatch) => {
  dispatch(getAdminsPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
    const res = await response.json();
    dispatch(getAdminsSuccess(res.data));
  } catch (error) {
    dispatch(getAdminsError(error.message));
  }
};

export const getAdminsById = async (dispatch, id) => {
  dispatch(getAdminByIdPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
      method: 'GET'
    });
    const res = await response.json();
    const body = res.data;
    dispatch(getAdminBydIdSuccess(body));
  } catch (error) {
    dispatch(getAdminByIdError(error.message));
  }
};

export const addAdmin = async (dispatch, adminToAdd) => {
  dispatch(addAdminPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(adminToAdd)
    });
    const res = await response.json();
    if (response.ok) {
      dispatch(addAdminSuccess({ adminCreated: res, successMessage: 'admin created' }));
    } else {
      dispatch(addAdminError(res.message));
    }
  } catch (error) {
    dispatch(addAdminError(error.message));
  }
};

export const editAdmin = async (dispatch, id, adminToUpdate) => {
  console.log(adminToUpdate);
  dispatch(editAdminPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: adminToUpdate.firstName,
        lastName: adminToUpdate.lastName,
        dni: adminToUpdate.dni,
        phone: adminToUpdate.phone,
        email: adminToUpdate.email,
        city: adminToUpdate.city,
        password: adminToUpdate.password
      })
    });
    const res = await response.json();
    if (response.ok) {
      dispatch(editAdminSuccess({ adminUpdated: res, successMessage: 'admin updated' }));
      /*  setStateResponse('success'); */
      /* setMessageResponse('Admin updated'); */
      /* setShowResponseModal(true); */
    } else {
      dispatch(editAdminError(res.errors ? res.errors : res.message));
      /* setStateResponse('fail'); */
      /* setMessageResponse('Admin could be not updated'); */
      /* setShowResponseModal(true); */
    }
  } catch (error) {
    dispatch(editAdminError(error.message));
    /* setShowResponseModal(true); */
    /* setMessageResponse(`Error updating admins: ${error.message}`); */
  }
};

export const deleteAdmin = async (dispatch, id) => {
  dispatch(deleteAdminPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/delete/${id}`, {
      method: 'DELETE'
    });
    const res = await response.json();
    if (response.ok) {
      /* setStateResponse('success');
      setMessageResponse('Admin deleted');
      setShowResponseModal(true);
      */
      dispatch(deleteAdminSuccess(res.message, id));
    } else {
      console.log(res, 'else res');
      dispatch(deleteAdminError(res));
      /* setStateResponse('fail');
      setMessageResponse('Admin could be not deleted');
      setShowResponseModal(true); */
    }
  } catch (error) {
    console.log(error, 'error');
    dispatch(deleteAdminError(error.message));
    /* setMessageResponse(`Error deleting admins: ${error.message}`);
    setShowResponseModal(true); */
  }
};
