import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './classes.module.css';

import { getClasses } from 'Redux/Classes/thunks';
import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';

import ClassList from './List/ClassList';
import Loader from 'Components/Shared/Loader';
import Button from 'Components/Shared/Button';
import ResponseModal from 'Components/Shared/ResponseModal';

function Projects() {
  const dispatch = useDispatch();
  const { data, isPending } = useSelector((state) => state.classes);
  const { show, message, state } = useSelector((state) => state.toast);

  useEffect(() => {
    getClasses(dispatch);
  }, [dispatch]);

  return (
    <section className={styles.container}>
      <h2>Class List</h2>
      {isPending && <Loader />}
      {data.length > 0 && !isPending && <ClassList classes={data && data}></ClassList>}
      {!isPending && data.length === 0 && 'There are not classes yet. Add new ones!'}
      <Link to={'classes/add'} className={styles.addNew} data-testid="add-class-link">
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
