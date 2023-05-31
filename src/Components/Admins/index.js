import styles from './admins.module.css';
import { useEffect, useState } from 'react';
import Table from './Table';
import Form from './Form';
import Modal from './Modal';
import Button from './Button';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [messageResponse, setMessageResponse] = useState('');
  const [idToUpdate, setidToUpdate] = useState('');
  const [title, setTitle] = useState('');

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      const res = await response.json();
      setAdmins(res.data);
    } catch (error) {
      setMessageResponse(`Error fetching admins: ${error.message}`);
      setShowModal(true);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const deleteAdmin = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/delete/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setTitle('Delete Admin');
        setMessageResponse('Admin deleted');
        setShowModal(true);
        setAdmins([...admins.filter((admin) => admin._id !== id)]);
      } else {
        setMessageResponse('Admin could be not deleted');
        setShowModal(true);
      }
    } catch (error) {
      setTitle('Delete Admin');
      setMessageResponse(`Error deleting admins: ${error.message}`);
      setShowModal(true);
    }
  };

  const editButton = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`);
      const res = await response.json();
      setidToUpdate(res.data._id);
      setShowForm(true);
      setTitle('Edit admin');
    } catch (error) {
      setTitle('Update Admin');
      setShowModal(true);
      setMessageResponse(`Error fetching admins: ${error.message}`);
    }
  };

  const editAdmin = async (idToUpdate, adminToUpdate) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${idToUpdate}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(adminToUpdate)
      });
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        setMessageResponse('Admin updated');
        setShowForm(false);
        setShowModal(true);
        getAdmins();
      } else {
        setMessageResponse('Admin could be not updated');
        setShowForm(false);
        setShowModal(true);
      }
    } catch (error) {
      setShowForm(false);
      setShowModal(true);
      setMessageResponse(`Error updating admins: ${error.message}`);
    }
  };

  const addAdmin = async (adminToAdd) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(adminToAdd)
      });
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        setMessageResponse('Admin created');
        setShowForm(false);
        setShowModal(true);
        getAdmins();
      } else {
        setMessageResponse('Admin could be not created');
        setShowForm(false);
        setShowModal(true);
      }
    } catch (error) {
      setMessageResponse(`Error adding admins: ${error.message}`);
      setShowForm(false);
      setShowModal(true);
    }
  };

  const closeModal = () => setShowModal(false);
  const closeForm = () => setShowForm(false);

  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.title}>Admins</h2>
        <Table admins={admins} editButton={editButton} deleteAdmin={deleteAdmin} />
        <Button
          add={() => {
            setShowForm(true);
            setTitle('Add Admin');
            setidToUpdate('');
          }}
        />
        {showForm && (
          <Form
            title={title}
            addAdmin={addAdmin}
            editAdmin={editAdmin}
            idToUpdate={idToUpdate}
            admins={admins}
            closeForm={closeForm}
          />
        )}
        {showModal && <Modal content={messageResponse} title={title} closeModal={closeModal} />}
      </section>
    </>
  );
};

export default Admins;
