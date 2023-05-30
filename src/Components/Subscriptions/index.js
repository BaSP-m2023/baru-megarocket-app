import { useState, useEffect } from 'react';
import styles from './subscriptions.module.css';
import Table from './Table';
import { CreateModal, ErrorModal } from './Modals';
const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [classes, setClasses] = useState([]);
  const [members, setMembers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState({ error: false, msg: '' });

  useEffect(() => {
    addItem();
    fetchData();
  }, []);

  const addItem = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`);
      const data = await response.json();
      setSubscriptions(data);
      setError({ error: false, msg: '' });
    } catch (error) {
      setError({ error: true, msg: error });
      throw new Error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/`);
      const resClasses = await fetch(`${process.env.REACT_APP_API_URL}/api/class/search`);
      const resMembers = await fetch(`${process.env.REACT_APP_API_URL}/api/member/`);
      const data = await response.json();
      const dataClasses = await resClasses.json();
      const dataMembers = await resMembers.json();
      setMembers(dataMembers.data);
      setSubscriptions(data.data);
      setClasses(dataClasses.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.Title}>Subscription</h1>
      <div>
        <Table data={subscriptions} classes={classes} members={members} />
      </div>
      <div>
        {createModal ? <CreateModal onClose={() => setCreateModal(false)} /> : <div></div>}
        {errorModal ? <ErrorModal onClose={() => setErrorModal(false)} /> : <div></div>}
      </div>
    </section>
  );
};
export default Subscriptions;
