import styles from './form.module.css';
import { useState, useEffect } from 'react';
import { SubscriptionEditedModal, ErrorEdit, EmptyEdit } from '../Modals/index';

function Form({ subscriptionId, onClose, onModalClose, updateTable }) {
  const [valueClass, setValueClass] = useState('');
  const [valueMember, setValueMember] = useState('');
  const [valueDate, setValueDate] = useState('');
  const [classes, setClasses] = useState([]);
  const [members, setMembers] = useState([]);
  const [dates, setDates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showServerError, setShowServerError] = useState(false);
  const [showEmptyEditModal, setShowEmptyEditModal] = useState(false);
  const [formEnabled, setFormEnabled] = useState(true);

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
      throw new Error(error);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/member`);
      const data = await response.json();
      setMembers(data.data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchSubscription = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription`);
      const data = await response.json();
      setDates(data.data);
    } catch (error) {
      throw new Error(error);
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
    if (Object.keys(updatedFields).length === 0) {
      setShowEmptyEditModal(true);
      setFormEnabled(true);
      return;
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
        setShowModal(true);
        setFormEnabled(false);
      }
    });
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const closeModal = () => {
    setShowModal(false);
    setShowServerError(false);
    setShowEmptyEditModal(false);
    if (showEmptyEditModal) {
      setFormEnabled(true);
      setShowEmptyEditModal(false);
      return;
    }
    onModalClose();
    updateTable();
  };

  return (
    <div className={styles.container}>
      {formEnabled && (
        <form className={styles.editForm} onSubmit={submitForm}>
          <div className={styles.title}>
            <h2>Edit Subscription</h2>
            <h3>ID: {subscriptionId}</h3>
          </div>
          <label>Class:</label>
          <select
            id="classes"
            name="classes"
            onChange={(event) => setValueClass(event.target.value)}
          >
            <option>Choose an option</option>
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
            <option>Choose an option</option>
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
            <option>Choose an option</option>
            {dates.map((date) => {
              return (
                <option key={date._id} value={date.date}>
                  {formatDate(date.date)}
                </option>
              );
            })}
          </select>
          <div className={styles.btnContainer}>
            <button className={styles.btnCancel} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.btnSubmit}>Submit</button>
          </div>
        </form>
      )}
      {showModal ? <SubscriptionEditedModal onClose={closeModal} /> : <div></div>}
      {showServerError ? <ErrorEdit onClose={closeModal} /> : <div></div>}
      {showEmptyEditModal ? <EmptyEdit onClose={closeModal} /> : <div></div>}
    </div>
  );
}

export default Form;
