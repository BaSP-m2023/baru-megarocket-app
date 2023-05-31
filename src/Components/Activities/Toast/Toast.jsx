import React from 'react';
import styles from './toast.module.css';

const Toast = ({ handler, content, classes }) => {
  return (
    <div className={`${styles.toast} ${styles[classes]}`}>
      <p className={`${styles['toast-content']}`}>
        {content}
        <span className={`${styles['toast-closer']}`} onClick={handler}>
          &times;
        </span>
      </p>
    </div>
  );
};

export default Toast;
