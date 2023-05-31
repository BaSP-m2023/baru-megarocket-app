import React, { useState } from 'react';
import styles from './list.module.css';

function ClassList({ classes, getById, selectedClass }) {
  const [filter, setFilter] = useState('');

  const handleFilter = async (e) => {
    await setFilter(e.target.value);
  };

  const filteredClassesNotDeleted = classes.filter((item) => !item.deleted);

  const filteredClasses = filteredClassesNotDeleted.filter((item) => {
    const activityName = item.activity && item.activity.name;
    const trainerName = item.trainer.length !== 0 && item.trainer[0].firstName;
    if (filter === '') {
      return filteredClassesNotDeleted;
    }
    return (
      (activityName && activityName.toLowerCase().includes(filter)) ||
      (trainerName && trainerName.toLowerCase().includes(filter))
    );
  });

  return (
    <>
      <input
        className={styles.filter}
        placeholder="Class Filter"
        onChange={(e) => handleFilter(e)}
      ></input>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>N°</th>
              <th>Activity</th>
              <th>Trainer</th>
              <th>Capacity</th>
              <th>Day</th>
              <th>Time</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses !== 0 &&
              filteredClasses.map((item, index) => (
                <tr
                  key={item._id}
                  onClick={() => getById(item._id)}
                  className={selectedClass && selectedClass._id === item._id ? styles.selected : ''}
                >
                  <td>{index + 1}</td>
                  <td>{item.activity !== null ? item.activity.name : 'Empty'}</td>
                  <td>{item.trainer.length !== 0 ? item.trainer[0].firstName : 'Empty'}</td>
                  <td>{item.capacity}</td>
                  <td>{item.day}</td>
                  <td>{item.time}</td>
                  <td></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ClassList;
