import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './subscriptions.module.css';
import Table from './Table';
import Button from '../Shared/Button';
import { Input } from '../Shared/Inputs';

import ResponseModal from '../Shared/ResponseModal';
const Subscriptions = () => {
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    filterSubscriptions();
    fetchData();
    if (createModal) {
      setTimeout(() => {
        setCreateModal(false);
      }, 3000);
    }
    if (errorModal) {
      setTimeout(() => {
        setErrorModal(false);
      }, 3000);
    }
  }, [createModal, errorModal, subscriptions, searchTerm]);

  const filterSubscriptions = () => {
    const filtered = subscriptions.filter((subscription) => {
      const fullName =
        `${subscription.members.name} ${subscription.members.lastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });
    setFilteredSubscriptions(filtered);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/`);
      const data = await response.json();
      setSubscriptions(data.data);
    } catch (error) {
      console.error('Error', error);
    }
  };
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Subscription</h1>
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
        <Table className={subscriptions.table} data={filteredSubscriptions} />
      </div>
      <div className={styles.buttonContainer}>
        <Link to="subscriptions/add">
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
