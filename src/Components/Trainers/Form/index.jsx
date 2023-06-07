import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ResponseModal from '../../Shared/ResponseModal';
import ConfirmModal from '../../Shared/ConfirmModal';
import Button from '../../Shared/Button';
import styles from './form.module.css';
import { Input } from '../../Shared/Inputs';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [stateModal, setStateModal] = useState('success');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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
    const fetchData = async () => {
      try {
        if (id) {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`);
          const data = await response.json();
          setSelectedTrainer(data.data);
        }
      } catch (error) {
        setResponseMessage(`Error getting trainer: ${error.message}`);
        setShowResponseModal(true);
        setStateModal('fail');
        setTimeout(() => {
          setShowResponseModal(false);
        }, 3000);
      }
    };

    fetchData();
  }, [id]);

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

  const handleSubmit = (e) => {
    setShowConfirmModal(false);
    onSubmit(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    id ? updTrainer(selectedTrainer._id, trainer) : addTrainer(trainer);
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
        setStateModal('success');
        setTimeout(() => {
          setShowResponseModal(false);
          history.push('/trainers');
        }, 1500);
      } else {
        setResponseMessage('Failed to add trainer');
        setShowResponseModal(true);
        setStateModal('fail');
        setTimeout(() => {
          setShowResponseModal(false);
        }, 3000);
      }
    } catch (error) {
      setResponseMessage(`Error adding trainer: ${error.message}`);
      setShowResponseModal(true);
      setStateModal('fail');
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
        setStateModal('success');
        setTimeout(() => {
          setShowResponseModal(false);
          history.push('/trainers');
        }, 1500);
      } else {
        setResponseMessage('Failed to update trainer');
        setShowResponseModal(true);
        setStateModal('fail');
        setTimeout(() => {
          setShowResponseModal(false);
        }, 3000);
      }
    } catch (error) {
      setResponseMessage(`Error updating trainer: ${error.message}`);
      setShowResponseModal(true);
      setStateModal('fail');
    }
  };

  const handleConfirmModal = () => {
    if (validateInputs()) {
      setShowConfirmModal(true);
    } else {
      setResponseMessage('Please fill in all fields');
      setShowResponseModal(true);
      setStateModal('fail');
      setTimeout(() => {
        setShowResponseModal(false);
      }, 3000);
    }
  };

  const validateInputs = () => {
    for (const key in trainer) {
      if (trainer[key].trim() === '') {
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <h2 className={styles.title}>{id ? 'Edit Trainer' : 'Add Trainer'}</h2>
      <form className={styles.container}>
        <div className={styles.flex}>
          <Input
            labelText="First Name"
            name="firstName"
            type="text"
            value={trainer.firstName}
            change={onChangeInput}
          />
        </div>
        <div className={styles.flex}>
          <Input
            labelText="Last Name"
            name="lastName"
            type="text"
            value={trainer.lastName}
            change={onChangeInput}
          />
        </div>
        <div className={styles.flex}>
          <Input labelText="ID" name="dni" type="text" value={trainer.dni} change={onChangeInput} />
        </div>
        <div className={styles.flex}>
          <Input
            labelText="Phone"
            name="phone"
            type="text"
            value={trainer.phone}
            change={onChangeInput}
          />
        </div>
        <div className={styles.flex}>
          <Input
            labelText="Email"
            name="email"
            type="email"
            value={trainer.email}
            change={onChangeInput}
          />
        </div>
        <div className={styles.flex}>
          <Input
            labelText="Password"
            name="password"
            type="password"
            value={trainer.password}
            change={onChangeInput}
          />
        </div>
        <div className={styles.flex}>
          <Input
            labelText="Salary"
            name="salary"
            type="text"
            value={trainer.salary}
            change={onChangeInput}
          />
        </div>
      </form>
      <div className={styles.btnContainer}>
        <Button
          text={id ? 'Update' : 'Submit'}
          classNameButton="addButton"
          action={handleConfirmModal}
        >
          {id ? 'Update' : 'Submit'}
        </Button>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          title={id ? 'Edit Trainer' : 'Add Trainer'}
          handler={() => setShowConfirmModal(false)}
          onAction={handleSubmit}
          reason={'submit'}
        >
          {id
            ? 'Are you sure you want to edit this trainer?'
            : 'Are you sure you want to add this trainer?'}
        </ConfirmModal>
      )}
      {showResponseModal && (
        <ResponseModal
          message={responseMessage}
          state={stateModal}
          handler={() => setShowResponseModal(false)}
        />
      )}
    </>
  );
};

export default Form;
