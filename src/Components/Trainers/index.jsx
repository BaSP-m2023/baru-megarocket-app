import React, { useEffect, useState } from 'react';
import styles from './trainers.module.css';
import Table from './Table';
import Button from './Button';
import Form from './Form';
import Modal from './Modals/Modal';
import ResponseModal from './Modals/ResponseModal';

const Trainers = () => {
  const [showModal, setShowModal] = useState(false);
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

  /*   const getTrainer = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`);
      if (response.ok) {
        const { data } = await response.json();
        return data;
      } else {
        setResponseMessage('Error getting trainer');
        setShowResponseModal(true);
      }
    } catch (error) {
      setResponseMessage(`Error fetching trainer: ${error.message}`);
      setShowResponseModal(true);
    }
  }; */

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
      setResponseMessage(`Error adding trainer: ${error.message}`);
      setShowResponseModal(true);
    }
  };

  const updTrainer = async (id, updatedTrainer) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTrainer)
      });
      if (response.ok) {
        setResponseMessage('Trainer updated successfully');
        setShowResponseModal(true);
        setShowModal(false);
        getTrainers();
      } else {
        setResponseMessage('Failed to update trainer');
        setShowResponseModal(true);
      }
    } catch (error) {
      setResponseMessage(`Error updating trainer: ${error.message}`);
      setShowResponseModal(true);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Trainers</h2>
      {activeTrainers.length > 0 ? (
        <Table
          data={activeTrainers}
          deleteTrainer={deleteTrainer}
          /* getTrainer={getTrainer} */
          updTrainer={updTrainer}
        />
      ) : (
        'There is no trainers to show'
      )}
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
