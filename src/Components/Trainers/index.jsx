import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './trainers.module.css';
import Table from './Table';
import Button from '../Shared/Button';
import ResponseModal from '../Shared/ResponseModal';

const Trainers = () => {
  const [activeTrainers, setActiveTrainers] = useState([]);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [stateModal, setStateModal] = useState('success');
  const [responseMessage, setResponseMessage] = useState('');

  const getTrainers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`);
      const { data } = await response.json();
      setActiveTrainers(data.filter((trainer) => trainer.isActive));
    } catch (error) {
      setResponseMessage(`Error fetching trainers: ${error.message}`);
      setShowResponseModal(true);
      setStateModal('fail');
      setTimeout(() => {
        setShowResponseModal(false);
      }, 3000);
    }
  };
  useEffect(() => {
    getTrainers();
  }, []);

  const deleteTrainer = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        setActiveTrainers(activeTrainers.filter((trainer) => trainer._id !== id));
        setResponseMessage(data.message);
        setShowResponseModal(true);
        setStateModal('success');
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
      {activeTrainers.length > 0 ? (
        <Table data={activeTrainers} deleteTrainer={deleteTrainer} />
      ) : (
        'There is no trainers to show'
      )}
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
