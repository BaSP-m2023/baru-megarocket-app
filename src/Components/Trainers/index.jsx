import React, { useEffect, useState } from 'react';
import styles from './trainers.module.css';
import Table from './Table/Table';
import Button from './Button';
import Form from './Form';
import Modal from './Modal';
import ResponseModal from './ResponseModal';

const Trainers = () => {
  const [showModal, setShowModal] = useState(false);
  const [trainers, setTrainer] = useState([]);
  const [activeTrainers, setActiveTrainers] = useState([]);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const getTrainers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`);
      const { data } = await response.json();
      setTrainer(data);
      setActiveTrainers(data.filter((trainer) => trainer.isActive));
    } catch (error) {
      console.log('Error fetching trainers:', error);
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
      setTrainer([...trainers.filter((trainer) => trainer._id !== id)]);
      setActiveTrainers(activeTrainers.filter((trainer) => trainer._id !== id));
    } catch (error) {
      console.log('Error fetching trainers:', error);
    }
  };

  const addTrainer = async (trainer) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trainer)
      });
      if (response.ok) {
        setResponseMessage('Trainer added successfully');
        setShowResponseModal(true);
        setShowModal(false);
        getTrainers();
      } else {
        setResponseMessage('Failed to add trainer');
        setShowResponseModal(true);
      }
    } catch (error) {
      setResponseMessage('Error adding trainer:', error);
      setShowResponseModal(true);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Trainers</h2>
      <Table data={activeTrainers} deleteTrainer={deleteTrainer} />
      <Button show={() => setShowModal(true)} />
      {showModal && (
        <Modal title="Add trainer" onClose={() => setShowModal(false)}>
          <Form add={addTrainer} />
        </Modal>
      )}
      {showResponseModal && (
        <ResponseModal text={responseMessage} onClose={() => setShowResponseModal(false)} />
      )}
    </section>
  );
};

export default Trainers;
