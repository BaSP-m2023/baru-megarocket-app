import styles from './classes.module.css';
import ClassList from './List/ClassList';
import Form from './Form/Form';
import { useState, useEffect } from 'react';

function Projects() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [formCreateSwitch, setFormCreateSwitch] = useState(false);

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
      setSelectedClass(data.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  console.log(formCreateSwitch);

  return (
    <section className={styles.container}>
      <h2>Class List</h2>
      <div>
        <ClassList classes={classes} getById={getById} selectedClass={selectedClass}></ClassList>
        {selectedClass && formCreateSwitch && <Form selectedClass={selectedClass}></Form>}
      </div>
      <button onClick={() => setFormCreateSwitch(!formCreateSwitch)}>+ Add New</button>
    </section>
  );
}

export default Projects;
