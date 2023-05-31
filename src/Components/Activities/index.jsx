import { useState, useEffect } from 'react';
import styles from './activities.module.css';

import List from './Table/List';
import DeleteModal from './Modals/Delete';
import Toast from './Toast/Toast';
import Form from './Modals/Form/Form';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({});
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastContent, setToastContent] = useState({});
  const [form, setForm] = useState(false);

  const handleDelete = (activity = {}) => {
    setActivity(activity);
    setModal(!modal);
  };

  const handleToast = (msg) => {
    setToastContent(msg);
    setToast(!toast);
  };

  const handleForm = (activity = {}) => {
    setActivity(activity);
    setForm(!form);
  };

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
      handleToast({
        content: 'Something went wrong :( try again later',
        className: 'toast-wrong'
      });
      return [];
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
        handleToast({
          content: 'Activity created',
          className: 'toast-ok'
        });
        setActivities([...activities, data]);
        setForm(!form);
      }
      if (res.status === 400) {
        handleToast({
          content: data.message,
          className: 'toast-wrong'
        });
      }
    } catch (error) {
      handleToast({
        content: 'Something went wrong :( try again later',
        className: 'toast-wrong'
      });
    }
  };

  const updateListAfterUpdate = (id, data) => {
    const act = activities.find((activity) => activity._id === id);
    const index = activities.indexOf(act);
    activities[index] = data;
    setActivities(activities);
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
        handleToast({
          content: 'Activity updated',
          className: 'toast-ok'
        });
        updateListAfterUpdate(id, data);
        setForm(!form);
      }
      if (res.status === 400) {
        handleToast({
          content: data.message,
          className: 'toast-wrong'
        });
      }
    } catch (error) {
      handleToast({
        content: 'Something went wrong :( try again later',
        className: 'toast-wrong'
      });
    }
  };

  const deleteActivity = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/activity/${id}`, {
        method: 'DELETE'
      });
      const { message } = await res.json();
      if (res.status === 200) {
        handleToast({ content: message, className: 'toast-ok' });
      } else {
        handleToast({ content: message, className: 'toast-wrong' });
      }
      setModal(!modal);
      setActivities(activities.filter((activity) => activity._id !== id));
    } catch (error) {
      handleToast({ content: 'Something went wrong..', className: 'toast-wrong' });
    }
  };

  return (
    <section className={styles.container}>
      {activities.length !== 0 ? (
        <List activities={activities} handleDelete={handleDelete} handleForm={handleForm} />
      ) : (
        'There are not activities yet :('
      )}
      <button className={`${styles['btn-new']}`} onClick={() => handleForm()}>
        + Add new
      </button>
      {modal && <DeleteModal hide={handleDelete} activity={activity} onDelete={deleteActivity} />}
      {toast && (
        <Toast
          handler={handleToast}
          content={toastContent.content}
          classes={toastContent.className}
        />
      )}
      {form && (
        <Form
          hide={handleForm}
          activityToUpdate={activity}
          onAdd={createActivity}
          onEdit={updateActivity}
        />
      )}
    </section>
  );
}

export default Activities;
