import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import { Input } from '../../Shared/Input';

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
            <Input
              labelText={'Name'}
              value={superadmin.name || ''}
              name={'name'}
              change={onChangeInput}
            />
            <Input
              labelText={'Last name'}
              value={superadmin.lastName || ''}
              name={'lastName'}
              change={onChangeInput}
            />
            <Input
              labelText={'Email'}
              value={superadmin.email || ''}
              name={'lastName'}
              change={onChangeInput}
            />
            {!id && (
              <Input
                labelText={'Password'}
                value={superadmin.password || ''}
                type={'password'}
                name={'password'}
                change={onChangeInput}
              />
            )}
            <Button text={'Submit'} classNameButton={'submitButton'} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
