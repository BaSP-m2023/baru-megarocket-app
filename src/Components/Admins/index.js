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
      error;
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
      const res = await response.json();
      console.log(res);
      setAdmins([...admins.filter((admin) => admin._id !== id)]);
    } catch (error) {
      error;
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
      error;
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
        setShowModal(true);
        getAdmins();
      } else {
        setMessageResponse('Admin could be not updated');
        setShowModal(true);
      }
    } catch (error) {
      error;
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
        setShowModal(true);
        getAdmins();
      } else {
        setMessageResponse('Admin could be not created');
        setShowModal(true);
      }
    } catch (error) {
      error;
    }
  };
  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <Table admins={admins} deleteAdmin={deleteAdmin} editButton={editButton} />
      <Button
        add={() => {
          setShowForm(true);
          setTitle('Add admin');
        }}
      />
      {showForm && (
        <Form
          title={title}
          addAdmin={addAdmin}
          editAdmin={editAdmin}
          idToUpdate={idToUpdate}
          admins={admins}
        />
      )}
      {showModal && <Modal content={messageResponse} />}
    </section>
  );
};

export default Admins;
