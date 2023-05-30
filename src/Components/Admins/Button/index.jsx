import React from 'react';
import styles from './button.module.css';

function Button({ add }) {
  return (
    <button className={styles.button} onClick={add}>
      + Add New
    </button>
  );
}

export default Button;
