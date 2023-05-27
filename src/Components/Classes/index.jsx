import styles from './classes.module.css';
import ClassList from './List/ClassList';
import Form from './Form/Form';
import { useState, useEffect } from 'react';

function Projects() {
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [createdClass, setCreatedClass] = useState(null);

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
      console.log(data.data);
      setSelectedClass(data.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const createClass = async (classes) => {
    classes.trainer = [classes.trainer];
    const bodyClasses = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(classes)
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/`, bodyClasses);
      const data = await response.json();
      if (data.length !== 0 && !data.error) {
        setCreatedClass(data.data);
        console.log(createdClass);
        console.log(response.status);
      } else {
        console.log(data);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Class List</h2>
      <div>
        <ClassList classes={classes} getById={getById} selectedClass={selectedClass}></ClassList>
        <Form createClass={createClass} trainers={trainers} activities={activities}></Form>
      </div>
    </section>
  );
}

export default Projects;
