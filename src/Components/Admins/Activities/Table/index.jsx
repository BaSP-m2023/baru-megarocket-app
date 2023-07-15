import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './table.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'Components/Shared/Inputs';

import Activity from '../Activity';

const Table = () => {
  const [filter, setFilter] = useState([]);
  const { list } = useSelector((state) => state.activities);
  const { dark } = useSelector((state) => state.darkmode);

  useEffect(() => {
    setFilter(list);
  }, []);

  const filterList = (value) => {
    const activitiesToShow = list.filter((activity) => activity.name.toLowerCase().includes(value));
    setFilter(activitiesToShow);
  };

  return (
    <>
      <div className={styles.filterContainer}>
        <div
          className={!dark ? styles.inputContainer : styles.darkInputContainer}
          data-testid="activities-search-container"
        >
          <Input
            labelText="Filter Activities"
            name="filter-classes"
            type="text"
            placeholder="Search By Activity"
            change={(e) => filterList(e.target.value.toLowerCase())}
          />
        </div>
        <div className={!dark ? styles.icon : styles.darkIcon}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
        </div>
      </div>
      <div className={styles.container}>
        <div className={!dark ? styles.tableContainer : styles.darkTableContainer}>
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
      </div>
      {filter.length === 0 ? (
        <div className={styles.filter}>
          <p>There is no activity with that name</p>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Table;
