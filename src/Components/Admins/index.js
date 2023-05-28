import styles from './admins.module.css';
import { useEffect, useState } from 'react';
import Table from './Table';

const Admins = () => {
  const [admins, setAdmins] = useState([]);

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

  const deleteAdmin = (id) => {
    setAdmins([...admins.filter((admin) => admin._id !== id)]);
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <Table admins={admins} deleteAdmin={deleteAdmin} />
    </section>
  );
};

export default Admins;
