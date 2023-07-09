import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './subscriptions.module.css';

import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';
import { getSubscriptions } from 'Redux/Subscriptions/thunks';
import { getClasses } from 'Redux/Classes/thunks';

import Table from './Table';
import { Button } from 'Components/Shared/Button';
import ResponseModal from 'Components/Shared/ResponseModal';

const Subscriptions = () => {
  const { show, message, state } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  const subscriptions = useSelector((state) => state.subscriptions.data);
  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getClasses());
  }, []);

  return (
    <section>
      <h1 className={styles.title}>Subscriptions</h1>
      <div>
        <Table className={subscriptions.table} data={subscriptions} />
      </div>
      <div className={styles.buttonContainer}>
        <Link to="subscriptions/add" data-testid="subscription-add-link">
          <Button classNameButton="submitButton" text="+ Add New" />
        </Link>
      </div>
      {show && (
        <ResponseModal
          state={state}
          message={message}
          handler={() => dispatch(handleDisplayToast())}
        />
      )}
    </section>
  );
};
export default Subscriptions;
