import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import { Input } from '../../Shared/Inputs';
import ResponseModal from '../../Shared/ResponseModal';
import ConfirmModal from '../../Shared/ConfirmModal';
import { addClass } from '../../../Redux/Classes/thunks';
import { responseModal } from '../../../Redux/Classes/actions';

function ClassForm() {
  const [trainers, setTrainers] = useState([]);
  const [activities, setActivities] = useState([]);
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
  const { id } = useParams();
  const isCreateRoute = location.pathname.includes('/classes/add');
  const classError = useSelector((state) => state.classes.error);
  const response = useSelector((state) => state.classes.response);

  /* const applyResponse = (msg, state) => {
    setShowModal({ show: true, msg: msg, state: state });
    setTimeout(() => {
      setShowModal({ show: false, msg: '', state: '' });
    }, 2000);
    if (state === 'success') {
      const objHistory = {
        ...location,
        pathname: '/classes',
        state: { show: true, msg: msg, state: state }
      };
      history.replace(objHistory);
    }
  }; */

  const getTrainersActivities = async () => {
    try {
      const resTrainers = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`);
      const dataTrainers = await resTrainers.json();
      const resActivities = await fetch(`${process.env.REACT_APP_API_URL}/api/activity`);
      const dataActivities = await resActivities.json();
      setTrainers(dataTrainers.data);
      setActivities(dataActivities);
    } catch (error) {
      dispatch(responseModal({ show: true, msg: error, state: 'fail' }));
    }
  };

  const getById = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`);
      const data = await response.json();
      let selectedActivity = '';
      let selectedTrainer = '';
      if (data.data.activity) {
        selectedActivity = data.data.activity._id;
      }
      if (data.data.trainer[0]) {
        selectedTrainer = data.data.trainer[0]._id;
      }
      setClasses({
        activity: selectedActivity,
        trainer: selectedTrainer,
        day: data.data.day,
        time: data.data.time,
        capacity: data.data.capacity
      });
    } catch (error) {
      dispatch(responseModal({ show: true, msg: error, state: 'fail' }));
    }
  };

  useEffect(() => {
    getTrainersActivities();
    !isCreateRoute && getById(id);
  }, []);

  const createClass = async (newClass) => {
    addClass(dispatch, newClass);
  };

  useEffect(() => {
    if (classError) {
      dispatch(responseModal({ show: true, msg: classError, state: 'fail' }));
      setTimeout(() => {
        dispatch(responseModal({ show: false, msg: '', state: '' }));
      }, 3000);
    }
  }, [classError]);

  const updateClass = async () => {
    try {
      const editedClass = {
        ...classes,
        trainer: [classes.trainer]
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedClass)
      });
      const data = await response.json();
      if (!response.ok) {
        // return applyResponse(data.message, 'fail');
      }
      //  applyResponse(data.msg, 'success');
      return data;
    } catch (error) {
      //  applyResponse('Something went wrong :(', 'fail');
    }
  };

  const onClickEditClass = () => {
    if (
      Object.values(classes).every((prop) => {
        if (prop === '') {
          return false;
        }
        return true;
      })
    ) {
      updateClass();
      setError(false);
    } else {
      setError(true);
    }
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
      onClickEditClass();
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

  const closeModal = () => {
    dispatch(responseModal({ show: false, msg: '', state: '' }));
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
          {error && classes.activity === '' ? (
            <span className={styles.error}>Field is required</span>
          ) : null}
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
          {classError && classes.trainer === '' ? (
            <span className={styles.error}>Field is required</span>
          ) : null}
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
          {error && classes.day === '' ? (
            <span className={styles.error}>Field is required</span>
          ) : null}
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
          {(error && classes.time === '') || (error && classes.time === 0) ? (
            <span className={styles.error}>Field is required</span>
          ) : null}
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
          {error && classes.capacity === '' ? (
            <span className={styles.error}>Field is required</span>
          ) : null}
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
      {response.show && <ResponseModal handler={closeModal} message={classError} state="fail" />}
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
