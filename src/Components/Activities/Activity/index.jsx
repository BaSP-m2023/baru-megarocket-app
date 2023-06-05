import React from 'react';
import { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import styles from '../Table/table.module.css';
import ConfirmModal from '../../Shared/ConfirmModal';

const Activity = ({ activity, onDelete }) => {
  const [confirm, setConfirmModal] = useState(false);

  const handleConfirm = () => {
    setConfirmModal(!confirm);
  };

  const onAction = () => {
    handleConfirm();
    onDelete(activity._id);
  };

  let { url } = useRouteMatch();
  return (
    <>
      <tr className={styles.tableRow}>
        <td>{activity.name}</td>
        <td>{activity.description}</td>
        <td>{activity.isActive ? 'Active' : 'Deactive'}</td>
        <td>
          <Link to={`${url}/edit/${activity._id}`}>
            <img
              className={styles.tableButtons}
              src="/assets/images/edit-icon.png"
              alt="edit icon"
            />
          </Link>
        </td>
        <td>
          <img
            className={styles.tableButtons}
            src="/assets/images/delete-icon.png"
            alt="delete icon"
            onClick={handleConfirm}
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
