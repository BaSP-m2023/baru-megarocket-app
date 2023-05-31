import React from 'react';
import styles from './confirmmodal.module.css';

const ConfirmModal = ({ title, message, onClose, onDelete }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h4 className={styles.title}>{title}</h4>
          <button className={styles.close} onClick={onClose}>
            &times;
          </button>
        </header>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <button className={styles.submit} onClick={onDelete}>
            Submit
          </button>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
