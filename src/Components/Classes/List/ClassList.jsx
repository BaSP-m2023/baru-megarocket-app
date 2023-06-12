import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './list.module.css';
import ResponseModal from '../../Shared/ResponseModal';
import Button from '../../Shared/Button';
import ConfirmModal from '../../Shared/ConfirmModal';
import { Input } from '../../Shared/Inputs';
import { useDispatch } from 'react-redux';
import { deleteClass } from '../../../Redux/Classes/thunks';
import { refreshData } from '../../../Redux/Classes/actions';

function ClassList({ classes, getById, selectedClass }) {
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState({ show: false, msg: '', state: '' });
  const [selectedClassToDelete, setSelectedClassToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleDeleteClass = (classId) => {
    dispatch(deleteClass(classId))
      .then((result) => {
        const filterClass = classes.filter((deleted) => deleted._id !== result.data._id);
        applyResponse({ msg: result.message, state: result.error === false ? 'success' : 'fail' });
        dispatch(refreshData(filterClass));
      })
      .catch(() => {
        applyResponse({ msg: 'Error deleting data', state: 'fail' });
      })
      .finally(() => {
        setSelectedClassToDelete(null);
      });
  };

  const applyResponse = ({ msg, state }) => {
    setShowModal({ show: true, msg, state });
    console.log(showModal.show);
    setTimeout(() => {
      setShowModal({ show: false, msg: '', state: '' });
    }, 3000);
  };
  const filteredClassesNotDeleted = classes.filter((item) => !item.deleted);

  const filteredClasses = filteredClassesNotDeleted.filter((item) => {
    const activityName = item.activity && item.activity.name;
    const trainerName = item.trainer && item.trainer.firstName;
    if (filter === '') {
      return filteredClassesNotDeleted;
    }
    return (
      (activityName && activityName.toLowerCase().includes(filter)) ||
      (trainerName && trainerName.toLowerCase().includes(filter))
    );
  });

  const handleSubmit = (e) => {
    setShowConfirmModal(false);
    onSubmit(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedClassToDelete) {
      handleDeleteClass(selectedClassToDelete._id);
    }
  };

  return (
    <div className={styles.container}>
      <Input placeholder="Class Filter" value={filter} change={(e) => handleFilter(e)} />
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
                  <td>{item.trainer ? item.trainer.firstName : 'Empty'}</td>
                  <td>{item.capacity}</td>
                  <td>{item.day}</td>
                  <td>{item.time}</td>
                  <td>
                    <Link to={`/classes/edit/${item._id}`}>
                      <Button
                        img={`${process.env.PUBLIC_URL}/assets/images/edit-icon.png`}
                        classNameButton={`${styles.button}`}
                      />
                    </Link>
                  </td>
                  <td>
                    <Button
                      img={`${process.env.PUBLIC_URL}/assets/images/delete-icon.png`}
                      classNameButton={`${styles.button}`}
                      action={() => {
                        setSelectedClassToDelete(item);
                        setShowConfirmModal(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showModal.show && (
        <ResponseModal
          handler={() => setShowModal({ show: false, msg: '', state: '' })}
          message={showModal.msg}
          state={showModal.state}
        />
      )}

      {showConfirmModal && (
        <ConfirmModal
          title="Delete class"
          handler={() => setShowConfirmModal(false)}
          onAction={handleSubmit}
          reason={'submit'}
        >
          Are you sure you want to delete this class?
        </ConfirmModal>
      )}
    </div>
  );
}

export default ClassList;
