import styles from './super-admins.module.css';
import Form from './Form/index';
import MessageModal from './MessageModal/index';
import Table from './Table/index';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function SuperAdmins() {
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
  });

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

  return (
    <section className={styles.container}>
      {showModal && <MessageModal msg={resMessage} onClose={closeModal} />}
      <h2 className={styles.h2}>Superadmin List</h2>
      <Router>
        <Table data={superadmins} deleteItem={deleteItem} />
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
