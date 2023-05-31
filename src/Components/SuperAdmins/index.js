import styles from './super-admins.module.css';
import Form from './Form/Form';
import MessageModal from './MessageModal/MessageModal';
import Table from './Table/Table';
import { useEffect, useState } from 'react';

function SuperAdmins() {
  const [showAddSuperadmin, setshowAddSuperadmin] = useState(false);
  const [updatingItem, setUpdatingItem] = useState({ name: '', lastName: '', email: '' });
  const [superadmins, setSuperadmins] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [resMessage, setResMessage] = useState('');

  const getSuperadmins = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`);
      const data = await res.json();
      setSuperadmins(data.data);
    } catch (error) {
      setResMessage(error.message);
      setshowModal(true);
    }
  };
  useEffect(() => {
    getSuperadmins();
  }, []);
  const showForm = () => {
    setshowAddSuperadmin(!showAddSuperadmin);
    setUpdatingItem({ name: '', lastName: '', email: '' });
  };

  const closeModal = () => {
    setshowModal(false);
  };
  const openModal = () => {
    setshowModal(true);
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
        setResMessage('New superadmin created');
        openModal();
      } else {
        setResMessage('Failed to create superadmin');
        openModal();
      }
    } catch (error) {
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
        setResMessage('Superadmin updated');
        openModal();
      } else {
        setResMessage('Failed to update superadmin');
        openModal();
      }
    } catch (error) {
      setResMessage(error.message);
      openModal();
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setResMessage('Superadmin deleted');
        openModal();
        setSuperadmins([...superadmins.filter((superadmin) => superadmin._id !== id)]);
      } else {
        setResMessage('Failed to delete superadmin');
        openModal();
      }
    } catch (error) {
      setResMessage(error.message);
      openModal();
    }
  };

  const handleUpdateClick = async (id) => {
    setshowAddSuperadmin(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
      method: 'GET'
    });
    const data = await res.json();
    setUpdatingItem(data.data);
  };

  return (
    <section className={styles.container}>
      {showModal && <MessageModal msg={resMessage} onClose={closeModal} />}
      <h2>SuperAdmins</h2>
      <Table
        data={superadmins}
        deleteItem={deleteItem}
        showForm={showForm}
        handleUpdateClick={handleUpdateClick}
        updatingItem={updatingItem}
      />
      {showAddSuperadmin && (
        <Form
          getSuperadmins={getSuperadmins}
          addItem={addItem}
          updatingItem={updatingItem}
          showForm={showForm}
          putItem={putItem}
        />
      )}
    </section>
  );
}

export default SuperAdmins;
