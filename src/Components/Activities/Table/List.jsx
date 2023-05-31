import { useState, useEffect } from 'react';
import styles from './table.module.css';

import Item from './Item';

const List = ({ activities, handleDelete, handleForm }) => {
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    setFilter(activities);
  }, [activities]);

  const filterList = (value) => {
    const activitiesToShow = activities.filter((activity) =>
      activity.name.toLowerCase().includes(value)
    );
    setFilter(activitiesToShow);
  };

  return (
    <div className={`${styles['table-container']}`}>
      <div className={`${styles['table-filter']}`}>
        {activities.length === 0 ? (
          <p className={`${styles['table-error']}`}>There is nothing to match</p>
        ) : (
          ''
        )}
        <input
          className={`${styles['table-input-filter']}`}
          type="text"
          placeholder="Search by name"
          onChange={(e) => filterList(e.target.value.toLowerCase())}
        />
        <img src="/assets/images/search-icon.png" alt="" />
      </div>
      <table className={`${styles.table}`}>
        <thead className={`${styles['table-header']}`}>
          <tr className={`${styles['table-row']}`}>
            <th>Activity</th>
            <th>Description</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filter.map((activity) => (
            <Item
              key={activity._id}
              activity={activity}
              handleDelete={handleDelete}
              handleForm={handleForm}
            />
          ))}
        </tbody>
      </table>
      <button className={`${styles['btn-new']}`} onClick={() => handleForm()}>
        + Add new
      </button>
    </div>
  );
};

export default List;
