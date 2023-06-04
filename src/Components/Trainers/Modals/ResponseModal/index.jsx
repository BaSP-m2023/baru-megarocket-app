import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './responsemodal.module.css';

const ResponseModal = ({ text, onClose }) => {
  const history = useHistory();

  const handleClose = () => {
    onClose();
    history.push('/trainers');
  };

  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <p className={styles.paragraph}>{text}</p>
        <button className={styles.close} onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ResponseModal;
