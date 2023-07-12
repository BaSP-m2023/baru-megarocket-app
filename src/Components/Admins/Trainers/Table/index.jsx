import React, { useState, useEffect } from 'react';
import styles from './table.module.css';
import { Input } from 'Components/Shared/Inputs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Trainer from '../Trainer';

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
      <div className={styles.filterContainer}>
        <div className={styles.inputContainer} data-testid="trainers-search-container">
          <Input
            labelText="Filter Trainers"
            type="text"
            name="filter-trainer"
            placeholder="Search by name or last name"
            change={(e) => filterList(e.target.value.toLowerCase())}
          />
        </div>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
        </div>
      </div>
      <div className={styles.container}>
        <table className={styles.space}>
          <thead>
            <tr>
              <th className={styles.column}>Name</th>
              <th className={styles.column}>Last Name</th>
              <th className={styles.column}>DNI</th>
              <th className={styles.column}>Phone Number</th>
              <th className={styles.column}>Email</th>
            </tr>
          </thead>
          <tbody data-testid="trainers-list">
            {filter.map((trainer) => (
              <Trainer key={trainer._id} trainer={trainer} />
            ))}
          </tbody>
        </table>
      </div>
      {filter.length === 0 ? (
        <div className={styles.filter}>
          <p>There is no trainer with that name or last name </p>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Table;
