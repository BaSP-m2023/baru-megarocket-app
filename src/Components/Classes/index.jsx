import styles from './classes.module.css';
import ClassList from './List/ClassList';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Shared/Loader';
import { getClasses } from '../../Redux/Classes/thunks';
import Button from '../Shared/Button';
import ResponseModal from '../Shared/ResponseModal';

function Projects() {
  const [showModal, setShowModal] = useState({ show: false, msg: '', state: '' });
  const [selectedClass, setSelectedClass] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useSelector((state) => state.classes.data);
  const pending = useSelector((state) => state.classes.isPending);
  useEffect(() => {
    getClasses(dispatch);
  }, [dispatch]);

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
      {pending && <Loader />}
      {classes.length > 0 && !pending && (
        <ClassList
          classes={classes && classes}
          getById={getById}
          selectedClass={selectedClass}
          dispatch={dispatch}
        ></ClassList>
      )}
      {!pending && classes.length === 0 && 'There are not classes yet. Add new ones!'}
      <Link to={'/classes/add'} className={styles.addNew}>
        <Button text="+ Add new" classNameButton="submitButton" />
      </Link>
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
