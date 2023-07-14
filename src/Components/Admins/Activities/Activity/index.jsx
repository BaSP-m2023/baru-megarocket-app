import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from '../Table/table.module.css';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { deleteActivity } from 'Redux/Activities/thunks';

import ConfirmModal from 'Components/Shared/ConfirmModal';

const Activity = ({ activity }) => {
  const [confirm, setConfirmModal] = useState(false);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    setConfirmModal(!confirm);
  };

  const onAction = () => {
    handleConfirm();
    dispatch(deleteActivity(activity._id));
  };

  let { url } = useRouteMatch();
  return (
    <>
      <tr className={styles.row}>
        <td>{activity.name}</td>
        <td>{activity.description}</td>
        <td>{activity.trainers.map((trainer) => `${trainer.firstName} ${trainer.lastName}, `)}</td>
        <td>
          <label
            className={
              activity.isActive
                ? `${styles.activityState} ${styles.activityActive}`
                : `${styles.activityState} ${styles.activityInactive}`
            }
          >
            {activity.isActive ? 'Active' : 'Inactive'}
          </label>
        </td>
        <td>
          <Link to={`${url}/edit/${activity._id}`}>
            <FontAwesomeIcon
              icon={faPen}
              testid="activities-edit-btn"
              className={styles.editButton}
            />
          </Link>
        </td>
        <td>
          <FontAwesomeIcon
            icon={faTrash}
            testid="activities-delete-btn"
            onClick={handleConfirm}
            className={styles.deleteButton}
          />
        </td>
      </tr>
      {confirm && (
        <ConfirmModal
          handler={handleConfirm}
          title={'Delete activity'}
          reason={'delete'}
          onAction={() => onAction()}
        >
          Are you sure you want to delete the activity <strong>{activity.name}</strong>?
        </ConfirmModal>
      )}
    </>
  );
};

export default Activity;
