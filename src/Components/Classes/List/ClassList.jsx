import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './list.module.css';
import ResponseModal from '../../Shared/ResponseModal';
import Button from '../../Shared/Button';
import ConfirmModal from '../../Shared/ConfirmModal';
import { Input } from '../../Shared/Inputs';

function ClassList({ classes }) {
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState({ show: false, msg: '', state: '' });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  const handleSubmit = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className={styles.container}>
      <Input placeholder="Class Filter" value={filter} change={(e) => setFilter(e.target.value)} />
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
                <tr key={item._id}>
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
