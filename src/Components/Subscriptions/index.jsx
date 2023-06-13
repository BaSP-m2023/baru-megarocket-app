import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getSubscriptions } from '../../Redux/Subscriptions/thunks';

import styles from './subscriptions.module.css';
import Table from './Table';

import Button from '../Shared/Button';
import { Input } from '../Shared/Inputs';
import ResponseModal from '../Shared/ResponseModal';
import Loader from '../Shared/Loader';

const Subscriptions = () => {
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const pending = useSelector((state) => state.subscriptions.isPending);

  useEffect(() => {
    getSubscriptions(dispatch);
  }, [dispatch]);

  useEffect(() => {
    filterSubscriptions();
  }, [searchTerm]);

  const filterSubscriptions = () => {
    const filtered = subscriptions?.filter((subscription) => {
      const fullName =
        `${subscription.members?.name} ${subscription.members?.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });
    setFilteredSubscriptions(filtered);
  };
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Subscriptions</h1>
      <div className={styles.inputSearch}>
        <Input
          name="Search Subscription"
          labelText="Search"
          placeholder="Search Subscription"
          value={searchTerm}
          change={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className={styles.containerContent}>
        {pending && <Loader />}
        {!pending && subscriptions?.length > 0 && (
          <Table
            className={subscriptions.table}
            data={filteredSubscriptions?.length > 0 ? filteredSubscriptions : subscriptions}
          />
        )}
      </div>
      <div className={styles.buttonContainer}>
        <Link to="/subscriptions/add">
          <Button classNameButton="submitButton" text="+ Add New" />
        </Link>
      </div>
      <div>
        {createModal && (
          <ResponseModal
            handler={() => setCreateModal(false)}
            state="success"
            message="Subscription Created"
          />
        )}
      </div>
      <div>
        {errorModal && (
          <ResponseModal
            handler={() => setErrorModal(false)}
            state="fail"
            message="An error ocurred"
          />
        )}
      </div>
    </section>
  );
};
export default Subscriptions;
