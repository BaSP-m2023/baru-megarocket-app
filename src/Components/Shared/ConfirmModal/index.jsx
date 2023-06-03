import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modalConfirm.module.css';
import Button from '../Button';

const ConfirmModal = ({ children, handleModal, title, onAction }) => {
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
          <Button action={handleModal} text={'Cancel'} classNameButton={'cancelButton'} />
          <Button action={onAction} text={'Submit'} classNameButton={'submitButton'} />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;