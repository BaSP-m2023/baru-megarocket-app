import React from 'react';
import Trainer from '../Trainer';
import styles from './table.module.css';

const Table = ({ data, deleteTrainer, updTrainer }) => {
  return (
    <table className={styles.space}>
      <thead>
        <tr>
          <th className={styles.column}>Name</th>
          <th className={styles.column}>Last Name</th>
          <th className={styles.column}>ID</th>
          <th className={styles.column}>Phone Number</th>
          <th className={styles.column}>Email</th>
          <th className={styles.column}>Salary</th>
        </tr>
      </thead>
      <tbody>
        {data.map((trainer) => (
          <Trainer
            key={trainer._id}
            trainer={trainer}
            deleteTrainer={deleteTrainer}
            updTrainer={updTrainer}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
