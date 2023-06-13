import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './subscriptions.module.css';
import Table from './Table';
import Button from '../Shared/Button';
import { Input } from '../Shared/Inputs';
const Subscriptions = () => {
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    filterSubscriptions();
    fetchData();
  }, [subscriptions, searchTerm]);

  const filterSubscriptions = () => {
    const filtered = subscriptions.filter((subscription) => {
      const fullName =
        `${subscription.members?.name} ${subscription.members?.lastName}`.toLowerCase();
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
        <Link to="/subscriptions/add">
          <Button classNameButton="submitButton" text="+ Add New" />
        </Link>
      </div>
    </section>
  );
};
export default Subscriptions;
