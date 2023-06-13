import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import { responseModal } from '../../../Redux/Shared/ResponseModal/actions';
import styles from './modalResponse.module.css';

const ResponseModal = ({ handler, state, message }) => {
  const responseState = {
    success: 'toastSuccess',
    fail: 'toastFail'
  };
  const responseToast = useSelector((state) => state.responseToast.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(responseModal({ show: false, message: '', state: '' }));
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  useEffect(() => {
    const handleClick = (event) => {
      const modalContent = document.querySelector(`.${styles.toastContent}`);
      if (modalContent !== event.target) {
        dispatch(responseModal({ show: false, message: '', state: '' }));
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return ReactDOM.createPortal(
    responseToast?.show && (
      <div className={`${styles.toast} ${styles[responseState[state]]} `}>
        <div className={styles.toastContent}>
          <p className={styles.message}>{message}</p>
          <span className={styles.toastCloser} onClick={handler}>
            &times;
          </span>
        </div>
      </div>
    ),
    document.body
  );
};

export default ResponseModal;
