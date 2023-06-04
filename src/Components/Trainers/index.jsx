import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './trainers.module.css';
import Table from './Table';
import Button from '../Shared/Button';
import ResponseModal from './Modals/ResponseModal';

const Trainers = () => {
  const [activeTrainers, setActiveTrainers] = useState([]);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const getTrainers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`);
      const { data } = await response.json();
      setActiveTrainers(data.filter((trainer) => trainer.isActive));
    } catch (error) {
      setResponseMessage(`Error fetching trainers: ${error.message}`);
      setShowResponseModal(true);
    }
  };
  useEffect(() => {
    getTrainers();
  }, []);

  const deleteTrainer = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
        method: 'DELETE'
      });
      setActiveTrainers(activeTrainers.filter((trainer) => trainer._id !== id));
    } catch (error) {
      setResponseMessage(`Error deleting trainer: ${error.message}`);
      setShowResponseModal(true);
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
        <ResponseModal text={responseMessage} onClose={() => setShowResponseModal(false)} />
      )}
    </section>
  );
};

export default Trainers;
