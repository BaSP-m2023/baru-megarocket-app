import React, { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { addClass, deleteClass, putClass } from 'Redux/Classes/thunks';
import { useDispatch } from 'react-redux';
import { refreshData } from 'Redux/Classes/actions';

import { Button, Reset } from 'Components/Shared/Button';
import { Input } from 'Components/Shared/Inputs';
import styles from 'Components/Shared/ConfirmModal/modalConfirm.module.css';
import stylesForm from 'Components/Shared/Schedule/ScheduleComponents/Modals/ModalForm/modalForm.module.css';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import classSchema from 'Validations/class';

const ModalForm = ({ handler, reason, activities, classData, createData, classes }) => {
  const [trainers, setTrainers] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
      trainer: classData ? classData.trainer?._id : '',
      capacity: classData ? classData.capacity : ''
    }
  });
  const activityValue = watch('activity');

  useEffect(() => {
    if (classData) {
      setValue('activity', classData.activity._id);
      setValue('trainer', classData.trainer?._id);
      setValue('capacity', classData.capacity);
    }
  }, []);

  useEffect(() => {
    if (reason === 'create') {
      const activity = activities.find((activity) => activity._id === activityValue);
      setValue('trainer', activity?.trainers[0]?._id);
    }
    const activity = activities.find((activity) => activity._id === activityValue);
    setTrainers(activity?.trainers);
  }, [activities, activityValue]);

  const handleConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const handleSubmitForm = (data) => {
    setShowConfirmModal(false);
    if (reason === 'edit') {
      const editClass = { ...data, time: classData.time, day: classData.day };
      onSubmit(editClass);
    } else {
      const createClass = { ...data, time: createData.time, day: createData.day };
      onSubmit(createClass);
    }
  };

  const handleReset = () => {
    reset();
  };

  const onSubmit = (data) => {
    handler();
    if (reason === 'edit') {
      dispatch(putClass(data, classData._id)).then((data) => {
        const updated = classes.find((classId) => classId._id === data._id);
        const index = classes.indexOf(updated);
        classes[index] = data;
        dispatch(refreshData(classes));
      });
    } else {
      dispatch(addClass(data));
    }
  };

  const handleDelete = () => {
    handler();
    dispatch(deleteClass(classData._id));
    const updated = classes.filter((filteredClasses) => filteredClasses._id !== classData._id);
    dispatch(refreshData(updated));
    setShowDeleteModal(false);
  };

  return (
    <div className={styles.modal}>
      <div
        className={`${styles.modalContent} ${stylesForm.modalContent}`}
        data-testid="confirm-modal-container"
      >
        <form className={stylesForm.form}>
          <div className={stylesForm.headerModal}>
            {reason === 'edit' && (
              <FontAwesomeIcon
                icon={faTrash}
                className={stylesForm.trash}
                onClick={() => setShowDeleteModal(true)}
              />
            )}
            <h2 className={stylesForm.title}>
              {reason === 'edit' ? 'Update class' : 'Create class'}
            </h2>
          </div>
          <div className={stylesForm.inputContainer}>
            <label className={stylesForm.label}>Activity</label>
            <select name="activity" {...register('activity')}>
              <option value={classData ? classData.activity._id : ''}>
                {classData ? classData.activity.name : 'Select an activity'}
              </option>
              {activities?.map(
                (act) =>
                  classData?.activity._id !== act._id && (
                    <option value={act._id} key={act._id}>
                      {act.name}
                    </option>
                  )
              )}
            </select>
            {errors.activity?.message && (
              <span className={stylesForm.error}>{errors.activity.message}</span>
            )}
          </div>
          <div className={stylesForm.inputContainer}>
            <label className={stylesForm.label}>Trainer</label>
            <select disabled={!activityValue} name="trainer" {...register('trainer')}>
              {!activityValue && <option>Select an activity first</option>}
              {trainers?.map((trainer) => (
                <option
                  selected={classData?.trainer._id === trainer._id}
                  value={trainer._id}
                  key={trainer._id}
                >
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
          {classData && (
            <div className={stylesForm.inputContainer}>
              <label>Memebrs Subscribed: {classData.subscribed}</label>
            </div>
          )}
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
          <Reset action={handleReset} />
        </form>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          title={reason === 'edit' ? 'Edit Class' : 'Create Class'}
          handler={() => setShowConfirmModal(false)}
          onAction={handleSubmit(handleSubmitForm)}
          reason={'submit'}
        >
          {reason === 'edit'
            ? 'Are you sure you want to edit this class?'
            : 'Are you sure you want to create a class?'}
        </ConfirmModal>
      )}
      {showDeleteModal && (
        <ConfirmModal
          title={'Delete Class'}
          handler={() => setShowDeleteModal(false)}
          onAction={handleSubmit(handleDelete)}
          reason={'delete'}
        />
      )}
    </div>
  );
};

export default ModalForm;
