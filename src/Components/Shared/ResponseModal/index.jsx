import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modalResponse.module.css';
import { useState, useEffect } from 'react';

const ResponseModal = ({ handler, state, message }) => {
  const responseState = {
    success: 'toastSuccess',
    fail: 'toastFail'
  };
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
