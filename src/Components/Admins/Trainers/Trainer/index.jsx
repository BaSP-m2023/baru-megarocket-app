import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './trainer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { deleteTrainer } from 'Redux/Trainers/thunks';

import ConfirmModal from 'Components/Shared/ConfirmModal';

const Trainer = ({ trainer }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { dark } = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();

  const handleConfirmDelete = () => {
    dispatch(deleteTrainer(trainer._id));
    setShowDeleteModal(false);
  };

  return (
    <tr className={!dark ? styles.row : styles.darkRow}>
      <td className={styles.align}>{trainer.firstName}</td>
      <td className={styles.align}>{trainer.lastName}</td>
      <td className={styles.align}>{trainer.dni}</td>
      <td className={styles.align}>{trainer.phone}</td>
      <td className={styles.align}>{trainer.email}</td>
      <td>
        <Link to={`trainers/edit/${trainer._id}`}>
          <FontAwesomeIcon icon={faPen} className={styles.pen} testid="trainers-edit-btn" />
        </Link>
      </td>
      <td>
        <FontAwesomeIcon
          icon={faTrash}
          className={styles.trash}
          testid="trainers-delete-btn"
          onClick={() => setShowDeleteModal(true)}
        />
      </td>
      <>
        {showDeleteModal && (
          <ConfirmModal
            title="Delete Trainer"
            handler={() => setShowDeleteModal(false)}
            onAction={handleConfirmDelete}
            reason={'delete'}
          >
            Are you sure you want to delete this trainer?
          </ConfirmModal>
        )}
      </>
    </tr>
  );
};

export default Trainer;
