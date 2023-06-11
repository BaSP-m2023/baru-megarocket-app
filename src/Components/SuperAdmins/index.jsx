import styles from './super-admins.module.css';
import ResponseModal from '../Shared/ResponseModal';
import Table from './Table/index';
import { useDispatch, useSelector } from 'react-redux';
import { closeMessage } from '../../Redux/SuperAdmins/actions';

function SuperAdmins() {
  const dispatch = useDispatch();
  const resState = useSelector((state) => state.superadmins.resState);
  const resMessage = useSelector((state) => state.superadmins.resMessage);
  var showMessage = useSelector((state) => state.superadmins.showMessage);

  const closeModal = () => {
    dispatch(closeMessage());
  };

  return (
    <>
      {showMessage && <ResponseModal state={resState} message={resMessage} handler={closeModal} />}
      <section className={styles.container}>
        <h2 className={styles.h2}>Superadmin List</h2>
        <Table />
      </section>
    </>
  );
}

export default SuperAdmins;
