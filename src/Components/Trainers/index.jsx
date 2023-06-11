import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainers } from '../../Redux/Trainers/thunks';
import styles from './trainers.module.css';
import Table from './Table';
import Loader from '../Shared/Loader';
import Button from '../Shared/Button';
import ResponseModal from '../Shared/ResponseModal';
import { hideResponseModal } from '../../Redux/Trainers/actions';

const Trainers = () => {
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [stateModal, setStateModal] = useState('success');
  const [responseMessage, setResponseMessage] = useState('');

  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainers.data);
  const pending = useSelector((state) => state.trainers.isPending);
  const responseModal = useSelector((state) => state.trainers.responseModal);

  useEffect(() => {
    if (responseModal) {
      setShowResponseModal(true);
      setStateModal(responseModal.state);
      setResponseMessage(responseModal.message);
      setTimeout(() => {
        setShowResponseModal(false);
        dispatch(hideResponseModal());
      }, 3000);
    }
  }, [responseModal]);

  useEffect(() => {
    getTrainers(dispatch);
  }, [dispatch]);

  const deleteTrainer = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        setResponseMessage(data.message);
        setShowResponseModal(true);
        setStateModal('success');
        getTrainers(dispatch);
        setTimeout(() => {
          setShowResponseModal(false);
        }, 3000);
      } else {
        setResponseMessage('Failed to delete trainer');
        setShowResponseModal(true);
        setStateModal('fail');
        setTimeout(() => {
          setShowResponseModal(false);
        }, 3000);
      }
    } catch (error) {
      setResponseMessage(`Error deleting trainer: ${error.message}`);
      setShowResponseModal(true);
      setStateModal('fail');
      setTimeout(() => {
        setShowResponseModal(false);
      }, 3000);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Trainers</h2>
      {pending && <Loader />}
      {!pending && trainers.length > 0 ? (
        <Table data={trainers} deleteTrainer={deleteTrainer} />
      ) : null}
      {!pending && !trainers.length && 'There are no trainers to show'}
      <Link to="/trainers/add">
        <Button text="+ Add New" classNameButton="addButton" />
      </Link>
      {showResponseModal && (
        <ResponseModal
          message={responseMessage}
          state={stateModal}
          handler={() => setShowResponseModal(false)}
        />
      )}
    </section>
  );
};

export default Trainers;
