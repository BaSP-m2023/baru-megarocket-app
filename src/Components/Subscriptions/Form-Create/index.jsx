import React, { useState } from 'react';
import styles from './form.module.css';

// eslint-disable-next-line no-unused-vars
const Form = ({ addForm, addItem, members, classes }) => {
  const [subscription, setSubscription] = useState({
    classes: '',
    members: '',
    date: new Date().toUTCString
  });

  const onChangeInput = (e) => {
    setSubscription({
      ...subscription,
      [e.target.name]: e.target.value
    });
  };
  console.log(subscription);

  const onSubmit = (e) => {
    e.preventDefault();
    addItem(subscription);
    setSubscription({
      classes: '',
      members: '',
      date: ''
    });
  };

  console.log(subscription.classes);
  if (addForm) {
    return (
      <>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.container}>
            <h2 className="title">Create a New Subscription</h2>
            <label className={styles.createForm}>Class:</label>
            <select
              className={styles.createForm}
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
              className={styles.createForm}
              id="members"
              name="members"
              value={subscription.members}
              onChange={onChangeInput}
            >
              {members.map((member) => {
                return (
                  <option key={member._id} value={member._id}>
                    {`${member.name} ${member.lastName}`}
                  </option>
                );
              })}
            </select>
            <label className={styles.createForm}>Date</label>
            <input
              className={styles.input}
              name="date"
              type="string"
              value={subscription.date}
              onChange={onChangeInput}
            />
            <button className={styles.btnSubmit} name="ADD" type="submit">
              Submit
            </button>
          </div>
        </form>
      </>
    );
  } else {
    return <div>Create Subscription</div>;
  }
};
export default Form;
