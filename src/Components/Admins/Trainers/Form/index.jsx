import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './form.module.css';

import { addTrainer, getTrainers, updTrainer } from 'Redux/Trainers/thunks';
import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';
import trainerSchema from 'Validations/trainer';
import trainerUpdate from 'Validations/trainerUpdate';

import { Input } from 'Components/Shared/Inputs';
import ResponseModal from 'Components/Shared/ResponseModal';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import { Button, Reset } from 'Components/Shared/Button';

const Form = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { show, message, state } = useSelector((state) => state.toast);
  const redirect = useSelector((state) => state.trainers.redirect);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [trainerToEdit, setTrainerToEdit] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = !id
    ? useForm({
        mode: 'onChange',
        resolver: joiResolver(trainerSchema)
      })
    : useForm({
        mode: 'onChange',
        resolver: joiResolver(trainerUpdate)
      });

  useEffect(() => {
    if (id) {
      dispatch(getTrainers()).then((data) => {
        const trainer = data.find((item) => item._id === id);
        // eslint-disable-next-line no-unused-vars
        const { _id, firebaseUid, email, __v, password, ...resTrainer } = trainer;
        setTrainerToEdit({ ...resTrainer });
        Object.entries(resTrainer).every(([key, value]) => {
          setValue(key, value);
          return true;
        });
      });
    }
  }, []);

  useEffect(() => {
    if (redirect) {
      history.push('/user/admin/trainers');
    }
  }, [redirect]);

  const handleReset = () => {
    const defaultValues = !id
      ? {
          firstName: '',
          lastName: '',
          dni: '',
          phone: '',
          salary: '',
          password: '',
          email: ''
        }
      : {
          firstName: trainerToEdit ? trainerToEdit.firstName : '',
          lastName: trainerToEdit ? trainerToEdit?.lastName : '',
          dni: trainerToEdit ? trainerToEdit?.dni : '',
          phone: trainerToEdit ? trainerToEdit?.phone : '',
          salary: trainerToEdit ? trainerToEdit?.salary : ''
        };

    reset(defaultValues);
  };

  const handleConfirm = (data) => {
    setShowConfirmModal(false);
    onSubmit(data);
  };

  const onSubmit = (data) => {
    id ? dispatch(updTrainer(id, data)) : dispatch(addTrainer(data));
  };

  const handleConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const formCreate = [
    { labelText: 'First Name', name: 'firstName', type: 'text' },
    { labelText: 'Last Name', name: 'lastName', type: 'text' },
    { labelText: 'ID', name: 'dni', type: 'text' },
    { labelText: 'Phone', name: 'phone', type: 'text' },
    { labelText: 'Email', name: 'email', type: 'email' },
    { labelText: 'Password', name: 'password', type: 'password' },
    { labelText: 'Salary', name: 'salary', type: 'text' }
  ];

  const formUpdate = [
    { labelText: 'First Name', name: 'firstName', type: 'text' },
    { labelText: 'Last Name', name: 'lastName', type: 'text' },
    { labelText: 'ID', name: 'dni', type: 'text' },
    { labelText: 'Phone', name: 'phone', type: 'text' },
    { labelText: 'Salary', name: 'salary', type: 'text' }
  ];

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.formTitle}>
          <h2 data-testid="trainers-form-title">{id ? 'Edit Trainer' : 'Add Trainer'}</h2>
          <span className={styles.closeButton} onClick={() => history.goBack()}>
            &times;
          </span>
        </div>
        <div className={styles.content}>
          <form className={styles.form} data-testid="trainers-form-container">
            {id
              ? formUpdate.map((field) => (
                  <div className={styles.formGroup} key={field.name}>
                    <Input
                      labelText={field.labelText}
                      name={field.name}
                      type={field.type}
                      register={register}
                      error={errors[field.name]?.message}
                    />
                  </div>
                ))
              : formCreate.map((field) => (
                  <div className={styles.formGroup} key={field.name}>
                    <Input
                      labelText={field.labelText}
                      name={field.name}
                      type={field.type}
                      register={register}
                      error={errors[field.name]?.message}
                    />
                  </div>
                ))}
          </form>
          <div className={styles.btnContainer} data-testid="trainers-form-buttons">
            <Reset action={handleReset} />
            <Link to="/user/admin/trainers">
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
        </div>
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
