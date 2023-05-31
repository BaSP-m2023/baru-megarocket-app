import React from 'react';
import styles from './responsemodal.module.css';

const ResponseModal = ({ text, onClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <p className={styles.paragraph}>{text}</p>
        <button className={styles.close} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ResponseModal;
