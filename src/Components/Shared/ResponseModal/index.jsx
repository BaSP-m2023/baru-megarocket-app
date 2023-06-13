import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modalResponse.module.css';
import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { handleDisplayToast, resetToast } from '../../../Redux/Shared/ResponseToast/actions';

const ResponseModal = ({ handler, state, message }) => {
  const dispatch = useDispatch();

  const responseState = {
    success: 'toastSuccess',
    fail: 'toastFail'
  };
<<<<<<< HEAD
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!visible) {
    return null;
  }

=======

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(handleDisplayToast());
    }, 3000);
    return () => {
      clearTimeout(timer);
      dispatch(resetToast());
    };
  }, []);

>>>>>>> 47d2a924e83afdd58f33d9f6859da0993ba050ff
  return ReactDOM.createPortal(
    <div className={`${styles.toast} ${styles[responseState[state]]} `}>
      <div className={styles.toastContent}>
        <p className={styles.message}>{message}</p>
        <span className={styles.toastCloser} onClick={handler}>
          &times;
        </span>
      </div>
    </div>,
    document.body
  );
};

export default ResponseModal;
