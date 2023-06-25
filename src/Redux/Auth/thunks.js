import {
  loginError,
  loginPending,
  loginSuccess,
  signUpError,
  signUpPending,
  signUpSuccess,
  getAuthenticationPending,
  getAuthenticationSuccess,
  getAuthenticationError,
  logoutSuccess,
  logoutError,
  logoutPending
} from 'Redux/Auth/actions';
import { setContentToast, handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';

import { firebaseApp } from 'Components/helper/firebase';

export const login = (credentials, history) => {
  return async (dispatch) => {
    dispatch(loginPending());
    try {
      const firebaseResponse = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      const token = await firebaseResponse.user.getIdToken();
      const {
        claims: { role }
      } = await firebaseResponse.user.getIdTokenResult();
      dispatch(loginSuccess({ token, role }));
      dispatch(setContentToast({ message: 'Successful Login', state: 'success' }));
      dispatch(handleDisplayToast(true));
      history.push('/');
    } catch (error) {
      dispatch(loginError(error));
      dispatch(setContentToast({ message: 'Wrong email or password', state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  };
};

export const getAuth = (token) => {
  return async (dispatch) => {
    dispatch(getAuthenticationPending());
    try {
      const response = fetch(`${process.env.REACT_APP_API_URL}/api/auth/`, { headers: { token } });
      const res = await response.json();
      dispatch(getAuthenticationSuccess(res.data));
      return res.data;
    } catch (error) {
      dispatch(getAuthenticationError(error.toString()));
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    dispatch(logoutPending());
    try {
      await firebaseApp.auth().signOut();
      dispatch(logoutSuccess());
      sessionStorage.removeItem('token', '');
      sessionStorage.removeItem('role', '');
      return { error: false, message: 'Log Out Successfully' };
    } catch (error) {
      console.error(error);
      dispatch(logoutError(error));
      return {
        error: true,
        message: error
      };
    }
  };
};

export const signUpMember = (data) => {
  return async (dispatch) => {
    dispatch(signUpPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const res = await response.json();
      if (response.error) {
        throw new Error(response.message);
      }
      await dispatch(signUpSuccess(data));
      return res;
    } catch (error) {
      dispatch(signUpError(error.toString()));
    }
  };
};
