import React, { useState, useEffect } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, useController } from 'react-hook-form';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './form.module.css';

import { getActivities } from 'Redux/Activities/thunks';
import { getTrainers } from 'Redux/Trainers/thunks';
import { putClass, addClass } from 'Redux/Classes/thunks';
import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';
import classSchema from 'Validations/class';

import { Input } from 'Components/Shared/Inputs';
import Select from 'react-select';
import Button from 'Components/Shared/Button';
import ResponseModal from 'Components/Shared/ResponseModal';
import ConfirmModal from 'Components/Shared/ConfirmModal';

function ClassForm() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const isCreateRoute = location.pathname.includes('/classes/add');
  const dataClasses = useSelector((state) => state.classes.data);
  const { show, message, state } = useSelector((state) => state.toast);
  const activities = useSelector((state) => state.activities.list);
  const dataID = dataClasses.find((classID) => classID._id === id) || '';
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(classSchema),
    defaultValues: {
      activity: dataID ? dataID.activity._id : '',
      trainer: dataID ? dataID.trainer._id : '',
      day: dataID ? dataID.day : '',
      time: dataID ? dataID.time : '',
      capacity: dataID ? dataID.capacity : ''
    }
  });

  useEffect(() => {
    if (!isCreateRoute) {
      const activity = activities.find((activity) => activity._id === getValues('activity'));
      setOptionsTrainer(
        activity?.trainers.map((trainer) => ({
          value: trainer._id,
          label: `${trainer.firstName} ${trainer.lastName}`
        }))
      );
    }
  }, []);
  const optionsActivity = activities.map((activity) => ({
    value: activity._id,
    label: `${activity.name}`
  }));
  const [optionsTrainer, setOptionsTrainer] = useState([]);
  const filterTrainers = (activityId) => {
    setValue('activity', activityId, { shouldValidate: true });
    setValue('trainer', '');
    const activity = activities.find((activity) => activity._id === activityId);
    setOptionsTrainer(
      activity.trainers.map((trainer) => ({
        value: trainer._id,
        label: `${trainer.firstName} ${trainer.lastName}`
      }))
    );
  };
  const optionsDay = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' }
  ];
  const {
    field: { value: trainer, onChange: trainerOnChange }
  } = useController({ name: 'trainer', control });
  const {
    field: { value: activity }
  } = useController({ name: 'activity', control });

  const {
    field: { value: day, onChange: dayOnChange }
  } = useController({ name: 'day', control });
  useEffect(() => {
    dispatch(getActivities());
    getTrainers(dispatch);
  }, [dispatch]);

  const createClass = async (newClass) => {
    addClass(dispatch, newClass, history);
  };

  const updateClass = (data) => {
    putClass(dispatch, data, id, history);
  };

  const onClickCreateClass = (data) => {
    if (
      Object.values(data).every((prop) => {
        if (prop === '') {
          return false;
        }
        return true;
      })
    ) {
      createClass(data);
    }
  };

  const onClickEditClass = (data) => {
    if (
      Object.values(data).every((prop) => {
        if (prop === '') {
          return false;
        }
        return true;
      })
    ) {
      updateClass(data);
    }
  };

  const handleConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const handleSubmitForm = (data) => {
    setShowConfirmModal(false);
    onSubmit(data);
  };

  const onSubmit = (data) => {
    if (isCreateRoute) {
      onClickCreateClass(data);
    } else {
      onClickEditClass(data);
    }
  };

  const cancelForm = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <section className={styles.formContainer}>
      <div className={styles.formTitle} data-testid="classes-form-title-container">
        <h2 className={styles.title}>{isCreateRoute ? 'Create Class' : 'Edit Class'}</h2>
      </div>
      <div className={styles.form}>
        <form data-testid="classes-form-container">
          <div className={styles.inputContainer}>
            <label className={styles.label}>Activity</label>
            <Select
              className={styles.select}
              value={activity ? optionsActivity.find((t) => t.value === activity) : activity}
              defaultValue={{
                value: getValues('activity'),
                label: `${getValues('activity.name')}`
              }}
              name="activity"
              options={optionsActivity}
              placeholder="Select an Activity"
              onChange={(e) => filterTrainers(e.value)}
            />
            {errors.activity?.message && (
              <span className={styles.error}>{errors.activity.message}</span>
            )}
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Trainer</label>
            <Select
              className={styles.select}
              name="trainer"
              defaultValue={{
                value: trainer,
                label: `${getValues('trainer.firstName')} ${getValues('trainer.lastName')}`
              }}
              options={optionsTrainer}
              placeholder="Select a Trainer"
              value={trainer ? optionsTrainer.find((t) => t.value === trainer) : trainer}
              onChange={(e) => trainerOnChange(e.value)}
            />
            {errors.trainer?.message && (
              <span className={styles.error}>{errors.trainer.message}</span>
            )}
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Day</label>
            <Select
              className={styles.select}
              name="day"
              defaultValue={{
                value: getValues('day'),
                label: `${getValues('day')}`
              }}
              options={optionsDay}
              placeholder="Select trainer"
              value={day ? optionsDay.find((t) => t.value === day) : day}
              onChange={(e) => dayOnChange(e.value)}
            />
            {errors.day?.message && <span className={styles.error}>{errors.day.message}</span>}
          </div>
          <div className={styles.inputContainer}>
            <Input
              className={styles.select}
              labelText="Time"
              type="time"
              placeholder="Time"
              name="time"
              register={register}
              error={errors.time?.message}
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              labelText="Capacity"
              type="number"
              name="capacity"
              placeholder="Capacity"
              register={register}
              error={errors.capacity?.message}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button classNameButton="cancelButton" text="Cancel" action={cancelForm} />
            <Button
              classNameButton="submitButton"
              action={handleSubmit(handleConfirmModal)}
              text={isCreateRoute ? 'Create' : 'Update'}
            />
          </div>
        </form>
        <Button classNameButton="deleteButton" text="Reset" action={reset} />
      </div>
      {show && (
        <ResponseModal
          handler={() => dispatch(handleDisplayToast(false))}
          message={message}
          state={state}
        />
      )}
      {showConfirmModal && (
        <ConfirmModal
          title={isCreateRoute ? 'Create class' : 'Update class'}
          handler={() => setShowConfirmModal(false)}
          onAction={handleSubmit(handleSubmitForm)}
          reason={'submit'}
        >
          {isCreateRoute
            ? 'Are you sure you want to create this class?'
            : 'Are you sure you want to update this class?'}
        </ConfirmModal>
      )}
    </section>
  );
}

export default ClassForm;
