import React, { useState } from 'react';
import styles from './trainer.module.css';
import Modal from '../Modals/Modal';
import ConfirmModal from '../Modals/ConfirmModal';
import Form from '../Form';

const Trainer = ({ trainer, deleteTrainer, updTrainer }) => {
  const [showEditModal, setShowEditModal] = useState(false);
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

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleUpdateTrainer = async (id, updatedTrainer) => {
    try {
      await updTrainer(id, updatedTrainer);
      setShowEditModal(false);
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
        <img
          className={styles.edit}
          src="assets/images/edit-icon.png"
          alt="pencil icon for edit a trainer"
          onClick={handleEditClick}
        />
      </td>
      <td>
        <img
          className={styles.delete}
          src="assets/images/delete-icon.png"
          onClick={handleDeleteClick}
          alt="trash icon for delete a trainer"
        />
      </td>
      <td>
        {showEditModal && (
          <Modal title="Edit Trainer" onClose={() => setShowEditModal(false)}>
            <Form edit={trainer} onUpdate={handleUpdateTrainer} />
          </Modal>
        )}
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
