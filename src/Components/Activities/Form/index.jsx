// import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './form.module.css';
import Button from '../../Shared/Button';
import { Input, Textarea } from '../../Shared/Inputs';
import ConfirmModal from '../../Shared/ConfirmModal';
import ResponseModal from '../../Shared/ResponseModal';

const Form = () => {
  const [activity, setActivity] = useState({ name: '', description: '', isActive: false });
  const [confirm, setConfirmModal] = useState(false);
  const [response, setResponseModal] = useState({ show: false, state: '', message: '' });
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const redirectAfterSubmit = {
    pathname: '/activities',
    state: {
      state: '',
      message: ''
    }
  };

  const handleConfirm = () => {
    setConfirmModal(!confirm);
  };

  const handleResponse = (state, message) => {
    setResponseModal({ ...response, show: !response.show, state, message });

    setTimeout(() => {
      setResponseModal({});
    }, 2500);
  };

  useEffect(() => {
    if (location.pathname.includes('edit')) {
      const setupForm = async () => {
        const { name, description, isActive } = await getActivity(id);
        setActivity({ name, description, isActive });
      };
      setupForm();
    }
  }, []);

  const getActivity = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${id}`);
      const { data } = await res.json();
      return data;
    } catch (error) {
      handleResponse('fail', error);
    }
  };

  const createActivity = async (newActivity) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activity`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(newActivity)
      });
      const data = await res.json();
      if (res.status === 201) {
        redirectAfterSubmit.state.message = 'Activty created';
        redirectAfterSubmit.state.state = 'success';
        history.push(redirectAfterSubmit);
      }
      if (res.status === 400) {
        handleResponse('fail', data.message);
      }
    } catch (error) {
      handleResponse('fail', error);
    }
  };

  const updateActivity = async (id, { name, description, isActive }) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ name, description, isActive })
      });
      const data = await res.json();
      if (res.status === 200) {
        // handleResponse('success', 'Activity updated!');
        redirectAfterSubmit.state.message = 'Activity updated!';
        redirectAfterSubmit.state.state = 'success';
        history.push(redirectAfterSubmit);
      }
      if (res.status === 404) {
        redirectAfterSubmit.state.message = data.message;
        redirectAfterSubmit.state.state = 'fail';
        history.push(redirectAfterSubmit);
      }
      if (res.status === 400) {
        handleResponse('fail', data.message);
      }
    } catch (error) {
      handleResponse('fail', error);
    }
  };

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
    location.pathname.includes('add')
      ? await createActivity(activity)
      : await updateActivity(id, activity);
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
      {response.show && (
        <ResponseModal
          handler={() => handleResponse()}
          state={response.state}
          message={response.message}
        />
      )}
    </section>
  );
};

export default Form;
