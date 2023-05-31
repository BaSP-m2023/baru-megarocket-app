import { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import Table from './Table';

import { CreateModal, ErrorModal } from './Modals';
import Form from './Form-Create';
const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [classes, setClasses] = useState([]);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState({ error: false, msg: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const addItem = async (newSubscription) => {
    try {
      const isoDate = newSubscription.date ? new Date(newSubscription.date).toISOString() : '';
      const body = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          classes: newSubscription.classes,
          members: newSubscription.members,
          date: isoDate
        })
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/`, body);
      const data = await response.json();
      if (data.length !== 0 && !data.error) {
        setCreateModal(true);
        setAddForm(false);
        setSubscriptions([
          ...subscriptions,
          {
            _id: data._id,
            classes: data.classes._id,
            members: data.members._id,
            date: data.date
          }
        ]);
        fetchData();
        setError({ error: false, msg: '' });
      } else {
        setError({ error: true, msg: data.message });
        setErrorModal(true);
        setAddForm(false);
      }
    } catch (e) {
      setError({ error: true, msg: e });
      throw new Error(error);
    }
  };
  //No use for GetByID Commented Just in case we need it
  // const getSubscriptionById = async (idSubscription) => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_API_URL}/api/subscription/${idSubscription}`
  //     );
  //     const data = await response.json();
  //     setSubscriptionById(data._id);
  //     return data;
  //   } catch (error) {
  //     setError({ error: true, msg: error });
  //     throw new Error(error);
  //   }
  // };
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
      <h1 className={styles.title}>Subscription</h1>
      <Form
        addForm={addForm}
        addItem={addItem}
        members={members}
        classes={classes}
        onClose={() => setAddForm(false)}
      />
      <div className={styles.containerContent}>
        <Table className={subscriptions.table} data={subscriptions} />
      </div>
      <button
        className={styles.btnCreate}
        onClick={() => {
          addForm ? setAddForm(false) : setAddForm(true);
        }}
      >
        + Add New
      </button>
      <div>
        {createModal ? <CreateModal onClose={() => setCreateModal(false)} /> : <div></div>}
        {errorModal ? <ErrorModal onClose={() => setErrorModal(false)} /> : <div></div>}
      </div>
    </section>
  );
};
export default Subscriptions;