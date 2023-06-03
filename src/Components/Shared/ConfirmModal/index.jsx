import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modalConfirm.module.css';

const ConfirmModal = ({ children, show, handleModal, title, onAction }) => {
  if (!show) return null;
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>{title}</span>
          <span className={styles.modalCloser} onClick={handleModal}>
            &times;
          </span>
        </div>
        <p className={styles.modalMessage}>{children}</p>
        <div className={styles.modalButtons}>
          <button className={`${styles.btn} ${styles.btnSubmit}`} onClick={onAction}>
            Submit
          </button>
          <button className={`${styles.btn} ${styles.btnCancel}`} onClick={handleModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
