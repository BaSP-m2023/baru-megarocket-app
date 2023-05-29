import styles from './form.module.css';
import { useState, useEffect } from 'react';
import Modal from '../Modals/editModal';
import DeleteModal from '../Modals/deleteModal';

function Form({ subscriptionId }) {
  const [valueClass, setValueClass] = useState('');
  const [valueMember, setValueMember] = useState('');
  const [valueDate, setValueDate] = useState('');
  const [classes, setClasses] = useState([]);
  const [members, setMembers] = useState([]);
  const [dates, setDates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showServerError, setShowServerError] = useState(false);

  useEffect(() => {
    fetchClasses();
    fetchMembers();
    fetchSubscription();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/class/search`);
      const data = await response.json();
      setClasses(data.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member`);
      const data = await response.json();
      setMembers(data.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const fetchSubscription = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`);
      const data = await response.json();
      setDates(data.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  function submitForm(event) {
    event.preventDefault();
    const option = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        classes: valueClass,
        members: valueMember,
        date: valueDate
      })
    };

    const id = subscriptionId;
    fetch(`${process.env.REACT_APP_API_URL}/api/subscription/${id}`, option).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        setShowServerError(true);
      } else {
        return response.json() && setShowModal(true);
      }
    });
  }

  const closeModal = () => {
    setShowModal(false);
    setShowServerError(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Edit Subscription</h2>
        <h3>{subscriptionId.subscriptionId}</h3>
      </div>
      <form className={styles.editForm} onSubmit={submitForm}>
        <label>Class:</label>
        <select
          id="classes"
          name="classes"
          value={valueClass}
          onChange={(event) => setValueClass(event.target.value)}
        >
          {classes.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {item._id}
              </option>
            );
          })}
        </select>
        <label>Member:</label>
        <select
          id="members"
          name="members"
          value={valueMember}
          onChange={(event) => setValueMember(event.target.value)}
        >
          {members.map((member) => {
            return (
              <option key={member._id} value={member._id}>
                {`${member.name} ${member.lastName}`}
              </option>
            );
          })}
        </select>
        <label>Date:</label>
        <select
          id="date"
          name="date"
          value={valueDate}
          onChange={(event) => setValueDate(event.target.value)}
        >
          {dates.map((date) => {
            return (
              <option key={date.date} value={date.date}>
                {date.date}
              </option>
            );
          })}
        </select>
        <div className={styles.btnSubmit}>
          <button>Submit</button>
        </div>
      </form>
      <Modal show={showModal} closeModal={closeModal} />
      <DeleteModal
        show={showServerError}
        closeModal={closeModal}
        title="Server Error"
        message="An error has ocurred"
      />
    </div>
  );
}

export default Form;
