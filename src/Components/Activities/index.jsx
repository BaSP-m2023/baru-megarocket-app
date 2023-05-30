import { useState, useEffect } from 'react';
import styles from './activities.module.css';

import List from './Table/List';
import DeleteModal from './Modals/Delete/Delete';
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
      const res = await fetch(`${process.env.REACT_APP_URL_API}/api/activity`);
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

  const createActivity = async () => {};

  const updateActivity = async () => {};

  const deleteActivity = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL_API}/api/activity/${id}`, {
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
