import styles from './classes.module.css';
import ClassList from './List/ClassList';
import Form from './Form/Form';
import { useState, useEffect } from 'react';

function Projects() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [createdClass, setCreatedClass] = useState(null);

  const getClasses = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/class/search`);
      const data = await response.json();
      setClasses(data.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getById = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/class/${id}`);
      const data = await response.json();
      console.log(data.data);
      setSelectedClass(data.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const createClass = async (classes) => {
    classes.trainer = [classes.trainer];
    console.log(classes);
    const bodyClasses = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(classes)
    };
    try {
      const response = await fetch(`http://localhost:4000/api/class/`, bodyClasses);
      const data = await response.json();
      if (!data.error) {
        setCreatedClass(data.data);
      } else {
        console.log(data);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  console.log(createdClass);

  return (
    <section className={styles.container}>
      <h2>Class List</h2>
      <div>
        <ClassList classes={classes} getById={getById} selectedClass={selectedClass}></ClassList>
        <Form createClass={createClass}></Form>
      </div>
    </section>
  );
}

export default Projects;
