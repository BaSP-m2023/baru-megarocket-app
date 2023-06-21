import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleDisplayToast } from '../../Redux/Shared/ResponseToast/actions';

import { getSubscriptions } from '../../Redux/Subscriptions/thunks';

import styles from './subscriptions.module.css';
import Table from './Table';

import Button from '../Shared/Button';
import ResponseModal from '../Shared/ResponseModal';

const Subscriptions = () => {
  const { show, message, state } = useSelector((state) => state.toast);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const subscriptions = useSelector((state) => state.subscriptions.data);
  useEffect(() => {
    getSubscriptions(dispatch);
  }, [dispatch]);

  useEffect(() => {
    filterSubscriptions();
  }, [searchTerm, subscriptions]);

  const filterSubscriptions = () => {
    const filtered = subscriptions?.filter((subscription) => {
      const fullName =
        `${subscription?.members?.name} ${subscription?.members?.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });
    setFilteredSubscriptions(filtered);
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Subscriptions</h1>
      <div className={styles.inputSearch}>
        <input
          name="Search Subscription"
          placeholder="Search Subscription"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className={styles.containerContent}>
        <Table className={subscriptions.table} data={filteredSubscriptions} />
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/subscriptions/add">
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
