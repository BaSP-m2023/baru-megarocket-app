import React from 'react';
import styles from './button.module.css';

const Button = ({ show }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={show}>
        +
      </button>
    </div>
  );
};

export default Button;
