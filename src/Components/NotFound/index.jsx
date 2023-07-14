import React from 'react';
import styles from './notfound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <section className={styles.errorContainer}>
        <span>
          <span>4</span>
        </span>
        <span>0</span>
        <span>
          <span>4</span>
        </span>
      </section>
      <h4>PAGE NOT FOUND</h4>
    </div>
  );
};

export default NotFound;
