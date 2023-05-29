import React, { useState } from 'react';
import styles from './edit-modal.module.css';

const EditModall = ({ addItem, data }) => {
  console.log(data);
  const [superadmin, setSuperadmin] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });
  const onChangeInput = (e) => {
    setSuperadmin({
      ...superadmin,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addItem(superadmin);
    setSuperadmin({
      name: '',
      lastName: '',
      email: '',
      password: ''
    });
  };
  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalTitle}>
          <h3>Edit superadmin</h3>
          <h3>X</h3>
        </div>
        <div>
          <form onSubmit={onSubmit}>
            <div className={styles.column1}>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" value={data.name} onChange={onChangeInput}></input>
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                name="lastName"
                value={superadmin.lastName}
                onChange={onChangeInput}
              ></input>
            </div>
            <div className={styles.column2}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={superadmin.email}
                onChange={onChangeInput}
              ></input>
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                value={superadmin.password}
                onChange={onChangeInput}
              ></input>
            </div>
            <button type="submit" className={styles.submit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditModall;
