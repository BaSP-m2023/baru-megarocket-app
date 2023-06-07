import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import styles from './activities.module.css';

import Table from './Table';
import Button from '../Shared/Button';
import ResponseModal from '../Shared/ResponseModal';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [response, setResponseModal] = useState({ show: false, state: '', message: '' });
  const location = useLocation();
  const history = useHistory();

  const handleResponse = (state, message) => {
    setResponseModal({ ...response, show: !response.show, state, message });

    if (location.state) {
      setResponseModal({
        ...response,
        show: !response.show,
        state: location.state.state,
        message: location.state.message
      });
    }

    setTimeout(() => {
      setResponseModal({});
    }, 2000);
  };

  useEffect(() => {
    const initializeList = async () => {
      const activities = await getActivities();
      setActivities(activities);
    };
    initializeList();
  }, []);

  useEffect(() => {
    if (location.state) {
      handleResponse();
    }
    history.replace({ ...history.location, state: undefined });
  }, []);

  const getActivities = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activity`);
      const data = await res.json();
      return data || [];
    } catch (error) {
      handleResponse('fail', error);
    }
  };

  const deleteActivity = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${id}`, {
        method: 'DELETE'
      });
      const { message } = await res.json();
      if (res.status === 200) {
        handleResponse('success', message);
      }
      if (res.status == 400) {
        handleResponse('fail', message);
      }
      setActivities(activities.filter((activity) => activity._id !== id));
    } catch (error) {
      handleResponse('fail', error);
    }
  };

  return (
    <section className={styles.container}>
      {response.show && (
        <ResponseModal handler={handleResponse} state={response.state} message={response.message} />
      )}
      <Table activities={activities} onDelete={deleteActivity} />
      <Link to={'activities/add'}>
        <Button text={'+ Add new'} classNameButton={'addButton'} />
      </Link>
    </section>
  );
}

export default Activities;
