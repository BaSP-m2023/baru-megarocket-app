import styles from './super-admins.module.css';
import EditModal from './EditModal';
import MessageModal from './MessageModal/MessageModal';
import Table from './Table';
import { useEffect, useState } from 'react';

function SuperAdmins() {
  const [showAddSuperadmin, setshowAddSuperadmin] = useState(false);
  const [updatingItem, setUpdatingItem] = useState({ name: '', lastName: '', email: '' });
  const [superadmins, setSuperadmins] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [resMessage, setResMessage] = useState('');

  const getSuperadmins = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`);
    const data = await res.json();
    setSuperadmins(data.data);
  };
  useEffect(() => {
    getSuperadmins();
  }, []);

  const addItem = async (superadmin) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superadmin)
      });
      //const data = res.json();
      getSuperadmins();
      //setSuperadmins([...superadmins, data.data]);
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
  const showForm = () => {
    setshowAddSuperadmin(!showAddSuperadmin);
    setUpdatingItem({ name: '', lastName: '', email: '' });
  };
  const update = async (id) => {
    setshowAddSuperadmin(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
      method: 'GET'
    });
    const data = await res.json();
    setUpdatingItem(data.data);
  };
  const closeModal = () => {
    setshowModal(false);
  };
  const openModal = () => {
    setshowModal(true);
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

  return (
    <section className={styles.container}>
      {showModal && <MessageModal msg={resMessage} onClose={closeModal} />}
      <h2>SuperAdmins</h2>
      <Table
        data={superadmins}
        deleteItem={deleteItem}
        showForm={showForm}
        update={update}
        updatingItem={updatingItem}
      />
      {showAddSuperadmin && updatingItem && (
        <EditModal
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
