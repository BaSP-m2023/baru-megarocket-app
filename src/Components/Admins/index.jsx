import styles from './admins.module.css';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Table from './Table';
import Button from '../Shared/Button';
import ConfirmModal from '../Shared/ConfirmModal';
import ResponseModal from '../Shared/ResponseModal';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [idToDelete, setIdToDelete] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [messageResponse, setMessageResponse] = useState('');
  const history = useHistory();

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      const res = await response.json();
      setAdmins(res.data);
    } catch (error) {
      setMessageResponse(`Error fetching admins: ${error.message}`);
      setShowResponseModal(true);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const deleteAdmin = async (idToDelete) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admins/delete/${idToDelete}`,
        {
          method: 'DELETE'
        }
      );
      if (response.ok) {
        setMessageResponse('Admin deleted');
        setShowResponseModal(true);
        setAdmins([...admins.filter((admin) => admin._id !== idToDelete)]);
      } else {
        setMessageResponse('Admin could be not deleted');
        setShowResponseModal(true);
      }
    } catch (error) {
      setMessageResponse(`Error deleting admins: ${error.message}`);
      setShowResponseModal(true);
    }
  };

  const add = () => {
    history.push('/admins/add');
  };

  const handleDeleteButton = (id) => {
    setShowConfirmModal(true);
    setIdToDelete(id);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const closeResponseModal = () => {
    setShowResponseModal(false);
  };

  const handleDeleteAdmin = () => {
    deleteAdmin(idToDelete);
    setShowConfirmModal(false);
  };

  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.title}>Admins</h2>
        <Table admins={admins} handleDeleteButton={handleDeleteButton} />
        <Link to="/admins/add">
          <Button action={add} text="Add admin" classNameButton="addButton"></Button>
        </Link>
      </section>
      {showConfirmModal && (
        <ConfirmModal
          handler={() => closeConfirmModal()}
          title="Delete Admin"
          reason="delete"
          onAction={() => handleDeleteAdmin()}
        >
          Are you sure to delete admin?
        </ConfirmModal>
      )}
      {showResponseModal && (
        <ResponseModal
          handler={() => closeResponseModal()}
          state="fail"
          message={messageResponse}
        />
      )}
    </>
  );
};

export default Admins;
