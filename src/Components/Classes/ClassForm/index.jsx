import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styles from './form.module.css';

function ClassForm() {
  const [trainers, setTrainers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(false);
  const [classes, setClasses] = useState({
    activity: '',
    trainer: '',
    day: '',
    time: '',
    capacity: ''
  });
  const location = useLocation();
  const isCreateRoute = location.pathname.includes('/classes/createclass');
  const history = useHistory();

  const getTrainersActivities = async () => {
    try {
      const resTrainers = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`);
      const dataTrainers = await resTrainers.json();
      const resActivities = await fetch(`${process.env.REACT_APP_API_URL}/api/activity`);
      const dataActivities = await resActivities.json();
      setTrainers(dataTrainers.data);
      setActivities(dataActivities);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTrainersActivities();
  }, []);

  const createClass = async (newClass) => {
    newClass.trainer = [newClass.trainer];
    const bodyClasses = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newClass)
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/`, bodyClasses);
      const data = await response.json();
      if (data.length !== 0 && !data.error) {
        history.goBack();
        // setResponseModal({ error: false, msg: 'Class created sucessfully' });
        // setShowModal(true);
      } //else {
      //   setResponseModal({ error: true, msg: data.message });
      //   setShowModal(true);
      // }
    } catch (error) {
      // setResponseModal({ error: true, msg: error });
      // setShowModal(true);
      throw new Error(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
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

  const onChangeInput = async (e) => {
    await setClasses({
      ...classes,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div className={styles.formContainer}>
        {activities.length !== 0 && trainers.length !== 0 ? (
          <form onSubmit={onSubmit}>
            <div className={styles.subContainer}>
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
                <select
                  className={styles.select}
                  value={classes.day}
                  name="day"
                  onChange={onChangeInput}
                >
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
                <label className={styles.label}>Time</label>
                <input
                  className={styles.input}
                  type="time"
                  value={classes.time}
                  name="time"
                  onChange={onChangeInput}
                />
                {(error && classes.time === '') || (error && classes.time === 0) ? (
                  <span className={styles.error}>Field is required</span>
                ) : null}
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Capacity</label>
                <input
                  className={styles.input}
                  type="number"
                  value={classes.capacity}
                  name="capacity"
                  onChange={onChangeInput}
                />
                {error && classes.capacity === '' ? (
                  <span className={styles.error}>Field is required</span>
                ) : null}
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.button} type="submit">
                  {isCreateRoute ? 'Create Class' : 'Edit Class'}
                </button>
              </div>
            </div>
          </form>
        ) : null}
      </div>
    </>
  );
}

export default ClassForm;
