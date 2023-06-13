import styles from './classes.module.css';
import ClassList from './List/ClassList';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Shared/Loader';
import { getClasses } from '../../Redux/Classes/thunks';
import Button from '../Shared/Button';
import ResponseModal from '../Shared/ResponseModal';
import { handleDisplayToast } from '../../Redux/Shared/ResponseToast/actions';

function Projects() {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes);
  const pending = useSelector((state) => state.classes.isPending);
  const { show, message, state } = useSelector((state) => state.toast);

  useEffect(() => {
    getClasses(dispatch);
  }, [dispatch]);

  return (
    <section className={styles.container}>
      <h2>Class List</h2>
      {pending && <Loader />}
      {classes.data.length > 0 && !pending && (
        <ClassList classes={classes.data && classes.data}></ClassList>
      )}
      {!pending && classes.data.length === 0 && 'There are not classes yet. Add new ones!'}
      <Link to={'/classes/add'} className={styles.addNew}>
        <Button text="+ Add new" classNameButton="submitButton" />
      </Link>

      {show && (
        <ResponseModal
          handler={() => dispatch(handleDisplayToast(false))}
          state={state}
          message={message}
        />
      )}
    </section>
  );
}

export default Projects;
