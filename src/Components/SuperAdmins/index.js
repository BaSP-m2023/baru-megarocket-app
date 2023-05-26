import styles from './super-admins.module.css';
// import Table from './Table';
import EditModal from './EditModal';
import Table from './Table';

function SuperAdmins() {
  return (
    <section className={styles.container}>
      <h2>SuperAdmins</h2>
      <Table />
      <EditModal />
    </section>
  );
}

export default SuperAdmins;
