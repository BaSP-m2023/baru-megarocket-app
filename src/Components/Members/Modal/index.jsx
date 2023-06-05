import React from 'react';
import styles from './modal.module.css';

const MessageModal = ({ modalMessage, onCloseMessage, handleMessageClose }) => {
  return (
    <div className={styles.modal} onClick={onCloseMessage}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h2>Message</h2>
          <span className={styles.close_button} onClick={() => handleMessageClose()}>
            &times;
          </span>
        </div>
        <div className={styles.modal_body}>
          <span>{modalMessage}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
