import React from 'react';
import styles from './message-modal.module.css';

const MessageModal = ({ msg, onClose }) => {
  return (
    <div className={styles.modal}>
      <p className={styles.text}>{msg}</p>
      <button className={styles.button} onClick={onClose}>
        X
      </button>
    </div>
  );
};
export default MessageModal;
