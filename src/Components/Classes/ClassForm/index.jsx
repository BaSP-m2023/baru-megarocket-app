import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import { Input } from '../../Shared/Inputs';
import ResponseModal from '../../Shared/ResponseModal';
import ConfirmModal from '../../Shared/ConfirmModal';
import { responseModal } from '../../../Redux/Classes/actions';
import { getActivities } from '../../../Redux/Activities/thunks';
import { getTrainers } from '../../../Redux/Trainers/thunks';
import { putClass } from '../../../Redux/Classes/thunks';

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
  const { id } = useParams();
  const isCreateRoute = location.pathname.includes('/classes/add');
  const dispatch = useDispatch();
  const response = useSelector((state) => state.classes.response);
  const storeClass = useSelector((state) => state.classes);
  const trainers = useSelector((state) => state.trainers.data);
  const activities = useSelector((state) => state.activities.list);

  useEffect(() => {
    getActivities(dispatch);
    getTrainers(dispatch);
    !isCreateRoute && getById(id);
  }, [dispatch]);

  useEffect(() => {
    if (storeClass.error) {
      dispatch(responseModal({ show: true, msg: storeClass.error, state: 'fail' }));
    } else if (storeClass.putClass) {
      history.push('/classes');
    }
  }, [storeClass.putClass]);
  const applyResponse = (data) => {
    dispatch(responseModal({ show: true, msg: data.msg, state: data.state }));
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
      if (data.data.trainer) {
        selectedTrainer = data.data.trainer._id;
      }
      setClasses({
        activity: selectedActivity,
        trainer: selectedTrainer,
        day: data.data.day,
        time: data.data.time,
        capacity: data.data.capacity
      });
    } catch (error) {
      applyResponse({ msg: 'Something went wrong :(', state: 'fail' });
    }
  };

  const createClass = async (newClass) => {
    const createdClass = {
      ...newClass,
      trainer: [newClass.trainer]
    };
    const bodyClasses = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createdClass)
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/`, bodyClasses);
      const data = await response.json();
      if (data.length !== 0 && !data.error) {
        applyResponse('Class sucessfully created', 'success');
      } else {
        applyResponse(data.message, 'fail');
      }
    } catch (error) {
      applyResponse('Something went wrong :(', 'fail');
    }
  };

  const updateClass = () => {
    putClass(dispatch, classes, id)
      .then((result) => {
        const msg = result.error ? result.message : result.msg;
        const state = result.error ? 'fail' : 'success';
        applyResponse({ msg, state });
        if (!result.error) {
          history.push('/classes');
        }
      })
      .catch((error) => {
        applyResponse({ msg: error.message, state: 'fail' });
      });
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
          {error && classes.trainer === '' ? (
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
      {response.show && (
        <ResponseModal
          handler={() => dispatch(responseModal({ show: false, msg: '', state: '' }))}
          message={response.msg}
          state={response.state}
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
