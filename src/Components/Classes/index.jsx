import styles from './classes.module.css';
import ClassList from './List/ClassList';
import Modal from './Modal/Modal';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Projects() {
  const [classes, setClasses] = useState([]);

  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [responseModal, setResponseModal] = useState({ error: false, msg: '' });
  const [renderData, setRenderData] = useState(false);

  const getData = async () => {
    try {
      const resClasses = await fetch(`${process.env.REACT_APP_API_URL}/api/class/search`);
      const dataClasses = await resClasses.json();
      setClasses(dataClasses.data);
    } catch (error) {
      setResponseModal({ error: true, msg: 'Something went wrong :( try again later' });
      setShowModal(true);
    }
  };

  useEffect(() => {
    getData();
  }, [renderData]);

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

  return (
    <section className={styles.container}>
      <h2>Class List</h2>
      <div>
        {classes.length !== 0 ? (
          <ClassList
            classes={classes && classes}
            getById={getById}
            selectedClass={selectedClass}
            setRenderData={setRenderData}
            setResponseModal={setResponseModal}
            setShowModal={setShowModal}
          ></ClassList>
        ) : (
          'Something went wrong :( try again later'
        )}
        <Link to={'/classes/create'}>
          <button className={styles.button}>+ Add new Class</button>
        </Link>
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
