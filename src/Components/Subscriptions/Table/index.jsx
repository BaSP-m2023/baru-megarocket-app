import React from 'react';
import styles from './table.module.css';
const Table = ({ data }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>List</h2>
      <table className={styles.tableContainer}>
        <thead className={styles.header}>
          <tr className={styles.header}>
            <th>Classes</th>
            <th>Members</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((subscription) => (
              <tr className={styles.line} key={subscription._id}>
                <td
                  className={styles.item}
                >{`${subscription.classes.day} ${subscription.classes.time}`}</td>
                {!subscription.members ? (
                  <td className={styles.item}>{'empty'}</td>
                ) : (
                  <td
                    className={styles.item}
                  >{`${subscription.members.name} ${subscription.members.lastName}`}</td>
                )}
                <td className={styles.item}>{subscription.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Cannot find any subscription</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
