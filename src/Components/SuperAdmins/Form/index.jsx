import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Button from '../../Shared/Button';

const Form = ({ addItem, putItem }) => {
  const [superadmin, setSuperadmin] = useState({});
  const history = useHistory();
  const goBackHandle = () => {
    history.goBack();
  };
  const { id } = useParams();

  const getItemById = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
      method: 'GET'
    });
    const data = await res.json();
    const updatingItem = data.data;
    const { name, lastName, email } = updatingItem;
    setSuperadmin({
      name,
      lastName,
      email
    });
  };

  useEffect(() => {
    id && getItemById();
  }, []);

  const onChangeInput = (e) => {
    setSuperadmin({
      ...superadmin,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    id ? await putItem(id, superadmin) : addItem(superadmin);
    goBackHandle();
  };
  return (
    <div className={styles.formBackground}>
      <div className={styles.container}>
        <div className={styles.modalTitle}>
          <h3 className={styles.title}>{id ? 'Edit superadmin' : 'Create superadmin'}</h3>
          <button className={styles.close} onClick={goBackHandle}>
            X
          </button>
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
              {!id && (
                <>
                  <label className={styles.label} htmlFor="password">
                    Password
                  </label>
                  <input
                    className={styles.input}
                    type="password"
                    name="password"
                    value={superadmin.password || ''}
                    onChange={onChangeInput}
                  ></input>{' '}
                </>
              )}
            </div>
            <Button text={'Submit'} classNameButton={'submitButton'} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
