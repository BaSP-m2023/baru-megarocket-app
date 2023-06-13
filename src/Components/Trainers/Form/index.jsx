import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ResponseModal from '../../Shared/ResponseModal';
import ConfirmModal from '../../Shared/ConfirmModal';
import Button from '../../Shared/Button';
import styles from './form.module.css';
import { Input } from '../../Shared/Inputs';
import { addTrainer, getTrainers, updTrainer } from '../../../Redux/Trainers/thunks';
import { responseModal } from '../../../Redux/Shared/ResponseModal/actions';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const trainers = useSelector((state) => state.trainers.data);
  const trainerToEdit = trainers.find((trainer) => trainer._id === id);

  const responseToast = useSelector((state) => state.responseToast.data);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
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
    dispatch(responseModal({ show: false, message: '', state: '' }));
  }, []);

  useEffect(() => {
    getTrainers(dispatch);
  }, [dispatch]);

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

  const handleConfirmModal = () => {
    if (validateInputs()) {
      setShowConfirmModal(true);
    } else {
      dispatch(responseModal({ show: true, message: 'Please fill in all fields', state: 'fail' }));
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

  const formFields = [
    { labelText: 'First Name', name: 'firstName', type: 'text' },
    { labelText: 'Last Name', name: 'lastName', type: 'text' },
    { labelText: 'ID', name: 'dni', type: 'text' },
    { labelText: 'Phone', name: 'phone', type: 'text' },
    { labelText: 'Email', name: 'email', type: 'email' },
    { labelText: 'Password', name: 'password', type: 'password' },
    { labelText: 'Salary', name: 'salary', type: 'text' }
  ];

  return (
    <>
      <h2 className={styles.title}>{id ? 'Edit Trainer' : 'Add Trainer'}</h2>
      <form className={styles.container}>
        {formFields.map((field) => (
          <div className={styles.flex} key={field.name}>
            <Input
              labelText={field.labelText}
              name={field.name}
              type={field.type}
              value={trainer[field.name]}
              change={onChangeInput}
            />
          </div>
        ))}
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
      {responseToast?.show && (
        <ResponseModal
          message={responseToast.message}
          state={responseToast.state}
          handler={() => dispatch(responseModal({ show: false, message: '', state: '' }))}
        />
      )}
    </>
  );
};

export default Form;
