import React from 'react';
import { useSelector } from 'react-redux';
import styles from 'Components/SuperAdmins/Profile/profile.module.css';

function SuperAdminProfile() {
  const superAdmin = useSelector((state) => state.auth.user || '');
  const { dark } = useSelector((state) => state.darkmode);

  return (
    <>
      <div className={!dark ? styles.form : styles.darkForm}>
        {Object.keys(superAdmin).length === 0 && (
          <p className={styles.p}>There are no Super Admins to show</p>
        )}
        {Object.keys(superAdmin).length > 0 && (
          <div className={styles.content}>
            <div className={styles.body}>
              <div>
                <div
                  className={styles.label_container}
                >{`${superAdmin.name} ${superAdmin.lastName}`}</div>
              </div>
              <p className={styles.label_container}>
                {`If you want to change any information of this User, \n please contact the web
                administrator`}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default SuperAdminProfile;
