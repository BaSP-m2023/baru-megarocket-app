import Button from '../../Shared/Button';
import styles from './table.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Table({ admins, handleDeleteButton }) {
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>First Name</th>
            <th className={styles.th}>Last Name</th>
            <th className={styles.th}>DNI</th>
            <th className={styles.th}>Phone</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>City</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => {
            return (
              <tr className={styles.tr} key={admin._id}>
                <td className={styles.td}>{admin.firstName}</td>
                <td className={styles.td}>{admin.lastName}</td>
                <td className={styles.td}>{admin.dni}</td>
                <td className={styles.td}>{admin.phone}</td>
                <td className={styles.td}>{admin.email}</td>
                <td className={styles.td}>{admin.city}</td>
                <td></td>
                <td className={styles.button}>
                  <Link to={`/admins/edit/${admin._id}`}>
                    <Button
                      text="Edit Button"
                      img={`${process.env.PUBLIC_URL}/assets/images/edit-icon.png`}
                      classNameButton="icon"
                    />
                  </Link>
                </td>
                <td className={styles.button}>
                  <Button
                    action={() => handleDeleteButton(admin._id)}
                    text="Delete Button"
                    img={`${process.env.PUBLIC_URL}/assets/images/delete-icon.png`}
                    classNameButton="icon"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default Table;
