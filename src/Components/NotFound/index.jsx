import React from 'react';
import styles from './notfound.module.css';
import { Button } from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const NotFound = () => {
  const role = sessionStorage.getItem('role');
  const history = useHistory();
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
      {role === 'SUPER_ADMIN' ? (
        <Button
          text="Go back to home"
          classNameButton="submitButton"
          action={() => history.push('/user/super-admin/home')}
        />
      ) : role ? (
        <Button
          text="Go back to home"
          classNameButton="submitButton"
          action={() => history.push(`/user/${role.toLowerCase()}/home`)}
        />
      ) : (
        <Button
          text="Go back to home"
          classNameButton="submitButton"
          action={() => history.push('/')}
        />
      )}
    </div>
  );
};

export default NotFound;
