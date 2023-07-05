import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './table.module.css';

import Activity from '../Activity';

const Table = () => {
  const [filter, setFilter] = useState([]);
  const { list } = useSelector((state) => state.activities);

  useEffect(() => {
    setFilter(list);
  }, []);

  const filterList = (value) => {
    const activitiesToShow = list.filter((activity) => activity.name.toLowerCase().includes(value));
    setFilter(activitiesToShow);
  };

  return (
    <>
      <h2 className={styles.title}>Activities</h2>
      <div className={styles.tableFilter} data-testid="activities-search-container">
        <input
          className={styles.tableInputFilter}
          type="text"
          placeholder="Search by name"
          onChange={(e) => filterList(e.target.value.toLowerCase())}
        />
        <img src="/assets/images/search-icon.png" alt="" />
        {filter.length === 0 ? <p className={styles.tableError}>Not found it</p> : ''}
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={`${styles.tableHeader}`}>
              <th>Activity</th>
              <th>Description</th>
              <th>Trainers</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody data-testid="activities-list">
            {filter.map((activity) => (
              <Activity key={activity._id} activity={activity} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
