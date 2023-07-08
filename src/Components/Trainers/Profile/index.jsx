import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './profile.module.css';

import { getTrainers, updTrainer } from 'Redux/Trainers/thunks';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';

import { Input } from 'Components/Shared/Inputs';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ResponseModal from 'Components/Shared/ResponseModal';
import Button from 'Components/Shared/Button';
import trainerSchema from 'Validations/trainerUpdate';

function TrainerProfile({ match }) {
  const [disableEdit, setDisableEdit] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const history = useHistory();
  const trainerId = match.params.id;
  const dispatch = useDispatch();
  const { show, message, state } = useSelector((state) => state.toast);
  const trainerLogged = useSelector((state) => state.auth.user);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(trainerSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      dni: '',
      phone: '',
      salary: '',
      isActive: trainerLogged?.isActive
    }
  });

  useEffect(() => {
    dispatch(getTrainers());
  }, []);

  useEffect(() => {
    if (trainerLogged) {
      // eslint-disable-next-line no-unused-vars
      const { _id, firebaseUid, email, __v, dob, ...resMemberLogged } = trainerLogged;
      Object.entries(resMemberLogged).every(([key, value]) => {
        setValue(key, value);
        return true;
      });
    }
  }, [trainerLogged, handleSubmit]);

  const onSubmit = (data) => {
    if (trainerId) {
      setShowConfirmModal(false);
      dispatch(updTrainer(trainerId, data, history))
        .then(() => {
          resetData();
        })
        .catch((error) => {
          dispatch(setContentToast({ message: error.message, state: 'fail' }));
          dispatch(handleDisplayToast(true));
        });
    }
  };
  const resetData = () => {
    reset();
    if (trainerLogged) {
      // eslint-disable-next-line no-unused-vars
      const { _id, firebaseUid, email, __v, ...resTrainerLogged } = trainerLogged;
      Object.entries(resTrainerLogged).every(([key, value]) => {
        setValue(key, value);
        return true;
      });
    }
  };
  const handleReset = (e) => {
    e.preventDefault();

    if (trainerLogged) {
      // eslint-disable-next-line no-unused-vars
      const { _id, firebaseUid, email, __v, ...resTrainerLogged } = trainerLogged;
      Object.entries(resTrainerLogged).every(([key, value]) => {
        setValue(key, value);
        return true;
      });
    }
  };

  const onConfirm = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  const formFields = [
    { labelText: 'First Name', type: 'text', name: 'firstName' },
    { labelText: 'Last Name', type: 'text', name: 'lastName' },
    { labelText: 'DNI', type: 'number', name: 'dni' },
    { labelText: 'Phone', type: 'text', name: 'phone' },
    { labelText: 'Salary', type: 'text', name: 'salary' }
  ];
  return (
    <div className={styles.form}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>
            {disableEdit
              ? `${trainerLogged?.firstName} ${trainerLogged?.lastName} Profile`
              : 'Edit Profile'}
          </h2>
          {disableEdit && (
            <Button
              classNameButton="addButton"
              action={() => setDisableEdit(false)}
              img={`${process.env.PUBLIC_URL}/assets/images/edit-icon-white.png`}
            />
          )}
          {!disableEdit && (
            <button className={styles.close_button} onClick={() => setDisableEdit(true)}>
              &times;
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit(onConfirm)} className={styles.body}>
          <div>
            {formFields.map((inputData, index) => (
              <div className={styles.label_container} key={index}>
                <Input
                  labelText={inputData.labelText}
                  type={inputData.type}
                  name={inputData.name}
                  disabled={disableEdit}
                  register={register}
                  error={errors[inputData.name]?.message}
                />
              </div>
            ))}
          </div>
          {!disableEdit && (
            <div className={styles.buttons}>
              <Button classNameButton="addButton" text={'Confirm'} disabled={disableEdit} />
              <Button
                classNameButton="cancelButton"
                action={() => setDisableEdit(true)}
                text="Cancel"
              />
              <Button
                classNameButton="deleteButton"
                action={handleReset}
                text={'Reset'}
                disabled={disableEdit}
              />
            </div>
          )}
        </form>
        {disableEdit && (
          <div className={styles.buttons}>
            <Button classNameButton="addButton" action={() => setDisableEdit(false)} text="Edit" />
          </div>
        )}
      </div>
      {showConfirmModal && (
        <ConfirmModal
          title={'Edit my Profile'}
          handler={() => setShowConfirmModal(false)}
          onAction={handleSubmit(onSubmit)}
          reason={'submit'}
        >
          {`Are you sure you wanna edit?`}
        </ConfirmModal>
      )}
      {show && (
        <ResponseModal
          handler={() => dispatch(handleDisplayToast(false))}
          state={state}
          message={message}
        />
      )}
    </div>
  );
}

export default TrainerProfile;
