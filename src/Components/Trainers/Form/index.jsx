import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ResponseModal from '../../Shared/ResponseModal';
import ConfirmModal from '../../Shared/ConfirmModal';
import Button from '../../Shared/Button';
import styles from './form.module.css';
import { Input } from '../../Shared/Inputs';
import { addTrainer, updTrainer } from '../../../Redux/Trainers/thunks';
import { hideResponseModal } from '../../../Redux/Trainers/actions';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const trainers = useSelector((state) => state.trainers.data);
  const trainerToEdit = trainers.find((trainer) => trainer._id === id);
  const responseModal = useSelector((state) => state.trainers.responseModal);

  const [showResponseModal, setShowResponseModal] = useState(false);
  const [stateModal, setStateModal] = useState('success');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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
    if (trainerToEdit) {
      setTrainer({
        firstName: trainerToEdit.firstName || '',
        lastName: trainerToEdit.lastName || '',
        dni: trainerToEdit.dni || '',
        phone: trainerToEdit.phone || '',
        email: trainerToEdit.email || '',
        password: trainerToEdit.password || '',
        salary: trainerToEdit.salary || ''
      });
    }
  }, [trainerToEdit]);

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
    id
      ? dispatch(updTrainer(trainerToEdit._id, trainer, history))
      : dispatch(addTrainer(trainer, history));
  };

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
