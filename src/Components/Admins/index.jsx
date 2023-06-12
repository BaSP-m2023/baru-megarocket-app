import styles from './admins.module.css';
import React, { useEffect /* useState */ } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins } from '../../Redux/Admins/thunks';
import Loader from '../Shared/Loader';
import { Link } from 'react-router-dom';
import Table from './Table';
import Button from '../Shared/Button';
/* import ConfirmModal from '../Shared/ConfirmModal';
import ResponseModal from '../Shared/ResponseModal';
import { Input } from '../Shared/Inputs'; */

const Admins = () => {
  /* const [admins, setAdmins] = useState([]); */
  /* const [idToDelete, setIdToDelete] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [messageResponse, setMessageResponse] = useState('');
  const [filter, setFilter] = useState([]);
  const [stateResponse, setStateResponse] = useState('success'); */

  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.data);
  const pending = useSelector((state) => state.admins.isPending);

  useEffect(() => {
    getAdmins(dispatch);
  }, [dispatch]);
  /*   const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      const res = await response.json();
      setAdmins(res.data);
    } catch (error) {
      setMessageResponse(`Error fetching admins: ${error.message}`);
      setShowResponseModal(true);
    }
  }; */
  /*
  useEffect(() => {
    setFilter(admins);
  }, [admins]); */

  /* const deleteAdmin = async (idToDelete) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admins/delete/${idToDelete}`,
        {
          method: 'DELETE'
        }
      );
      if (response.ok) {
        setStateResponse('success');
        setMessageResponse('Admin deleted');
        setShowResponseModal(true);
        setAdmins([...admins.filter((admin) => admin._id !== idToDelete)]);
      } else {
        setStateResponse('fail');
        setMessageResponse('Admin could be not deleted');
        setShowResponseModal(true);
      }
    } catch (error) {
      setMessageResponse(`Error deleting admins: ${error.message}`);
      setShowResponseModal(true);
    }
  }; */
  /*
  const handleDeleteButton = (id) => {
    setShowConfirmModal(true);
    setIdToDelete(id);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const closeResponseModal = () => {
    setShowResponseModal(false);
  };

  const handleDeleteAdmin = () => {
    deleteAdmin(idToDelete);
    setShowConfirmModal(false);
  }; */

  /*   const filterAdmin = (value) => {
    const adminsToShow = admins.filter(
      (admin) =>
        admin.firstName.toLowerCase().includes(value) ||
        admin.lastName.toLowerCase().includes(value)
    );
    setFilter(adminsToShow);
  }; */

  return (
    <>
      <section className={styles.container}>
        <h2 className={styles.title}>Admins</h2>
        {/* <div className={styles.searchContainer}>
          {filter.length === 0 ? <p className={styles.notFound}>Admin not found!</p> : ''}
          <Input
            labelText="search admin"
            name="search"
            type="text"
            placeholder="search admin by name/lastname"
            change={(e) => filterAdmin(e.target.value.toLowerCase())}
          />
        </div> */}
        {pending && <Loader />}
        {!pending && <Table filter={admins} /* handleDeleteButton={handleDeleteButton} */ />}
        <Link to="/admins/add">
          <Button text="+ Add new" classNameButton="addButton"></Button>
        </Link>
      </section>
      {/* {showConfirmModal && (
        <ConfirmModal
          handler={() => closeConfirmModal()}
          title="Delete Admin"
          reason="delete"
          onAction={() => handleDeleteAdmin()}
        >
          Are you sure you want to delete admin?
        </ConfirmModal>
      )}
      {showResponseModal && (
        <ResponseModal
          handler={() => closeResponseModal()}
          state={stateResponse}
          message={messageResponse}
        />
      )} */}
    </>
  );
};

export default Admins;
