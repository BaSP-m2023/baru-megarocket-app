import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './list.module.css';

function ClassList({
  classes,
  getById,
  selectedClass,
  setResponseModal,
  setShowModal,
  setRenderData
}) {
  const [filter, setFilter] = useState('');

  const handleFilter = async (e) => {
    await setFilter(e.target.value);
  };
  const deleteClass = async (classId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/delete/${classId}`, {
        method: 'PUT'
      });

      if (!response.ok) {
        throw new Error('Error deleting the data.');
      }
      setResponseModal({ error: false, msg: 'Class deleted successfully!' });
      setShowModal(true);
      setRenderData((render) => !render);

      return response.json();
    } catch (error) {
      setResponseModal({ error: true, msg: error.message });
      setShowModal(true);
    }
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
        <table className={styles.table}>
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
                  className={`${styles.row} ${
                    selectedClass && selectedClass._id === item._id ? styles.selected : ''
                  }`}
                >
                  <td>{index + 1}</td>
                  <td>{item.activity !== null ? item.activity.name : 'Empty'}</td>
                  <td>{item.trainer.length !== 0 ? item.trainer[0].firstName : 'Empty'}</td>
                  <td>{item.capacity}</td>
                  <td>{item.day}</td>
                  <td>{item.time}</td>
                  <td>
                    <Link to={'/classes/edit'}>
                      <button className={`${styles.button}`}>
                        <img
                          className={`${styles.buttonImg}`}
                          src={`${process.env.PUBLIC_URL}/assets/images/edit-icon.png`}
                          alt="EDIT"
                        />
                      </button>
                    </Link>
                    <button className={`${styles.button}`} onClick={() => deleteClass(item._id)}>
                      <img
                        className={`${styles.buttonImg}`}
                        src={`${process.env.PUBLIC_URL}/assets/images/delete-icon.png`}
                        alt="DELETE"
                      />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ClassList;
