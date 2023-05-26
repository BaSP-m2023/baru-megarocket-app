import React from 'react';
import styles from './edit-modal.module.css';

const EditModal = () => {
  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalTitle}>
          <h3>Edit superadmin</h3>
          <h3>X</h3>
        </div>
        <div>
          <form>
            <div className={styles.column1}>
              <label htmlFor="name">Name</label>
              <input type="text" name="name"></input>
              <label htmlFor="lastname">Last name</label>
              <input type="text" name="lastname"></input>
            </div>
            <div className={styles.column2}>
              <label htmlFor="email">Email</label>
              <input type="text" name="email"></input>
              <label htmlFor="password">Password</label>
              <input type="text" name="password"></input>
            </div>
          </form>
          <button type="submit" className={styles.submit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default EditModal;
