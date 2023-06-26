import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modalConfirm.module.css';
import Button from '../Button';

const ConfirmModal = ({ children, handler, title, reason, onAction }) => {
  const classByReason = {
    submit: 'submitButton',
    delete: 'deleteButton'
  };
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalContent} data-testid="confirm-modal-container">
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>{title}</span>
          <span className={styles.modalCloser} onClick={handler}>
            &times;
          </span>
        </div>
        <p className={styles.modalMessage}>{children}</p>
        <div className={styles.modalButtons} data-testid="confirm-modal-buttons">
          <Button action={handler} text={'Cancel'} classNameButton={'cancelButton'} />
          <Button
            action={onAction}
            text={`${reason.charAt(0).toUpperCase()}${reason.substring(1)}`}
            classNameButton={classByReason[reason]}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
