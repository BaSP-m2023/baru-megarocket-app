import { useState } from 'react';
import styles from './form.module.css';

function Form({ createClass }) {
  const [formCreateSwitch, setFormCreateSwitch] = useState(false);
  const [classes, setClasses] = useState({
    activity: '',
    trainer: '',
    day: '',
    time: '',
    capacity: ''
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      Object.values(classes).every((el) => {
        if (el === '') {
          return false;
        }
        return true;
      })
    ) {
      createClass(classes);
      setClasses({
        activity: '',
        trainer: '',
        day: '',
        time: '',
        capacity: ''
      });
    } else {
      setFormCreateSwitch(!formCreateSwitch);
    }
  };

  const onChangeInput = async (e) => {
    await setClasses({
      ...classes,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.formContainer}>
      {formCreateSwitch ? (
        <form onSubmit={onSubmit}>
          <div className={styles.subContainer}>
            <div className={styles.inputContainer}>
              <label>Activity</label>
              <input
                type="text"
                value={classes.activity}
                name="activity"
                onChange={onChangeInput}
              />
            </div>
            <div className={styles.inputContainer}>
              <label>Trainer</label>
              <input type="text" value={classes.trainer} name="trainer" onChange={onChangeInput} />
            </div>
            <div className={styles.inputContainer}>
              <label>Day</label>
              <select name="day" onChange={onChangeInput}>
                <option value={classes.day}>{classes.day}</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <div className={styles.inputContainer}>
              <label>Time</label>
              <input type="time" value={classes.time} name="time" onChange={onChangeInput} />
            </div>
            <div className={styles.inputContainer}>
              <label>Capacity</label>
              <input
                type="number"
                value={classes.capacity}
                name="capacity"
                onChange={onChangeInput}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit">Create</button>
            </div>
          </div>
        </form>
      ) : (
        <button
          className={styles.buttonSwitch}
          onClick={() => setFormCreateSwitch(!formCreateSwitch)}
        >
          Create{' '}
        </button>
      )}
    </div>
  );
}

export default Form;
