import styles from './classes.module.css';
import ClassList from './List/ClassList';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '../Shared/Button';
import ResponseModal from '../Shared/ResponseModal';

function Projects() {
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState({ show: false, msg: '', state: '' });
  const [selectedClass, setSelectedClass] = useState(null);
  const [renderData, setRenderData] = useState(false);
  const history = useHistory();

  const getData = async () => {
    try {
      const resClasses = await fetch(`${process.env.REACT_APP_API_URL}/api/class/search`);
      const dataClasses = await resClasses.json();
      setClasses(dataClasses.data);
    } catch (error) {
      setShowModal({ show: true, state: 'fail', msg: 'Something went wrong :( try again later' });
    }
  };

  useEffect(() => {
    getData();
  }, [renderData]);

  useEffect(() => {
    if (history.location.state) {
      setShowModal({
        show: history.location.state.show || false,
        msg: history.location.state.msg || '',
        state: 'success'
      });
    }
    const objHistory = {
      ...location,
      state: { show: false, msg: '', state: '' }
    };
    setTimeout(() => {
      setShowModal({ show: false, msg: '', state: '' });
    }, 2000);
    history.replace(objHistory);
  }, []);

  const getById = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`);
      const data = await response.json();
      setSelectedClass(data.data);
    } catch (error) {
      setShowModal({ show: true, state: 'fail', msg: 'Something went wrong :( try again later' });
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
          ></ClassList>
        ) : (
          'There are not classes yet. Add new ones!!'
        )}
        <Link to={'/classes/add'}>
          <Button text="+ Add new Class" classNameButton="submitButton" />
        </Link>
      </div>
      {showModal.show && (
        <ResponseModal
          handler={() => setShowModal({ show: false, msg: '', state: '' })}
          message={showModal.msg}
          state={showModal.state}
        />
      )}
    </section>
  );
}

export default Projects;
