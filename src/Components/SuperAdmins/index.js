import styles from './super-admins.module.css';
import EditModal from './EditModal';
import Table from './Table';
import { useEffect, useState } from 'react';

function SuperAdmins() {
  const [showAddSuperadmin, setshowAddSuperadmin] = useState(false);
  const [updatingItem, setUpdatingItem] = useState({ name: '', lastName: '', email: '' });
  const [superadmins, setSuperadmins] = useState([]);
  //const [requestStatus, setRequestStatus] = useState({});

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
      const data = await res.json();
      console.log(data);
      //const msg = await data.message;
      setSuperadmins([...superadmins, data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const putItem = async (id, updatedSuperadmin) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSuperadmin)
      });
    } catch (error) {
      console.log(error);
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

  const deleteItem = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
      method: 'DELETE'
    });
    setSuperadmins([...superadmins.filter((superadmin) => superadmin._id !== id)]);
  };
  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <Table
        data={superadmins}
        deleteItem={deleteItem}
        showForm={showForm}
        update={update}
        // onEdit={() => setshowEditSuperadmin(!showEditSuperadmin)}
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
