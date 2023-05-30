import React from 'react';
import styles from './modal.module.css';

const MessageModal = (onClose) => {
  return (
    <div className={styles.form_modal}>
      <div className={styles.modan_content}>
        <div className={styles.modal_header}>
          <h2>Message</h2>
          <span className={styles.close_button} onClick={onClose}>
            &times;
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
