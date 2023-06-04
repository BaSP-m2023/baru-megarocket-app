import React from 'react';
import styles from './button.module.css';
import { Link } from 'react-router-dom';

function MyButton({ add }) {
  return (
    <Link to="./admins/add">
      <button className={styles.addButton} onClick={add}>
        + Add New
      </button>
    </Link>
  );
}

export default MyButton;
