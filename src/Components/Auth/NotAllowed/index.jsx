import React from 'react';
import styles from './notAllowed.module.css';

const NotAllowed = () => {
  return (
    <div className={styles.container}>
      <section className={styles.errorContainer}>
        <span>
          <span>4</span>
        </span>
        <span>0</span>
        <span>
          <span>5</span>
        </span>
      </section>
      <h4>PAGE NOT ALLOWED</h4>
    </div>
  );
};

export default NotAllowed;
