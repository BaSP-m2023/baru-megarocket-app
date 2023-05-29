import { useState } from 'react';
import styles from './list.module.css';

function ClassList({ classes, getById, selectedClass }) {
  const [editEnable, setEditEnable] = useState(false);

  const editActivity = () => {
    setEditEnable(true);
  };
  return (
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
          {classes.length !== 0 &&
            classes.map((item, index) => (
              <tr
                key={item._id}
                onClick={() => getById(item._id)}
                className={selectedClass && selectedClass._id === item._id ? styles.selected : ''}
              >
                <td>{index + 1}</td>
                <td>
                  {editEnable === true && selectedClass && selectedClass._id === item._id ? (
                    <input className={styles.inputEdit} type="text" />
                  ) : item && item.activity !== null ? (
                    item.activity.name
                  ) : (
                    'Empty'
                  )}
                </td>
                <td>
                  {editEnable === true && selectedClass && selectedClass._id === item._id ? (
                    <input className={styles.inputEdit} type="text" />
                  ) : item.trainer.length !== 0 ? (
                    item.trainer[0].firstName
                  ) : (
                    'Empty'
                  )}
                </td>
                <td>
                  {editEnable === true && selectedClass && selectedClass._id === item._id ? (
                    <input className={styles.inputEdit} type="text" />
                  ) : (
                    item.capacity
                  )}
                </td>
                <td>
                  {editEnable === true && selectedClass && selectedClass._id === item._id ? (
                    <input className={styles.inputEdit} type="text" />
                  ) : (
                    item.day
                  )}
                </td>
                <td>
                  {editEnable === true && selectedClass && selectedClass._id === item._id ? (
                    <input className={styles.inputEdit} type="text" />
                  ) : (
                    item.time
                  )}
                </td>

                <td>
                  {editEnable === true && selectedClass && selectedClass._id === item._id ? (
                    <button>Update</button>
                  ) : (
                    <>
                      <button onClick={editActivity}>Edit</button>
                      <button>Delete X</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClassList;
