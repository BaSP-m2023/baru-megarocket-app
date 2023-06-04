import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './activities.module.css';

import List from './Table/List';
import Button from '../Shared/Button';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const initializeList = async () => {
      const activities = await getActivities();
      setActivities(activities);
    };
    initializeList();
  }, []);

  const getActivities = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activity`);
      const data = await res.json();
      return data;
    } catch (error) {
      return [];
    }
  };

  const deleteActivity = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${id}`, {
        method: 'DELETE'
      });
      const { message } = await res.json();
      console.log(message);
      setActivities(activities.filter((activity) => activity._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.container}>
      <List activities={activities} onDelete={deleteActivity} />
      <Link to={'activities/create'}>
        <Button text={'+ Add new'} classNameButton={'addButton'} />
      </Link>
    </section>
  );
}

export default Activities;
