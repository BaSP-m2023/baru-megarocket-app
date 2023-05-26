import styles from './super-admins.module.css';
// import Table from './Table';
import EditModal from './EditModal';
import Table from './Table';
import { useEffect, useState } from 'react';

function SuperAdmins() {
  const [superadmins, setSuperadmins] = useState([]);
  const getSuperadmins = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`);
    const data = await res.json();
    setSuperadmins(data.data);
  };
  useEffect(() => {
    getSuperadmins();
  }, []);
  //  const addItem = ({ na})
  const deleteItem = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
      method: 'DELETE'
    });
    setSuperadmins([...superadmins.filter((superadmin) => superadmin._id !== id)]);
  };
  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <Table data={superadmins} deleteItem={deleteItem} />
      <EditModal />
    </section>
  );
}

export default SuperAdmins;
