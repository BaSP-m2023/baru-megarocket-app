import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResponseModal from '../Modals/ResponseModal';
import styles from './form.module.css';

const Form = () => {
  const { id } = useParams();
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [trainer, setTrainer] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    password: '',
    salary: ''
  });

  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedTrainer(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    setTrainer({
      firstName: selectedTrainer.firstName || '',
      lastName: selectedTrainer.lastName || '',
      dni: selectedTrainer.dni || '',
      phone: selectedTrainer.phone || '',
      email: selectedTrainer.email || '',
      password: selectedTrainer.password || '',
      salary: selectedTrainer.salary || ''
    });
  }, [selectedTrainer]);

  const onChangeInput = (e) => {
    setTrainer({
      ...trainer,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updTrainer(selectedTrainer._id, trainer);
    } else {
      addTrainer(trainer);
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
    <>
      <h2 className={styles.title}>{id ? 'Edit Trainer' : 'Add Trainer'}</h2>
      <form onSubmit={onSubmit} className={styles.container}>
        <div className={styles.flex}>
          <label htmlFor="firstName" className={styles.label}>
            First Name
          </label>
          <input
            name="firstName"
            type="text"
            id="firstName"
            value={trainer.firstName}
            onChange={onChangeInput}
            className={styles.input}
          />
        </div>
        <div className={styles.flex}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <input
            name="lastName"
            type="text"
            id="lastName"
            value={trainer.lastName}
            onChange={onChangeInput}
            className={styles.input}
          />
        </div>
        <div className={styles.flex}>
          <label htmlFor="dni" className={styles.label}>
            ID
          </label>
          <input
            name="dni"
            type="text"
            id="dni"
            value={trainer.dni}
            onChange={onChangeInput}
            className={styles.input}
          />
        </div>
        <div className={styles.flex}>
          <label htmlFor="phone" className={styles.label}>
            Phone Number
          </label>
          <input
            name="phone"
            type="text"
            id="phone"
            value={trainer.phone}
            onChange={onChangeInput}
            className={styles.input}
          />
        </div>
        <div className={styles.flex}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            value={trainer.email}
            onChange={onChangeInput}
            className={styles.input}
          />
        </div>
        <div className={styles.flex}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            value={trainer.password}
            onChange={onChangeInput}
            className={styles.input}
          />
        </div>
        <div className={styles.flex}>
          <label htmlFor="salary" className={styles.label}>
            Salary
          </label>
          <input
            name="salary"
            type="text"
            id="salary"
            value={trainer.salary}
            onChange={onChangeInput}
            className={styles.input}
          />
        </div>
        <div>
          <button type="submit" className={styles.save}>
            {id ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
      {showResponseModal && (
        <ResponseModal text={responseMessage} onClose={() => setShowResponseModal(false)} />
      )}
    </>
  );
};

export default Form;
