import React from 'react';
import styles from './table.module.css';

function Table({ admins, deleteAdmin, editButton }) {
  return (
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
              <td>
                <img
                  className={styles.button}
                  src={`${process.env.PUBLIC_URL}/assets/images/edit-icon.png`}
                  onClick={() => editButton(admin._id)}
                />
              </td>
              <td>
                <img
                  className={styles.button}
                  src={`${process.env.PUBLIC_URL}/assets/images/delete-icon.png`}
                  onClick={() => deleteAdmin(admin._id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;
