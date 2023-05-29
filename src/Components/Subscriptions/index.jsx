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
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState({ error: false, msg: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const addItem = async (newSubscription) => {
    console.log(newSubscription);
    const body = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        classes: newSubscription.classes,
        members: newSubscription.members,
        date: newSubscription.date
      })
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/`, body);
      const data = await response.json();
      console.log(data);
      console.log(body);
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
        setError({ error: false, msg: '' });
      } else {
        setError({ error: true, msg: data.message });
        setErrorModal(true);
      }
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
  const handleCreate = (addForm, setAddForm) => {
    if (addForm) {
      setAddForm(false);
    } else {
      setAddForm(true);
    }
  };

  return (
    <section className={styles.container}>
      <h1>Subscription List</h1>
      <div>
        <Table data={subscriptions} />
      </div>
      <div>
        <button onClick={() => handleCreate(addForm, setAddForm)}>+</button>
        <Form addForm={addForm} addItem={addItem} members={members} classes={classes} />
        {createModal ? <CreateModal onClose={() => setCreateModal(false)} /> : <div></div>}
        {errorModal ? <ErrorModal onClose={() => setErrorModal(false)} /> : <div></div>}
      </div>
    </section>
  );
};
export default Subscriptions;
