import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './trainer.module.css';
import ConfirmModal from '../Modals/ConfirmModal';

const Trainer = ({ trainer, deleteTrainer }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTrainer(trainer._id);
      setShowDeleteModal(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <tr className={styles.row}>
      <td className={styles.align}>{trainer.firstName}</td>
      <td className={styles.align}>{trainer.lastName}</td>
      <td className={styles.align}>{trainer.dni}</td>
      <td className={styles.align}>{trainer.phone}</td>
      <td className={styles.align}>{trainer.email}</td>
      <td className={styles.align}>{trainer.salary}</td>
      <td>
        <Link to={`/trainers/edit/${trainer._id}`}>
          <img
            className={styles.edit}
            src={`${process.env.PUBLIC_URL}/assets/images/edit-icon.png`}
            alt="pencil icon for edit a trainer"
          />
        </Link>
      </td>
      <td>
        <img
          className={styles.delete}
          src={`${process.env.PUBLIC_URL}/assets/images/delete-icon.png`}
          onClick={handleDeleteClick}
          alt="trash icon for delete a trainer"
        />
      </td>
      <td>
        {showDeleteModal && (
          <ConfirmModal
            title="Delete Trainer"
            message="Are you sure you want to delete this trainer?"
            onClose={() => setShowDeleteModal(false)}
            onDelete={handleConfirmDelete}
          />
        )}
      </td>
    </tr>
  );
};

export default Trainer;
