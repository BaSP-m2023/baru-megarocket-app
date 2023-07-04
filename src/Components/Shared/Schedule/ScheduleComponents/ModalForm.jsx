import React, { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import styles from 'Components/Shared/ConfirmModal/modalConfirm.module.css';
import stylesForm from 'Components/Shared/Schedule/ScheduleComponents/modalForm.module.css';
import { Input } from 'Components/Shared/Inputs';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import Button from 'Components/Shared/Button';
import classSchema from 'Validations/class';

const ModalForm = ({ handler, reason, activities, classData }) => {
  const [trainers, setTrainers] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(classSchema),
    defaultValues: {
      activity: classData ? classData.activity._id : '',
      trainer: classData ? classData.trainer._id : '',
      capacity: classData ? classData.capacity : ''
    }
  });

  const activityValue = watch('activity');

  useEffect(() => {
    if (classData) {
      setValue('activity', classData.activity._id);
      setValue('trainer', classData.trainer._id);
      setValue('capacity', classData.capacity);
    }
  }, []);

  console.log(activityValue);
  useEffect(() => {
    if (reason === 'edit') {
      const activity = activities.find((activity) => activity._id === activityValue);
      setTrainers(activity?.trainers);
    }
  }, [activities, activityValue]);

  const handleConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const handleSubmitForm = (data) => {
    setShowConfirmModal(false);
    onSubmit(data);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.modal}>
      <div
        className={`${styles.modalContent} ${stylesForm.modalContent}`}
        data-testid="confirm-modal-container"
      >
        <form className={stylesForm.form}>
          <div>
            <label>Activity</label>
            <select name="activity" {...register('activity')}>
              <option value={classData ? classData.activity._id : ''}>
                {classData ? classData.activity.name : 'Select an activity'}
              </option>
              {activities?.map((act) => (
                <option value={act._id} key={act._id}>
                  {act.name}
                </option>
              ))}
            </select>
            {errors.activity?.message && (
              <span className={styles.error}>{errors.activity.message}</span>
            )}
          </div>
          <div>
            <label>Trainer</label>
            <select name="trainer" {...register('trainer')}>
              <option value={classData ? classData.trainer._id : ''}>
                {classData && classData.activity._id === activityValue
                  ? `${classData.trainer.firstName} ${classData.trainer.lastName}`
                  : 'Select a Trainer'}
              </option>
              {trainers?.map(
                (trainer) =>
                  classData.trainer._id !== trainer._id && (
                    <option key={trainer._id} value={trainer._id}>
                      {trainer.firstName} {trainer.lastName}
                    </option>
                  )
              )}
            </select>
            {errors.trainer?.message && (
              <span className={styles.error}>{errors.trainer.message}</span>
            )}
          </div>
          <Input
            labelText="Capacity"
            type="number"
            name="capacity"
            placeholder="Capacity"
            register={register}
            error={errors.capacity?.message}
          />
          <div className={styles.modalButtons} data-testid="confirm-modal-buttons">
            <Button action={handler} text={'Cancel'} classNameButton={'cancelButton'} />
            <Button
              classNameButton="submitButton"
              action={handleSubmit(handleConfirmModal)}
              text={!reason === 'edit' ? 'Create' : 'Update'}
            />
            <Button classNameButton="deleteButton" text="Reset" action={reset} />
          </div>
        </form>
      </div>
      {showConfirmModal && classData && (
        <ConfirmModal
          title={'Class details'}
          handler={() => setShowConfirmModal(false)}
          onAction={handleSubmit(handleSubmitForm)}
          reason={'submit'}
        >
          {reason === 'edit' ? 'Edit class' : 'Create class'}
        </ConfirmModal>
      )}
    </div>
  );
};

export default ModalForm;
