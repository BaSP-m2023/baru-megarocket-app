import Button from 'Components/Shared/Button';
import styles from 'Components/Admins/Table/table.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Table({ filter, handleDeleteButton }) {
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
        <tbody data-testid="admins-list">
          {filter.length > 0 &&
            filter.map((admin) => {
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
                        testid="admins-edit-btn"
                      />
                    </Link>
                  </td>
                  <td className={styles.button}>
                    <Button
                      action={() => handleDeleteButton(admin._id)}
                      text="Delete Button"
                      img={`${process.env.PUBLIC_URL}/assets/images/delete-icon.png`}
                      classNameButton="icon"
                      testid="admins-delete-btn"
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
