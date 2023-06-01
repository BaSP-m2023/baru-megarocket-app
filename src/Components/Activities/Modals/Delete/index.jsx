import React from 'react';
import styles from './deleteModal.module.css';

const DeleteModal = ({ hide, onDelete, activity }) => {
  return (
    <div className={`${styles.modal}`}>
      <div className={`${styles['modal-content']}`}>
        <div className={`${styles['modal-header']}`}>
          <span className={`${styles['modal-title']}`}>Delete activity</span>
          <span className={`${styles['modal-close']}`} onClick={hide}>
            &times;
          </span>
        </div>
        <p className={`${styles['modal-message']}`}>
          Are you sure you want to delete <strong>{activity.name}</strong>?
        </p>
        <div className={`${styles['modal-buttons']}`}>
          <button
            className={`${styles.btn} ${styles['btn-submit']}`}
            onClick={() => onDelete(activity._id)}
          >
            Submit
          </button>
          <button className={`${styles.btn} ${styles['btn-cancel']}`} onClick={() => hide()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
