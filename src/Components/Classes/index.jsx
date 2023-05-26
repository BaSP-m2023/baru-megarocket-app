import styles from './classes.module.css';
import ClassList from './ClassList';
import { useState, useEffect } from 'react';

function Projects() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/class/search`)
      .then((response) => response.json())
      .then((response) => {
        setClasses(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Classes</h2>
      <div>
        <ClassList classes={classes}></ClassList>
      </div>
    </section>
  );
}

export default Projects;
