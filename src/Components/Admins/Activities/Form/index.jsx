import { joiResolver } from '@hookform/resolvers/joi';
import { useForm, useController } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './form.module.css';

import { addActivity, editActivity } from 'Redux/Activities/thunks';
import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';
import { getTrainers } from 'Redux/Trainers/thunks';
import activitySchema from 'Validations/activity';

import Button from 'Components/Shared/Button';
import { Input, Textarea } from 'Components/Shared/Inputs';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ResponseModal from 'Components/Shared/ResponseModal';
import Select from 'react-select';

const Form = () => {
  const { list, success } = useSelector((state) => state.activities);
  const { show, message, state } = useSelector((state) => state.toast);
  const { data } = useSelector((state) => state.trainers);

  const [confirm, setConfirmModal] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const activity = list.find((activity) => activity._id === id) || '';
  const options = data.map((trainer) => ({
    value: trainer._id,
    label: `${trainer.firstName} ${trainer.lastName}`
  }));

  const {
    register,
    handleSubmit,
    //getValues,
    reset,
    formState: { errors },
    control
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(activitySchema),
    defaultValues: {
      name: activity ? activity.name : '',
      description: activity ? activity.description : '',
      isActive: activity ? activity.isActive : false,
      trainers: activity ? activity.trainers : []
    }
  });

  const {
    field: { value: trainer, onChange: trainerListOnChange }
  } = useController({ name: 'trainers', control });

  const handleConfirm = () => {
    setConfirmModal(!confirm);
  };

  useEffect(() => {
    if (success) {
      history.push('/user/admin/activities');
      reset();
    }
  }, [success]);

  useEffect(() => {
    getTrainers(dispatch);
  }, []);

  const onSubmit = () => {
    handleConfirm();
  };

  const onConfirm = async (data) => {
    if (location.pathname.includes('add')) {
      await addActivity(dispatch, data);
    } else {
      await editActivity(dispatch, id, data);
    }
  };

  return (
    <section className={styles.formContainer}>
      <div className={styles.formTitle} data-testid="activities-form-title-container">
        <h2 className={styles.title}>
          {location.pathname.includes('add') ? 'Add new activity' : `Edit activity `}
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        data-testid="activities-form-container"
      >
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
            rows={10}
            cols={60}
            register={register}
            placeholder={'Description for the activity'}
            error={errors.description?.message}
          />
        </div>
        <div className={`${styles.formGroup} ${styles.formGroupCheckbox}`}>
          <Input labelText="Is active?" type="checkbox" name="isActive" register={register} />
        </div>
        <div className={`${styles.formGroup}`}>
          <label className={styles.formLabel}>Asign trainers</label>
          <Select
            defaultValue={
              activity
                ? activity.trainers.map((trainer) => ({
                    value: trainer._id,
                    label: `${trainer.firstName} ${trainer.lastName}`
                  }))
                : ''
            }
            className={styles.formSelect}
            placeholder="Select trainer/s"
            isMulti
            options={options}
            value={trainer ? options.find((t) => t.value === trainer) : trainer}
            onChange={(e) => trainerListOnChange(e.map((c) => c.value))}
          />
          {errors.trainers && <p className={styles.error}>{errors.trainers.message}</p>}
        </div>
        <div className={styles.formButtons}>
          <Button text={'Submit'} classNameButton={'submitButton'} />
          <Link to="/user/admin/activities">
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
