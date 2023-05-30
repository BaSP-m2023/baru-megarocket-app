import React, { useState } from 'react';
import styles from './form.module.css';

const Form = ({ addForm, addItem, members, classes, onClose }) => {
  const [subscription, setSubscription] = useState({
    classes: '',
    members: '',
    date: ''
  });

  const onChangeInput = (e) => {
    setSubscription({
      ...subscription,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      const newSubscription = {
        members: subscription.members,
        classes: subscription.classes,
        date: subscription.date
      };
      addItem(newSubscription);
      setSubscription({
        classes: '',
        members: '',
        date: ''
      });
    } catch (error) {
      throw new Error(error);
    }
  };
  console.log(subscription.classes);
  if (addForm) {
    return (
      <>
        <div className={styles.container}>
          <form className={styles.createForm} onSubmit={onSubmit}>
            <h2 className={styles.title}>Add Subscription</h2>
            <label className={styles.createForm}>Class:</label>
            <select
              className={styles.select}
              id="classes"
              name="classes"
              value={subscription.classes}
              onChange={onChangeInput}
            >
              {classes.map((item) => {
                return (
                  <option key={item._id} value={item._id}>
                    {`${item.day} ${item.time}`}
                  </option>
                );
              })}
            </select>
            <label>Member:</label>
            <select
              className={styles.select}
              id="members"
              name="members"
              value={subscription.members}
              onChange={onChangeInput}
            >
              {members.map((member) => {
                return (
                  <option key={member._id} value={member._id}>
                    {`${member.name} ${member.lastName} ${member.email}`}
                  </option>
                );
              })}
            </select>
            <label className={styles.select}>Date</label>
            <input
              className={styles.input}
              name="date"
              type="date"
              value={subscription.date}
              onChange={onChangeInput}
            />
            <div>
              <button onClick={onClose} className={styles.btnClose}>
                Cancel
              </button>
              <button className={styles.btnSubmit} name="ADD" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </>
    );
  } else {
    return <div></div>;
  }
};
export default Form;
