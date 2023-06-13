import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainers } from '../../Redux/Trainers/thunks';
import styles from './trainers.module.css';
import Table from './Table';
import Loader from '../Shared/Loader';
import Button from '../Shared/Button';
import ResponseModal from '../Shared/ResponseModal';
import { responseModal } from '../../Redux/Shared/ResponseModal/actions';

const Trainers = () => {
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainers.data);
  const pending = useSelector((state) => state.trainers.isPending);
  const responseToast = useSelector((state) => state.responseToast.data);

  useEffect(() => {
    getTrainers(dispatch);
  }, [dispatch]);

  return (
    <section className={styles.container}>
      <h2>Trainers</h2>
      {pending && <Loader />}
      {!pending && trainers.length > 0 ? <Table data={trainers} /> : null}
      {!pending && !trainers.length && 'There are no trainers to show'}
      <Link to="/trainers/add">
        <Button text="+ Add New" classNameButton="addButton" />
      </Link>
      {responseToast?.show && (
        <ResponseModal
          message={responseToast.message}
          state={responseToast.state}
          handler={() => dispatch(responseModal({ show: false, message: '', state: '' }))}
        />
      )}
    </section>
  );
};

export default Trainers;
