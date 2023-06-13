import React, { useState, useEffect } from 'react';
import Trainer from '../Trainer';
import styles from './table.module.css';

const Table = ({ data = [] }) => {
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    setFilter(data);
  }, [data]);

  const filterList = (value) => {
    const trainersFiltered = data.filter(
      (trainer) =>
        trainer.firstName.toLowerCase().includes(value) ||
        trainer.lastName.toLowerCase().includes(value)
    );
    setFilter(trainersFiltered);
  };

  return (
    <>
      <div className={styles.filter}>
        {filter.length === 0 ? <p>There is nothing to match</p> : ''}
        <div className={`${styles['filter-container']}`}>
          <input
            className={`${styles['filter-input']}`}
            type="text"
            placeholder="Search by Name or Lastname"
            onChange={(e) => filterList(e.target.value.toLowerCase())}
          />
          <img src={`${process.env.PUBLIC_URL}/assets/images/search-icon.png`} alt="" />
        </div>
      </div>
      <table className={styles.space}>
        <thead>
          <tr>
            <th className={styles.column}>Name</th>
            <th className={styles.column}>Last Name</th>
            <th className={styles.column}>DNI</th>
            <th className={styles.column}>Phone Number</th>
            <th className={styles.column}>Email</th>
            <th className={styles.column}>Salary</th>
          </tr>
        </thead>
        <tbody>
          {filter.map((trainer) => (
            <Trainer key={trainer._id} trainer={trainer} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
