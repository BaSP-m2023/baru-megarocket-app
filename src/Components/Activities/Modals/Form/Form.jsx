import React, { useEffect, useState } from 'react';
import styles from './form.module.css';

const Form = ({ hide, activityToUpdate, onAdd, onEdit }) => {
  const [activity, setActivity] = useState(activityToUpdate);
  const formType = Object.entries(activityToUpdate).length === 0;

  useEffect(() => {
    if (formType) {
      setActivity({
        name: '',
        description: '',
        isActive: false
      });
    }
  }, [activityToUpdate]);

  const handleChanges = (e) => {
    const target = e.target.name;
    const value = target === 'isActive' ? e.currentTarget.checked : e.target.value;
    setActivity({ ...activity, [target]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    formType ? onAdd(activity) : onEdit(activityToUpdate._id, activity);
  };

  return (
    <div className={`${styles['form-container']}`}>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={`${styles['form-header']}`}>
          <h3>{formType ? 'Add new activity' : 'Edit activity'}</h3>
          <span onClick={() => hide()} className={`${styles['form-closer']}`}>
            &times;
          </span>
        </div>
        <div className={`${styles['form-inputs']}`}>
          <div className={`${styles['form-group']}`}>
            <label className={`${styles['form-label']}`}>Name</label>
            <input
              className={`${styles['form-input']}`}
              type="text"
              name="name"
              value={activity.name || ''}
              onChange={(e) => handleChanges(e)}
            />
          </div>
          <div className={`${styles['form-group']}`}>
            <label className={`${styles['form-label']}`}>Description</label>
            <textarea
              className={`${styles['form-textarea']}`}
              name="description"
              value={activity.description || ''}
              onChange={(e) => handleChanges(e)}
            ></textarea>
          </div>
          <div className={`${styles['form-group']}`}>
            <label className={`${styles['form-label']}`}>Is active ?</label>
            <input
              type="checkbox"
              name="isActive"
              checked={activity.isActive || false}
              onChange={(e) => handleChanges(e)}
            />
          </div>
        </div>
        <div className={`${styles['form-buttons']}`}>
          <input
            className={`${styles['form-btn']} ${styles['btn-submit']}`}
            type="submit"
            value="Submit"
          />
          <button
            className={`${styles['form-btn']} ${styles['btn-cancel']}`}
            onClick={() => hide()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
