import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTrainer } from '../../../Redux/Trainers/thunks';
import styles from './trainer.module.css';
import Button from '../../Shared/Button';
import ConfirmModal from '../../Shared/ConfirmModal';

const Trainer = ({ trainer }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTrainer(trainer._id));
    setShowDeleteModal(false);
  };

  return (
    <tr className={styles.row}>
      <td className={styles.align}>{trainer.firstName}</td>
      <td className={styles.align}>{trainer.lastName}</td>
      <td className={styles.align}>{trainer.dni}</td>
      <td className={styles.align}>{trainer.phone}</td>
      <td className={styles.align}>{trainer.email}</td>
      <td>
        <Link to={`/trainers/edit/${trainer._id}`}>
          <Button
            img={`${process.env.PUBLIC_URL}/assets/images/edit-icon.png`}
            testid="trainers-edit-btn"
          >
            <img className={styles.icon} alt="pencil icon for edit a trainer" />
          </Button>
        </Link>
      </td>
      <td>
        <Button
          img={`${process.env.PUBLIC_URL}/assets/images/delete-icon.png`}
          action={handleDeleteClick}
          testid="trainers-delete-btn"
        >
          <img className={styles.delete} alt="trash icon for delete a trainer" />
        </Button>
      </td>
      <td>
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
      </td>
    </tr>
  );
};

export default Trainer;
