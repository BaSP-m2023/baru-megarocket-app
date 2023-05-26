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
    console.log(data);
    setSuperadmins(data.data);
  };
  useEffect(() => {
    getSuperadmins();
  }, []);
  //  const addItem = ({ na})
  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <Table data={superadmins} />
      <EditModal />
    </section>
  );
}

export default SuperAdmins;
