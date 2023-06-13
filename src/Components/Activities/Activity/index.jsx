import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { deleteActivity } from '../../../Redux/Activities/thunks';

import styles from '../Table/table.module.css';
import ConfirmModal from '../../Shared/ConfirmModal';
import Button from '../../Shared/Button';
import ResponseModal from '../../Shared/ResponseModal';

const Activity = ({ activity }) => {
  const { response, success } = useSelector((state) => state.activities);
  const [confirm, setConfirmModal] = useState(false);
  const [responseModal, setResponseModal] = useState({ show: false, state: '', message: '' });
  const dispatch = useDispatch();

  const handleResponse = () => {
    setResponseModal({
      ...responseModal,
      show: !responseModal.show,
      state: response.state,
      message: response.message
    });

    setTimeout(() => {
      setResponseModal({});
    }, 2000);
  };

  useEffect(() => {
    if (success) {
      handleResponse();
    }
  }, []);

  const handleConfirm = () => {
    setConfirmModal(!confirm);
  };

  const onAction = () => {
    handleConfirm();
    deleteActivity(dispatch, activity._id);
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
            <Button img="/assets/images/edit-icon.png" text="edit icon" classNameButton="icon" />
          </Link>
        </td>
        <td>
          <Button
            action={handleConfirm}
            img="/assets/images/delete-icon.png"
            text="delete icon"
            classNameButton="icon"
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
      {responseModal.show && (
        <ResponseModal
          handler={handleResponse}
          state={responseModal.state}
          message={responseModal.message}
        />
      )}
    </>
  );
};

export default Activity;
