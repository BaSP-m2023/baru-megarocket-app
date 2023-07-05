import React, { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import styles from 'Components/Shared/ConfirmModal/modalConfirm.module.css';
import stylesForm from 'Components/Shared/Schedule/ScheduleComponents/modalForm.module.css';
import { Input } from 'Components/Shared/Inputs';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import Button from 'Components/Shared/Button';
import classSchema from 'Validations/class';
import { useDispatch } from 'react-redux';
import { putClass } from 'Redux/Classes/thunks';
import { refreshData } from 'Redux/Classes/actions';

const ModalForm = ({ handler, reason, activities, classData, classes }) => {
  const [trainers, setTrainers] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dispatch = useDispatch();
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

  useEffect(() => {
    const activity = activities.find((activity) => activity._id === activityValue);
    setTrainers(activity?.trainers);
  }, [activities, activityValue]);

  const handleConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const handleSubmitForm = (data) => {
    console.log(data);
    setShowConfirmModal(false);
    const fullData = { ...data, time: classData.time, day: classData.day };
    onSubmit(fullData);
  };

  const handleReset = (e) => {
    e.preventDefault();
    reset();
  };

  const onSubmit = (data) => {
    handler();
    if (reason === 'edit') {
      putClass(dispatch, data, classData._id).then((data) => {
        const updated = classes.find((classId) => classId._id === data._id);
        const index = classes.indexOf(updated);
        classes[index] = data;
        dispatch(refreshData(classes));
      });
    }
  };

  return (
    <div className={styles.modal}>
      <div
        className={`${styles.modalContent} ${stylesForm.modalContent}`}
        data-testid="confirm-modal-container"
      >
        <form className={stylesForm.form}>
          <h2 className={stylesForm.title}>
            {reason === 'edit' ? 'Update class' : 'Create class'}
          </h2>
          <div className={stylesForm.inputContainer}>
            <label className={stylesForm.label}>Activity</label>
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
              <span className={stylesForm.error}>{errors.activity.message}</span>
            )}
          </div>
          <div className={stylesForm.inputContainer}>
            <label className={stylesForm.label}>Trainer</label>
            <select name="trainer" {...register('trainer')}>
              {console.log(trainers)}
              {console.log(activityValue)}
              {!trainers && !activityValue && <option>Select an activity</option>}
              {trainers?.map((trainer) => (
                <option value={trainer._id} key={trainer._id}>
                  {trainer.firstName} {trainer.lastName}
                </option>
              ))}
            </select>
            {errors.trainer?.message && (
              <span className={stylesForm.error}>{errors.trainer.message}</span>
            )}
          </div>
          <div className={stylesForm.inputContainer}>
            <Input
              labelText="Capacity"
              type="number"
              name="capacity"
              placeholder="Capacity"
              register={register}
              error={errors.capacity?.message}
            />
          </div>
          <div
            className={`${styles.modalButtons} ${stylesForm.modalButtons}`}
            data-testid="confirm-modal-buttons"
          >
            <Button action={handler} text={'Cancel'} classNameButton={'cancelButton'} />
            <Button
              classNameButton="submitButton"
              action={handleSubmit(handleConfirmModal)}
              text={reason === 'edit' ? 'Update' : 'Create'}
            />
          </div>
          <div className={stylesForm.reset}>
            <Button classNameButton="deleteButton" text="Reset" action={handleReset} />
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
