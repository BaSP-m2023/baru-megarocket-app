import React from 'react';
import styles from './button.module.css';

const Button = ({ show }) => {
  return (
    <div>
      <button className={styles.button} onClick={show}>
        + Add New
      </button>
    </div>
  );
};

export default Button;
