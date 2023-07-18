import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

import styles from './table.module.css';

function Table({ filter, handleDeleteButton }) {
  const { dark } = useSelector((state) => state.darkmode);
  return (
    <>
      <table className={!dark ? styles.table : styles.darkTable}>
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
                <tr className={styles.row} key={admin._id}>
                  <td className={styles.td}>{admin.firstName}</td>
                  <td className={styles.td}>{admin.lastName}</td>
                  <td className={styles.td}>{admin.dni}</td>
                  <td className={styles.td}>{admin.phone}</td>
                  <td className={styles.td}>{admin.email}</td>
                  <td className={styles.td}>{admin.city}</td>
                  <td></td>
                  <td className={styles.button} data-testid="admins-edit-btn">
                    <Link to={`/user/super-admin/admins/edit/${admin._id}`}>
                      <FontAwesomeIcon icon={faPen} className={styles.pen} />
                    </Link>
                  </td>
                  <td data-testid="admins-delete-btn">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDeleteButton(admin._id)}
                      className={styles.trash}
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
