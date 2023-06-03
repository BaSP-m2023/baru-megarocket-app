import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modalResponse.module.css';

const ResponseModal = ({ handler, state, message }) => {
  const responseState = {
    ok: 'toastOk',
    wrong: 'toastWrong'
  };
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
