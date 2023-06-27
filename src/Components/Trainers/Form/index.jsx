import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ResponseModal from 'Components/Shared/ResponseModal';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import Button from 'Components/Shared/Button';
import styles from 'Components/Trainers/Form/form.module.css';
import { Input } from 'Components/Shared/Inputs';
import { addTrainer, getTrainers, updTrainer } from 'Redux/Trainers/thunks';
import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';
import trainerSchema from 'Validations/trainer';
const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const trainers = useSelector((state) => state.trainers.data);
  const trainerToEdit = trainers.find((trainer) => trainer._id === id);

  const { show, message, state } = useSelector((state) => state.toast);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(trainerSchema),
    defaultValues: {
      firstName: trainerToEdit ? trainerToEdit.firstName : '',
      lastName: trainerToEdit ? trainerToEdit.lastName : '',
      dni: trainerToEdit ? trainerToEdit.dni : '',
      phone: trainerToEdit ? trainerToEdit.phone : '',
      email: trainerToEdit ? trainerToEdit.email : '',
      password: trainerToEdit ? trainerToEdit.password : '',
      salary: trainerToEdit ? trainerToEdit.salary : ''
    }
  });
  useEffect(() => {
    dispatch(getTrainers);
  }, [dispatch]);
  const getTrainer = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer/${id}`);
      const { data } = await res.json();
      setValue('firstName', data.firstName);
      setValue('lastName', data.lastName);
      setValue('dni', data.dni);
      setValue('phone', data.phone);
      setValue('email', data.email);
      setValue('salary', data.salary);
      setValue('password', data.password);
    } catch (error) {
      dispatch(handleDisplayToast(true));
    }
  };

  useEffect(() => {
    if (id && getValues('firstName') === '') {
      getTrainer(id);
    }
  }, []);

  const handleConfirm = (data) => {
    setShowConfirmModal(false);
    onSubmit(data);
  };

  const onSubmit = (data) => {
    id
      ? dispatch(updTrainer(trainerToEdit._id, data, history))
      : dispatch(addTrainer(data, history));
  };

  const handleConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const handleReset = (e) => {
    e.preventDefault();
    reset();
    getTrainer(id);
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
      <h2 className={styles.title} data-testid="trainers-form-title">
        {id ? 'Edit Trainer' : 'Add Trainer'}
      </h2>
      <form className={styles.container} data-testid="trainers-form-container">
        {formFields.map((field) => (
          <div className={styles.flex} key={field.name}>
            <Input
              labelText={field.labelText}
              name={field.name}
              type={field.type}
              register={register}
              error={errors[field.name]?.message}
            />
          </div>
        ))}
        <Button text={'Reset'} classNameButton="deleteButton" action={handleReset} />
      </form>
      <div className={styles.btnContainer} data-testid="trainers-form-buttons">
        <Link to="/trainers">
          <Button action={() => reset()} classNameButton={'cancelButton'} text={'Cancel'} />
        </Link>
        <Button
          text={id ? 'Update' : 'Submit'}
          classNameButton="addButton"
          action={handleSubmit(handleConfirmModal)}
        >
          {id ? 'Update' : 'Submit'}
        </Button>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          title={id ? 'Edit Trainer' : 'Add Trainer'}
          handler={() => setShowConfirmModal(false)}
          onAction={handleSubmit(handleConfirm)}
          reason={'submit'}
        >
          {id
            ? 'Are you sure you want to edit this trainer?'
            : 'Are you sure you want to add this trainer?'}
        </ConfirmModal>
      )}
      {show && (
        <ResponseModal
          message={message}
          state={state}
          handler={() => dispatch(handleDisplayToast(false))}
        />
      )}
    </>
  );
};

export default Form;
