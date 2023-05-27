import styles from './classes.module.css';
import ClassList from './List/ClassList';
import { useState, useEffect } from 'react';

function Projects() {
  const [classes, setClasses] = useState([]);

  const getClasses = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/class/search`);
      const data = await response.json();
      setClasses(data.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <h2>Class List</h2>
        <button>+ Add New</button>
      </div>
      <div>
        <ClassList classes={classes}></ClassList>
      </div>
    </section>
  );
}

export default Projects;
