import React from 'react';
import styles from './table.module.css';
const Table = ({ data }) => {
  return (
    <table className={styles.tableContainer}>
      <thead>
        <tr>
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
  );
};
export default Table;
