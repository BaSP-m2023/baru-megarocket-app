import styles from './classes.module.css';
import ClassList from './List/ClassList';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Shared/Loader';
import { getClasses, setShowModal } from '../../Redux/Classes/thunks';
import Button from '../Shared/Button';
import ResponseModal from '../Shared/ResponseModal';

function Projects() {
  const [selectedClass, setSelectedClass] = useState(null);
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes);
  const pending = useSelector((state) => state.classes.isPending);
  const response = useSelector((state) => state.classes.response);

  useEffect(() => {
    getClasses(dispatch);
  }, [dispatch]);

  const getById = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/${id}`);
      const data = await response.json();
      setSelectedClass(data.data);
    } catch (error) {
      setShowModal(dispatch, { show: true, msg: error, state: 'fail' });
    }
  };

  return (
    <section className={styles.container}>
      <h2>Class List</h2>
      {pending && <Loader />}
      {classes.data.length > 0 && !pending && (
        <ClassList
          classes={classes.data && classes.data}
          getById={getById}
          selectedClass={selectedClass}
        ></ClassList>
      )}
      {!pending && classes.data.length === 0 && 'There are not classes yet. Add new ones!'}
      <Link to={'/classes/add'} className={styles.addNew}>
        <Button text="+ Add new" classNameButton="submitButton" />
      </Link>
      {response.show && (
        <ResponseModal
          handler={() => setShowModal(dispatch, { show: false, msg: '', state: '' })}
          message={response.msg}
          state={response.state}
        />
      )}
    </section>
  );
}

export default Projects;
