import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { addActivity, editActivity } from '../../../Redux/Activities/thunks';
import { handleDisplayToast } from '../../../Redux/Shared/ResponseToast/actions';

import styles from './form.module.css';
import Button from '../../Shared/Button';
import { Input, Textarea } from '../../Shared/Inputs';
import ConfirmModal from '../../Shared/ConfirmModal';
import ResponseModal from '../../Shared/ResponseModal';
import activitySchema from 'Validations/activity';

const Form = () => {
  const { list, success } = useSelector((state) => state.activities);
  const { show, message, state } = useSelector((state) => state.toast);

  const [confirm, setConfirmModal] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const activity = list.find((activity) => activity._id === id) || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(activitySchema),
    defaultValues: {
      name: activity ? activity.name : '',
      description: activity ? activity.description : '',
      isActive: activity ? activity.isActive : false
    }
  });
  const handleConfirm = () => {
    setConfirmModal(!confirm);
  };

  useEffect(() => {
    if (success) {
      history.push('/activities');
      reset();
    }
  }, [success]);

  const onSubmit = () => {
    handleConfirm();
  };

  const onConfirm = async (data) => {
    console.log(data);
    if (location.pathname.includes('add')) {
      await addActivity(dispatch, data);
    } else {
      await editActivity(dispatch, id, data);
    }
  };

  return (
    <section className={styles.formContainer}>
      <div className={styles.formTitle}>
        <h2 className={styles.title}>
          {location.pathname.includes('add') ? 'Add new activity' : `Edit activity `}
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <Input
            labelText="Name"
            type="text"
            name="name"
            placeholder={'Name'}
            register={register}
            error={errors.name?.message}
          />
        </div>
        <div className={styles.formGroup}>
          <Textarea
            labelText="Description"
            name="description"
            register={register}
            placeholder={'Description for the activity'}
            error={errors.description?.message}
          />
        </div>
        <div className={`${styles.formGroup} ${styles.formGroupCheckbox}`}>
          <Input labelText="Is active?" type="checkbox" name="isActive" register={register} />
        </div>
        <div className={styles.formButtons}>
          <Button text={'Submit'} classNameButton={'submitButton'} />
          <Link to="/activities">
            <Button text={'Back'} classNameButton={'cancelButton'} />
          </Link>
        </div>
      </form>
      {confirm && (
        <ConfirmModal
          handler={handleConfirm}
          title={location.pathname.includes('add') ? 'Add new activity' : 'Edit activity'}
          reason={'submit'}
          onAction={handleSubmit(onConfirm)}
        >
          {location.pathname.includes('add')
            ? 'Are you sure you want to add this activity?'
            : 'Are you sure you want to edit the activity?'}
        </ConfirmModal>
      )}
      {show && (
        <ResponseModal
          handler={() => dispatch(handleDisplayToast(false))}
          state={state}
          message={message}
        />
      )}
    </section>
  );
};

export default Form;
