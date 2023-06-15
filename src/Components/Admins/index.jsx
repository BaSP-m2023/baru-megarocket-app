import styles from './admins.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins, deleteAdmin } from '../../Redux/Admins/thunks';
import Loader from '../Shared/Loader';
import { Link } from 'react-router-dom';
import Table from './Table';
import Button from '../Shared/Button';
import { Input } from '../Shared/Inputs';
import ConfirmModal from '../Shared/ConfirmModal';
import ResponseModal from '../Shared/ResponseModal';
import { handleDisplayToast } from '../../Redux/Shared/ResponseToast/actions';

const Admins = () => {
  const [filter, setFilter] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.data);
  const pending = useSelector((state) => state.admins.isPending);
  const { show, message, state } = useSelector((state) => state.toast);

  useEffect(() => {
    getAdmins(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setFilter(admins);
  }, [admins]);

  const handleDeleteAdmin = () => {
    deleteAdmin(dispatch, idToDelete);
    setShowConfirmModal(false);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const closeResponseModal = () => {
    dispatch(handleDisplayToast(false));
  };

  const handleDeleteButton = (id) => {
    setShowConfirmModal(true);
    setIdToDelete(id);
  };

  const filterAdmin = (value) => {
    const adminsToShow = admins.filter(
      (admin) =>
        admin.firstName.toLowerCase().includes(value) ||
        admin.lastName.toLowerCase().includes(value)
    );
    setFilter(adminsToShow);
  };

  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.title}>Admins</h2>
        <div className={styles.searchContainer}>
          {filter.length === 0 && <p className={styles.notFound}>Admin not found!</p>}
          <Input
            labelText="search admin"
            name="search"
            type="text"
            placeholder="search admin by name/lastname"
            change={(e) => filterAdmin(e.target.value.toLowerCase())}
          />
        </div>
        {pending && <Loader />}
        {!pending && <Table filter={filter} handleDeleteButton={handleDeleteButton} />}
        <Link to="/admins/add">
          <Button text="+ Add new" classNameButton="addButton"></Button>
        </Link>
      </section>
      {showConfirmModal && (
        <ConfirmModal
          handler={() => closeConfirmModal()}
          title="Delete Admin"
          reason="delete"
          onAction={() => handleDeleteAdmin()}
        >
          Are you sure you want to delete admin?
        </ConfirmModal>
      )}
      {show && (
        <ResponseModal handler={() => closeResponseModal()} state={state} message={message} />
      )}
    </>
  );
};

export default Admins;
