// import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import styles from './form.module.css';

import Button from '../../Shared/Button';
import { useState } from 'react';

const Form = () => {
  const [activity, setActivity] = useState({
    name: '',
    description: '',
    isActive: false
  });
  const params = useParams();
  console.log(params);
  const location = useLocation();

  // useEffect(() => {
  //   if (formType) {
  //     setActivity({
  //       name: '',
  //       description: '',
  //       isActive: false
  //     });
  //   }
  // }, [activityToUpdate]);

  const createActivity = async (newActivity) => {
    try {
      /*const res = */ await fetch(`${process.env.REACT_APP_API_URL}/api/activity`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newActivity)
      });
      // const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const updateActivity = async (id, { name, description, isActive }) => {
    try {
      /*const res = */ await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ name, description, isActive })
      });
      // const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChanges = (e) => {
    const target = e.target.name;
    const value = target === 'isActive' ? e.currentTarget.checked : e.target.value;
    setActivity({ ...activity, [target]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    location.pathname.includes('create') ? createActivity(activity) : updateActivity(activity);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={`${styles['form-header']}`}>
        <h3></h3>
      </div>
      <div className={`${styles['form-inputs']}`}>
        <div className={`${styles['form-group']}`}>
          <label className={`${styles['form-label']}`}>Name</label>
          <input
            className={`${styles['form-input']}`}
            type="text"
            name="name"
            // value={activity.name || ''}
            onChange={(e) => handleChanges(e)}
          />
        </div>
        <div className={`${styles['form-group']}`}>
          <label className={`${styles['form-label']}`}>Description</label>
          <textarea
            className={`${styles['form-textarea']}`}
            name="description"
            // value={activity.description || ''}
            onChange={(e) => handleChanges(e)}
          ></textarea>
        </div>
        <div className={`${styles['form-group']}`}>
          <label className={`${styles['form-label']}`}>Is active ?</label>
          <input
            type="checkbox"
            name="isActive"
            // checked={activity.isActive || false}
            onChange={(e) => handleChanges(e)}
          />
        </div>
      </div>
      <div className={`${styles['form-buttons']}`}>
        {/* <input
          className={`${styles['form-btn']} ${styles['btn-submit']}`}
          type="submit"
          value="Submit"
        /> */}
        <Button text={'Submit'} classNameButton={'submitButton'} />
        <Link to="/activities">
          <Button text={'Cancel'} classNameButton={'cancelButton'} />
        </Link>
      </div>
    </form>
  );
};

export default Form;
