import { useState } from 'react';
import styles from './list.module.css';
import DataViewTD from './DataViewTd/DataViewTd';

function ClassList({
  classes,
  getById,
  selectedClass,
  setRenderData,
  setResponseModal,
  setShowModal,
  trainers,
  activities
}) {
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

  const [editEnable, setEditEnable] = useState(false);
  const [editedClass, setEditedClass] = useState({
    activity: '',
    trainer: [],
    day: '',
    time: '',
    capacity: ''
  });

  const editActivity = (item) => {
    setEditEnable(true);
    let selectedActivity = '';
    let selectedTrainer = '';
    if (item.activity) {
      selectedActivity = item.activity.id;
    }
    if (item.trainer) {
      selectedTrainer = item.trainer.id;
    }
    setEditedClass({
      activity: selectedActivity,
      trainer: selectedTrainer,
      day: item.day,
      time: item.time,
      capacity: item.capacity
    });
  };
  const cancelEdit = () => {
    setEditEnable(false);
  };
  const updateClass = (classId) => {
    updateClassData(classId, editedClass)
      .then(() => {
        setResponseModal({ error: false, msg: 'Class updated successfully!' });
        setShowModal(true);
        setEditEnable(false);
      })
      .catch((error) => {
        setResponseModal({ error: true, msg: error.message });
        setShowModal(true);
      });
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === 'trainer') {
      const trainerArray = value.split(',');
      setEditedClass({
        ...editedClass,
        trainer: trainerArray
      });
    } else {
      setEditedClass({
        ...editedClass,
        [name]: value
      });
    }
  };
  const updateClassData = async (classId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${classId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedClass)
      });

      if (!response.ok) {
        throw new Error('Error updating the data.');
      }

      setRenderData((render) => !render);

      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
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
            {filteredClasses.length !== 0 &&
              filteredClasses.map((item, index) => (
                <tr
                  key={item._id}
                  onClick={() => getById(item._id)}
                  className={selectedClass && selectedClass._id === item._id ? styles.selected : ''}
                >
                  <td>{index + 1}</td>
                  <DataViewTD
                    editEnable={editEnable}
                    onChange={onChangeInput}
                    selectedClass={selectedClass}
                    item={item}
                    itemValidation={item.activity}
                    itemData={item && item.activity ? item.activity.name : null}
                    typeInput={'select'}
                    options={activities}
                    typeOptions={'activity'}
                    className={styles.inputEdit}
                  />
                  <DataViewTD
                    editEnable={editEnable}
                    onChange={onChangeInput}
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
                    typeOptions={'trainer'}
                    className={styles.inputEdit}
                  />
                  <DataViewTD
                    editEnable={editEnable}
                    onChange={onChangeInput}
                    selectedClass={selectedClass}
                    item={item}
                    itemValidation={item.capacity}
                    itemData={item.capacity}
                    typeInput={'number'}
                    typeOptions={'capacity'}
                    className={styles.inputEdit}
                  />
                  <DataViewTD
                    editEnable={editEnable}
                    onChange={onChangeInput}
                    selectedClass={selectedClass}
                    item={item}
                    itemValidation={item.day}
                    itemData={item.day}
                    typeInput={'selectDay'}
                    typeOptions={'day'}
                    className={styles.inputEdit}
                  />
                  <DataViewTD
                    editEnable={editEnable}
                    onChange={onChangeInput}
                    selectedClass={selectedClass}
                    item={item}
                    itemValidation={item.time}
                    itemData={item.time}
                    typeInput={'time'}
                    typeOptions={'time'}
                    className={styles.inputEdit}
                  />
                  <td>
                    {editEnable === true && selectedClass && selectedClass._id === item._id ? (
                      <>
                        <button onClick={() => updateClass(item._id)}>Update</button>
                        <button onClick={cancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => editActivity(item)}>
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/edit-icon.png`}
                            alt="DELETE"
                          />
                        </button>
                        <button onClick={() => deleteClass(item._id)}>
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/delete-icon.png`}
                            alt="DELETE"
                          />
                        </button>
                      </>
                    )}
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
