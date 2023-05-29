import styles from './super-admins.module.css';
import EditModal from './EditModal';
import EditModall from './EditModall';
import Table from './Table';
import { useEffect, useState } from 'react';

function SuperAdmins() {
  const [showAddSuperadmin, setshowAddSuperadmin] = useState(false);
  const [showEditSuperadmin, setshowEditSuperadmin] = useState(false);
  const [superadmins, setSuperadmins] = useState([]);
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
      console.log(superadmin);
      const data = await res.json();
      setSuperadmins([...superadmins, data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async (id, updatedSuperadmin) => {
    setshowEditSuperadmin(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSuperadmin)
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
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
        onAdd={() => setshowAddSuperadmin(!showAddSuperadmin)}
        // onEdit={() => setshowEditSuperadmin(!showEditSuperadmin)}
        updateItem={updateItem}
      />
      {showAddSuperadmin && <EditModal addItem={addItem} />}
      {showEditSuperadmin && <EditModall editItem={updateItem} data={superadmins} />}
    </section>
  );
}

export default SuperAdmins;
