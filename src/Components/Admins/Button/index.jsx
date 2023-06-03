import React from 'react';
import styles from './button.module.css';
import { Link } from 'react-router-dom';

function Button({ add }) {
  return (
    <Link to="./admins/add">
      <button className={styles.button} onClick={add}>
        + Add New
      </button>
    </Link>
  );
}

export default Button;
