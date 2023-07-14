import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './activities.module.css';

import { getActivities } from 'Redux/Activities/thunks';
import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';

import Table from './Table';
import { Button } from 'Components/Shared/Button';
import Loader from 'Components/Shared/Loader';
import ResponseModal from 'Components/Shared/ResponseModal';

function Activities() {
  const { list, isPending } = useSelector((state) => state.activities);
  const { show, message, state } = useSelector((state) => state.toast);
  const { dark } = useSelector((state) => state.darkmode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivities());
  }, []);

  if (isPending) {
    return (
      <section className={styles.container}>
        <Loader />
      </section>
    );
  }
  return (
    <section>
      <h2 className={!dark ? styles.title : styles.darkTitle}>Activities</h2>
      {list.length !== 0 ? <Table /> : 'There are not activities yet, add new ones!!'}
      <div className={styles.button}>
        <Link to={'activities/add'} data-testid="add-activity-link">
          <Button text={'+ Add new'} classNameButton={'addButton'} />
        </Link>
      </div>
      {show && (
        <ResponseModal
          handler={() => dispatch(handleDisplayToast(false))}
          message={message}
          state={state}
        />
      )}
    </section>
  );
}

export default Activities;
