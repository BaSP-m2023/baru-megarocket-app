import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './form.module.css';

const Form = ({ addItem, showForm, putItem }) => {
  const history = useHistory();
  const goBackHandle = () => {
    history.goBack();
  };
  //const { name, lastName, email } = updatingItem;
  const { id } = useParams();
  const [superadmin, setSuperadmin] = useState({});
  useEffect(async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
      method: 'GET'
    });
    const data = res.json();
    const updatingItem = data.data;
    setSuperadmin({ updatingItem });
  }, []);
  const onChangeInput = (e) => {
    setSuperadmin({
      ...superadmin,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (superadmin._id) {
      await putItem(superadmin._id, superadmin);
    } else {
      addItem(superadmin);
    }
    goBackHandle();
  };
  return (
    <div className={styles.formBackground}>
      <div className={styles.container}>
        <div className={styles.modalTitle}>
          <h3 className={styles.title}>Create superadmin</h3>
          <button className={styles.close} onClick={showForm}>
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
              {!superadmin._id && (
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
