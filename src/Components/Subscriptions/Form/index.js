import styles from './form.module.css';
import { useState, useEffect, useRef } from 'react';
import { SubscriptionEditedModal, ErrorEdit } from '../Modals/index';

function Form({ subscriptionId }) {
  const [valueClass, setValueClass] = useState('');
  const [valueMember, setValueMember] = useState('');
  const [valueDate, setValueDate] = useState('');
  const [classes, setClasses] = useState([]);
  const [members, setMembers] = useState([]);
  const [dates, setDates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showServerError, setShowServerError] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    fetchClasses();
    fetchMembers();
    fetchSubscription();
    selectRef.current.value = 'opcion2';
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
    const updatedFields = {};

    if (valueClass) {
      updatedFields.classes = valueClass;
    }

    if (valueMember) {
      updatedFields.members = valueMember;
    }

    if (valueDate) {
      updatedFields.date = valueDate;
    }
    const option = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedFields)
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
        <h3>{subscriptionId}</h3>
      </div>
      <form className={styles.editForm} onSubmit={submitForm}>
        <label>Class:</label>
        <select
          ref={selectRef}
          id="classes"
          name="classes"
          onChange={(event) => setValueClass(event.target.value)}
        >
          {classes.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {item.day + ' ' + item.time}
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
              <option key={date._id} value={date.date}>
                {date.date}
              </option>
            );
          })}
        </select>
        <div className={styles.btnSubmit}>
          <button>Submit</button>
        </div>
      </form>
      {showModal ? <SubscriptionEditedModal onClose={closeModal} /> : <div></div>}
      {showServerError ? <ErrorEdit onClose={closeModal} /> : <div></div>}
    </div>
  );
}

export default Form;
