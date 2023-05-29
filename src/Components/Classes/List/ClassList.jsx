import { useState } from 'react';
import styles from './list.module.css';
import DataViewTD from './DataViewTd/DataViewTd';

function ClassList({ classes, getById, selectedClass, trainers, activities }) {
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
                <DataViewTD
                  editEnable={editEnable}
                  selectedClass={selectedClass}
                  item={item}
                  itemValidation={item.activity}
                  itemData={item && item.activity ? item.activity.name : null}
                  typeInput={'select'}
                  options={activities}
                  typeOptions={'activities'}
                  className={styles.inputEdit}
                />
                <DataViewTD
                  editEnable={editEnable}
                  selectedClass={selectedClass}
                  item={item}
                  itemValidation={item.trainer.length}
                  itemData={
                    item && item.trainer && item.trainer.length !== 0
                      ? item.trainer[0].firstName
                      : null
                  }
                  typeInput={'select'}
                  options={trainers}
                  typeOptions={'trainers'}
                  className={styles.inputEdit}
                />
                <DataViewTD
                  editEnable={editEnable}
                  selectedClass={selectedClass}
                  item={item}
                  itemValidation={item.capacity}
                  itemData={item.capacity}
                  typeInput={'number'}
                  className={styles.inputEdit}
                />
                <DataViewTD
                  editEnable={editEnable}
                  selectedClass={selectedClass}
                  item={item}
                  itemValidation={item.day}
                  itemData={item.day}
                  typeInput={'selectDay'}
                  className={styles.inputEdit}
                />
                <DataViewTD
                  editEnable={editEnable}
                  selectedClass={selectedClass}
                  item={item}
                  itemValidation={item.time}
                  itemData={item.time}
                  typeInput={'time'}
                  className={styles.inputEdit}
                />
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
