import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './modal.module.css';

const Modal = ({ title, onClose, children }) => {
  const history = useHistory();

  const handleClose = () => {
    onClose();
    history.push('/trainers');
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <header className={styles.flex}>
          <h3 className={styles.h3}>{title}</h3>
          <button className={styles.close} onClick={handleClose}>
            &times;
          </button>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Modal;
