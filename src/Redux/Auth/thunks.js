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
  logoutPending,
  resetState
} from 'Redux/Auth/actions';
import { setContentToast, handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';

import { firebaseApp } from 'Components/helper/firebase';

const redirectByRole = {
  SUPER_ADMIN: '/user/super-admin',
  MEMBER: '/user/member',
  ADMIN: '/user/admin',
  TRAINER: '/user/trainer'
};

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
      dispatch(getAuth(token));
      history.push(redirectByRole[role]);
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/`, {
        headers: { token }
      });
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
      dispatch(logoutError(error));
      return {
        error: true,
        message: error
      };
    }
  };
};

export const signUpMember = (data, history) => {
  return async (dispatch) => {
    dispatch(signUpPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const res = await response.json();
      if (res.error) {
        throw new Error(res.message);
      }
      await dispatch(signUpSuccess(data));
      history.push('/');
      dispatch(setContentToast({ message: 'Sign up successfully', state: 'success' }));
      dispatch(handleDisplayToast(true));
      return res;
    } catch (error) {
      dispatch(signUpError(error.toString()));
      dispatch(resetState());
      dispatch(setContentToast({ message: error.message, state: 'fail' }));
      dispatch(handleDisplayToast(true));
    }
  };
};
