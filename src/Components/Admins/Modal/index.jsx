import React from 'react';
import styles from './modal.module.css';

function Modal({ content, title, closeModal }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <button className={styles.close} onClick={closeModal}>
            X
          </button>
        </div>
        <div className={styles.modalContent}>
          <p className={styles.content}>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
