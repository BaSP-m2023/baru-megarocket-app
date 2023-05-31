import React, { useState, useEffect } from 'react';
import styles from './form.module.css';

const Form = ({ addItem, updatingItem, showForm, putItem, getSuperadmins }) => {
  const { name, lastName, email } = updatingItem;
  const [superadmin, setSuperadmin] = useState({});
  useEffect(() => {
    setSuperadmin({
      name,
      lastName,
      email
    });
  }, [updatingItem]);
  const onChangeInput = (e) => {
    setSuperadmin({
      ...superadmin,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (updatingItem._id) {
      await putItem(updatingItem._id, superadmin);
    } else {
      addItem(superadmin);
    }
    getSuperadmins();
    showForm();
  };
  return (
    <div className={styles.formBackground}>
      <div className={styles.container}>
        <div className={styles.modalTitle}>
          <h3 className={styles.title}>Create superadmin</h3>
          <button onClick={showForm}>X</button>
        </div>
        <div>
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.column1}>
              <label className={styles.label} htmlFor="name">
                Name
              </label>
              <input
                className={styles.input}
                type="text"
                name="name"
                value={superadmin.name || ''}
                onChange={onChangeInput}
              ></input>
              <label className={styles.label} htmlFor="lastName">
                Last name
              </label>
              <input
                className={styles.input}
                type="text"
                name="lastName"
                value={superadmin.lastName || ''}
                onChange={onChangeInput}
              ></input>
            </div>
            <div className={styles.column2}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                className={styles.input}
                type="text"
                name="email"
                value={superadmin.email || ''}
                onChange={onChangeInput}
              ></input>
              {!updatingItem._id && (
                <>
                  <label className={styles.label} htmlFor="password">
                    Password
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    name="password"
                    value={superadmin.password || ''}
                    onChange={onChangeInput}
                  ></input>{' '}
                </>
              )}
            </div>
            <button type="submit" className={styles.submit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
