import React, { useState, useEffect } from 'react';
import styles from './edit-modal.module.css';

const EditModal = ({ addItem, updatingItem, showForm, putItem, getSuperadmins }) => {
  const { name, lastName, email } = updatingItem;
  const [superadmin, setSuperadmin] = useState({});
  //const [requestStatus, setRequestStatus] = useState({});
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
    <>
      <div className={styles.modal}>
        <div className={styles.modalTitle}>
          <h3>Create superadmin</h3>
          <h3 onClick={showForm}>X</h3>
        </div>
        <div>
          <form onSubmit={onSubmit}>
            <div className={styles.column1}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={superadmin.name || ''}
                onChange={onChangeInput}
              ></input>
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                name="lastName"
                value={superadmin.lastName || ''}
                onChange={onChangeInput}
              ></input>
            </div>
            <div className={styles.column2}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={superadmin.email || ''}
                onChange={onChangeInput}
              ></input>
              {!updatingItem._id && (
                <>
                  <label htmlFor="password">Password</label>
                  <input
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
    </>
  );
};

export default EditModal;
