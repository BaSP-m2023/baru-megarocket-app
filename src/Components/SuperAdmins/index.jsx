import styles from './super-admins.module.css';
import ResponseModal from '../Shared/ResponseModal';
import Table from './Table/index';
import { useEffect, useState } from 'react';
import ConfirmModal from '../Shared/ConfirmModal';

function SuperAdmins() {
  const [superadmins, setSuperadmins] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [resMessage, setResMessage] = useState('');
  const [state, setState] = useState('');
  const [success, setSuccess] = useState(false);

  const getSuperadmins = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`);
      const data = await res.json();
      setSuperadmins(data.data);
    } catch (error) {
      setState('fail');
      setResMessage(error.message);
      openModal();
    }
  };
  const closeModal = () => {
    setshowModal(false);
    sessionStorage.clear();
  };
  const openModal = () => {
    setshowModal(true);
  };
  useEffect(() => {
    const getResponseFromForm = () => {
      setState(sessionStorage.getItem('state'));
      setResMessage(sessionStorage.getItem('resMessage'));
      sessionStorage.getItem('state') && openModal();
    };
    getResponseFromForm();
    getSuperadmins();
  }, [success]);

  const confirmDelete = (id) => {
    setShowConfirmDelete(true);
    setIdToDelete(id);
  };
  const deleteItem = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${idToDelete}`, {
        method: 'DELETE'
      });
      setShowConfirmDelete(false);
      if (res.ok) {
        setSuperadmins([...superadmins.filter((superadmin) => superadmin._id !== idToDelete)]);
        sessionStorage.setItem('state', 'success');
        sessionStorage.setItem('resMessage', 'Superadmin deleted');
        setSuccess(true);
      } else {
        sessionStorage.setItem('state', 'fail');
        sessionStorage.setItem('resMessage', 'Failed to delete superadmin');
      }
    } catch (error) {
      sessionStorage.setItem('state', 'fail');
      sessionStorage.setItem('resMessage', 'Failed to delete superadmin');
    }
  };

  return (
    <section className={styles.container}>
      {showModal && <ResponseModal state={state} message={resMessage} handler={closeModal} />}
      {showConfirmDelete && (
        <ConfirmModal
          title={'Delete superadmin'}
          reason={'delete'}
          handler={() => setShowConfirmDelete(false)}
          onAction={deleteItem}
        >
          Are you sure you want to delete this superadmin?
        </ConfirmModal>
      )}
      <h2 className={styles.h2}>Superadmin List</h2>
      <Table data={superadmins} confirmDelete={confirmDelete} />
    </section>
  );
}

export default SuperAdmins;
