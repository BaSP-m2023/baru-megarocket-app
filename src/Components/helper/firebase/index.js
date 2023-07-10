import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_SENDER_ID,
  appId: process.env.REACT_APP_ID
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const tokenListener = (resolve) => {
  firebase.auth().onIdTokenChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken();
      const {
        claims: { role }
      } = await user.getIdTokenResult();
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('token', token);
    } else {
      sessionStorage.removeItem('token', '');
      sessionStorage.removeItem('role', '');
    }

    if (resolve) {
      resolve();
    }
  });
};
