/* eslint-disable no-unused-vars */
import styles from './super-admins.module.css';
import Form from './Form/index';
import ResponseModal from '../Shared/ResponseModal';
import Table from './Table/index';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ConfirmModal from '../Shared/ConfirmModal';

function SuperAdmins() {
  const [superadmins, setSuperadmins] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(true);
  const [idToDelete, setIdToDelete] = useState(null);
  const [resMessage, setResMessage] = useState('');
  const [state, setSate] = useState('');

  const getSuperadmins = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`);
      const data = await res.json();
      setSuperadmins(data.data);
    } catch (error) {
      setSate('fail');
      setResMessage(error.message);
      openModal();
    }
  };
  useEffect(() => {
    getSuperadmins();
  });

  const closeModal = () => {
    setshowModal(false);
  };
  const openModal = () => {
    setshowModal(true);
  };
  const closeConfirm = () => {
    setShowConfirm(false);
  };
  const openConfirm = () => {
    setShowConfirm(true);
  };
  const addItem = async (superadmin) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superadmin)
      });
      getSuperadmins();
      if (res.ok) {
        setSate('success');
        setResMessage('New superadmin created');
        openModal();
      } else {
        setSate('fail');
        setResMessage('Failed to create superadmin');
        openModal();
      }
    } catch (error) {
      setSate('fail');
      setResMessage(error.message);
      openModal();
    }
  };

  const putItem = async (id, updatedSuperadmin) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSuperadmin)
      });
      if (res.ok) {
        setSate('success');
        setResMessage('Superadmin updated');
        openModal();
      } else {
        setSate('fail');
        setResMessage('Failed to update superadmin');
        openModal();
      }
    } catch (error) {
      setSate('fail');
      setResMessage(error.message);
      openModal();
    }
  };
  const confirmDelete = (id) => {
    openConfirm();
    setIdToDelete(id);
  };
  const deleteItem = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${idToDelete}`, {
        method: 'DELETE'
      });
      closeConfirm();
      if (res.ok) {
        setSate('success');
        setResMessage('Superadmin deleted');
        openModal();
        setSuperadmins([...superadmins.filter((superadmin) => superadmin._id !== idToDelete)]);
      } else {
        setSate('fail');
        setResMessage('Failed to delete superadmin');
        openModal();
      }
    } catch (error) {
      setSate('fail');
      setResMessage(error.message);
      openModal();
    }
  };

  return (
    <section className={styles.container}>
      {showModal && <ResponseModal state={state} message={resMessage} handler={closeModal} />}

      {showConfirm && (
        <ConfirmModal
          title={'Delete superadmin'}
          reason={'delete'}
          handler={closeConfirm}
          onAction={deleteItem}
        >
          Are you sure you want to delete this superadmin?
        </ConfirmModal>
      )}
      <h2 className={styles.h2}>Superadmin List</h2>
      <Router>
        <Table data={superadmins} deleteItem={deleteItem} confirmDelete={confirmDelete} />
        <Switch>
          <Route path="/super-admins/form/:id">
            <Form putItem={putItem} addItem={addItem} />
          </Route>
          <Route path="/super-admins/form">
            <Form putItem={putItem} addItem={addItem} />
          </Route>
        </Switch>
      </Router>
    </section>
  );
}

export default SuperAdmins;
