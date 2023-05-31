import styles from './classes.module.css';
import ClassList from './List/ClassList';
import Form from './Form/Form';
import Modal from './Modal/Modal';
import React, { useState, useEffect } from 'react';

function Projects() {
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [responseModal, setResponseModal] = useState({ error: false, msg: '' });

  const getData = async () => {
    try {
      const resClasses = await fetch(`${process.env.REACT_APP_API_URL}/api/class/search`);
      const dataClasses = await resClasses.json();
      const resTrainers = await fetch(`${process.env.REACT_APP_API_URL}/api/trainer`);
      const dataTrainers = await resTrainers.json();
      const resActivities = await fetch(`${process.env.REACT_APP_API_URL}/api/activity`);
      const dataActivities = await resActivities.json();
      setClasses(dataClasses.data);
      setTrainers(dataTrainers.data);
      setActivities(dataActivities);
    } catch (error) {
      setResponseModal({ error: true, msg: error });
      setShowModal(true);
      throw new Error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getById = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`);
      const data = await response.json();
      setSelectedClass(data.data);
    } catch (error) {
      setResponseModal({ error: true, msg: error });
      setShowModal(true);
      throw new Error(error);
    }
  };

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
        setClasses([
          ...classes,
          {
            _id: data._id,
            activity: {
              name: data.activity.name
            },
            trainer: [{ firstName: data.trainer[0].firstName }],
            day: data.day,
            time: data.time,
            capacity: data.capacity
          }
        ]);
        setResponseModal({ error: false, msg: 'Class created sucessfully' });
        setShowModal(true);
      } else {
        setResponseModal({ error: true, msg: data.message });
        setShowModal(true);
      }
    } catch (error) {
      setResponseModal({ error: true, msg: error });
      setShowModal(true);
      throw new Error(error);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Class List</h2>
      <div>
        <ClassList
          classes={classes && classes}
          getById={getById}
          selectedClass={selectedClass}
        ></ClassList>
        <Form createClass={createClass} trainers={trainers} activities={activities}></Form>
        <Modal
          showModal={showModal}
          responseModal={responseModal}
          onClose={() => setShowModal(!showModal)}
        ></Modal>
      </div>
    </section>
  );
}

export default Projects;
