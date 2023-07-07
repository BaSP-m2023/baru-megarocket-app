import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './trainers.module.css';

import { getTrainers } from 'Redux/Trainers/thunks';
import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';

import Table from './Table';
import Loader from 'Components/Shared/Loader';
import Button from 'Components/Shared/Button';
import ResponseModal from 'Components/Shared/ResponseModal';

const Trainers = () => {
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainers.data);
  const pending = useSelector((state) => state.trainers.isPending);
  const { show, message, state } = useSelector((state) => state.toast);

  useEffect(() => {
    dispatch(getTrainers());
  }, []);

  if (pending) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Trainers</h1>
      {!pending && trainers.length > 0 ? <Table data={trainers} /> : null}
      {!pending && !trainers.length && 'There are no trainers to show'}
      <div className={styles.button}>
        <Link to="trainers/add" data-testid="trainer-add-link">
          <Button text="+ Add New" classNameButton="addButton" />
        </Link>
      </div>
      {show && (
        <ResponseModal
          message={message}
          state={state}
          handler={() => dispatch(handleDisplayToast(false))}
        />
      )}
    </section>
  );
};

export default Trainers;
