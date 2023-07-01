import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modalResponse.module.css';

import { useDispatch } from 'react-redux';
import { handleDisplayToast, resetToast } from '../../../Redux/Shared/ResponseToast/actions';

const ResponseModal = ({ handler, state, message }) => {
  const dispatch = useDispatch();

  const responseState = {
    success: 'toastSuccess',
    fail: 'toastFail'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(handleDisplayToast());
    }, 3000);
    return () => {
      clearTimeout(timer);
      dispatch(resetToast());
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={`${styles.toast} ${styles[responseState[state]]}`}>
      <div className={styles.toastContent} data-testid="response-toast-container">
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
