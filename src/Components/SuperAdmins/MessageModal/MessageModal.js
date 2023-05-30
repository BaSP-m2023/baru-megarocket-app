import React from 'react';
import styles from './message-modal.module.css';

const MessageModal = ({ msg, onClose }) => {
  return (
    <div className={styles.modal}>
      <p>{msg}</p>
      <button onClick={onClose}>X</button>
    </div>
  );
};
export default MessageModal;
