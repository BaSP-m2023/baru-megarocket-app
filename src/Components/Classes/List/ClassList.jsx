import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './list.module.css';
import Button from '../../Shared/Button';
import ConfirmModal from '../../Shared/ConfirmModal';
import { useDispatch } from 'react-redux';
import { deleteClass } from '../../../Redux/Classes/thunks';
import { refreshData } from '../../../Redux/Classes/actions';
import { getActivities } from 'Redux/Activities/thunks';

function ClassList({ classes }) {
  const [filter, setFilter] = useState('');
  const [selectedClassToDelete, setSelectedClassToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch();
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    dispatch(getActivities);
  }, []);
  const handleDeleteClass = (classId) => {
    dispatch(deleteClass(classId))
      .then((dataId) => {
        const filterClass = classes.filter((deleted) => deleted._id !== dataId);
        dispatch(refreshData(filterClass));
      })
      .catch(() => {
        setSelectedClassToDelete(null);
      })
      .finally(() => {
        setSelectedClassToDelete(null);
      });
  };

  const filteredClassesNotDeleted = classes.filter((item) => !item.deleted);

  const filteredClasses = filteredClassesNotDeleted.filter(
    (filtro) =>
      (filtro.activity && filtro?.activity?.name?.toLowerCase().includes(filter)) ||
      (filtro.trainer && filtro?.trainer?.firstName?.toLowerCase().includes(filter))
  );

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
      <input
        placeholder="Search By Activity/Trainer"
        value={filter}
        onChange={(e) => handleFilter(e)}
      />

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
                <tr key={item._id} className={styles.row}>
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
