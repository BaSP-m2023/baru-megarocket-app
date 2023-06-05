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
  const [showConfirmAdd, setShowConfirmAdd] = useState(false);
  const [showConfirmEdit, setShowConfirmEdit] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [superadminToAdd, setSuperadminToAdd] = useState(null);
  const [idToEdit, setIdToEdit] = useState(null);
  const [editedSuperadmin, setEditedSuperadmin] = useState(null);
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
  const confirmAdd = async (newSuperadmin) => {
    setShowConfirmAdd(true);
    setSuperadminToAdd(newSuperadmin);
  };
  const addItem = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superadminToAdd)
      });
      setShowConfirmAdd(false);
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
  const confirmEdit = (id, updatedSuperadmin) => {
    setShowConfirmEdit(true);
    setIdToEdit(id);
    setEditedSuperadmin(updatedSuperadmin);
  };
  const putItem = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${idToEdit}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedSuperadmin)
      });
      setShowConfirmEdit(false);
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

      {showConfirmAdd && (
        <ConfirmModal
          title={'New superadmin'}
          reason={'submit'}
          handler={() => setShowConfirmAdd(false)}
          onAction={addItem}
        >
          Are you sure you want to add this superadmin?
        </ConfirmModal>
      )}
      {showConfirmEdit && (
        <ConfirmModal
          title={'Edit superadmin'}
          reason={'submit'}
          handler={() => setShowConfirmEdit(false)}
          onAction={putItem}
        >
          Are you sure you want to edit this superadmin?
        </ConfirmModal>
      )}
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
      <Router>
        <Table data={superadmins} deleteItem={deleteItem} confirmDelete={confirmDelete} />
        <Switch>
          <Route path="/super-admins/form/:id">
            <Form putItem={putItem} addItem={addItem} confirmEdit={confirmEdit} />
          </Route>
          <Route path="/super-admins/form">
            <Form addItem={addItem} confirmAdd={confirmAdd} />
          </Route>
        </Switch>
      </Router>
    </section>
  );
}

export default SuperAdmins;
