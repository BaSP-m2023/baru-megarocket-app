import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './form.module.css';

import { addActivity, editActivity } from '../../../Redux/Activities/thunks';
import { handleDisplayToast } from '../../../Redux/Shared/ResponseToast/actions';

import Button from '../../Shared/Button';
import { Input, Textarea } from '../../Shared/Inputs';
import ConfirmModal from '../../Shared/ConfirmModal';
import ResponseModal from '../../Shared/ResponseModal';

const Form = () => {
  const { list, success } = useSelector((state) => state.activities);
  const { show, message, state } = useSelector((state) => state.toast);

  const [activity, setActivity] = useState({ name: '', description: '', isActive: false });

  const [confirm, setConfirmModal] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleConfirm = () => {
    setConfirmModal(!confirm);
  };

  useEffect(() => {
    if (location.pathname.includes('edit')) {
      const activityToUpdate = list.find((activity) => activity._id === id);
      setActivity(activityToUpdate);
    }
  }, []);

  useEffect(() => {
    if (success) {
      history.push('/activities');
    }
  }, [success]);

  const handleChanges = (e) => {
    const target = e.target.name;
    const value = target === 'isActive' ? e.currentTarget.checked : e.target.value;
    setActivity({ ...activity, [target]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleConfirm();
  };

  const onConfirm = async () => {
    handleConfirm();
    if (location.pathname.includes('add')) {
      await addActivity(dispatch, activity);
    } else {
      await editActivity(dispatch, id, activity);
    }
  };

  return (
    <section className={styles.formContainer}>
      <div className={styles.formTitle}>
        <h2 className={styles.title}>
          {location.pathname.includes('add') ? 'Add new activity' : `Edit activity `}
        </h2>
      </div>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <Input
            labelText="Name"
            type="text"
            value={activity.name || ''}
            name="name"
            change={handleChanges}
            placeholder={'Name'}
          />
        </div>
        <div className={styles.formGroup}>
          <Textarea
            labelText="Description"
            value={activity.description || ''}
            name="description"
            change={handleChanges}
            placeholder={'Description for the activity'}
          />
        </div>
        <div className={`${styles.formGroup} ${styles.formGroupCheckbox}`}>
          <Input
            labelText="Is active?"
            type="checkbox"
            value={activity.isActive || false}
            name="isActive"
            change={handleChanges}
          />
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
          onAction={() => onConfirm()}
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
