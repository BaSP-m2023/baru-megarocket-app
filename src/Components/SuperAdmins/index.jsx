import styles from './super-admins.module.css';
import ResponseModal from '../Shared/ResponseModal';
import Table from './Table/index';
import { useDispatch, useSelector } from 'react-redux';
import { handleDisplayToast } from '../../Redux/Shared/ResponseToast/actions';

function SuperAdmins() {
  const dispatch = useDispatch();
  const { show, message, state } = useSelector((state) => state.toast);

  return (
    <>
      {show && (
        <ResponseModal
          state={state}
          message={message}
          handler={() => dispatch(handleDisplayToast(false))}
        />
      )}
      <section className={styles.container}>
        <h2 className={styles.h2}>Superadmin List</h2>
        <Table />
      </section>
    </>
  );
}

export default SuperAdmins;
