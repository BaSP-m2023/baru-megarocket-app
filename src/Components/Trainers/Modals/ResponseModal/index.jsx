import React from 'react';
import styles from './responsemodal.module.css';
import { useHistory } from 'react-router-dom';

const ResponseModal = ({ text, onClose }) => {
  const history = useHistory();

  const handleMessageClose = () => {
    history.push('/trainers');
    onClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <p className={styles.paragraph}>{text}</p>
        <button className={styles.close} onClick={handleMessageClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ResponseModal;
