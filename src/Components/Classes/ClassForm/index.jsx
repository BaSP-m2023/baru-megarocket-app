import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import { Input } from '../../Shared/Inputs';
import ResponseModal from '../../Shared/ResponseModal';
import ConfirmModal from '../../Shared/ConfirmModal';
import { addClass } from '../../../Redux/Classes/thunks';
import { getActivities } from '../../../Redux/Activities/thunks';
import { getTrainers } from '../../../Redux/Trainers/thunks';
import { handleDisplayToast } from '../../../Redux/Shared/ResponseToast/actions';

function ClassForm() {
  const [error, setError] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [classes, setClasses] = useState({
    activity: '',
    trainer: '',
    day: '',
    time: '',
    capacity: ''
  });
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const isCreateRoute = location.pathname.includes('/classes/add');
  const success = useSelector((state) => state.classes.success);
  const { show, message, state } = useSelector((state) => state.toast);
  const trainers = useSelector((state) => state.trainers.data);
  const activities = useSelector((state) => state.activities.list);

  useEffect(() => {
    getActivities(dispatch);
    getTrainers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      history.push('/classes');
    }
  }, [success]);

  const createClass = async (newClass) => {
    addClass(dispatch, newClass);
  };

  const onClickCreateClass = () => {
    if (
      Object.values(classes).every((prop) => {
        if (prop === '') {
          return false;
        }
        return true;
      })
    ) {
      createClass(classes);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleConfirmModal = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleSubmit = (e) => {
    setShowConfirmModal(false);
    onSubmit(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isCreateRoute) {
      onClickCreateClass();
    } else {
      //onClickEditClass();
    }
  };

  const cancelForm = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const onChangeInput = (e) => {
    setClasses({
      ...classes,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className={styles.formContainer}>
      <div className={styles.formTitle}>
        <h2 className={styles.title}>{isCreateRoute ? 'Create Class' : 'Edit Class'}</h2>
      </div>
      <form className={styles.form}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Activity</label>
          <select
            value={classes.activity}
            name="activity"
            className={styles.select}
            onChange={onChangeInput}
          >
            <option value="">Select an activity</option>
            {activities.map((activity) => (
              <option key={activity._id} value={activity._id}>
                {activity.name}
              </option>
            ))}
          </select>
          {error && classes.activity === '' && (
            <span className={styles.error}>Field is required</span>
          )}
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Trainer</label>
          <select
            className={styles.select}
            value={classes.trainer}
            name="trainer"
            onChange={onChangeInput}
          >
            <option value="">Select a trainer</option>
            {trainers.map((trainer) => (
              <option key={trainer._id} value={trainer._id}>
                {trainer.firstName}
              </option>
            ))}
          </select>
          {error && classes.trainer === '' && (
            <span className={styles.error}>Field is required</span>
          )}
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Day</label>
          <select className={styles.select} value={classes.day} name="day" onChange={onChangeInput}>
            <option value="">Select a day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          {error && classes.day === '' && <span className={styles.error}>Field is required</span>}
        </div>
        <div className={styles.inputContainer}>
          <Input
            labelText="Time"
            type="time"
            value={classes.time}
            placeholder="Time"
            name="time"
            change={onChangeInput}
          />
          {((error && classes.time === '') || (error && classes.time === 0)) && (
            <span className={styles.error}>Field is required</span>
          )}
        </div>
        <div className={styles.inputContainer}>
          <Input
            labelText="Capacity"
            type="number"
            value={classes.capacity}
            name="capacity"
            placeholder="Capacity"
            change={onChangeInput}
          />
          {error && classes.capacity === '' && (
            <span className={styles.error}>Field is required</span>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <Button
            classNameButton="submitButton"
            text={isCreateRoute ? 'Create' : 'Update'}
            action={handleConfirmModal}
          />
          <Button classNameButton="cancelButton" text="Cancel" action={cancelForm} />
        </div>
      </form>

      {show && (
        <ResponseModal
          handler={() => dispatch(handleDisplayToast(false))}
          state={state}
          message={message}
        />
      )}

      {showConfirmModal && (
        <ConfirmModal
          title={isCreateRoute ? 'Create class' : 'Update class'}
          handler={() => setShowConfirmModal(false)}
          onAction={handleSubmit}
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
