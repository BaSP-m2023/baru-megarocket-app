import React, { useState } from 'react';
import styles from './form.module.css';

// eslint-disable-next-line no-unused-vars
const Form = ({ addForm, addItem, members, classes }) => {
  const [subscription, setSubscription] = useState({
    classes: '',
    members: '',
    date: '2023-05-30T00:00:10.000Z'
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
      date: '2023-05-30T00:00:10.000Z'
    });
  };

  console.log(subscription.classes);
  if (addForm) {
    return (
      <>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.formContainer}>
            <label>Class:</label>
            <select
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
            <div className={styles.formContainer}>
              <label className={styles.label}>Date</label>
              <input
                className={styles.input}
                name="date"
                type="string"
                value={'2023-05-30T00:00:10.000Z'}
                onChange={onChangeInput}
              />
            </div>
            <input name="ADD" type="submit"></input>
          </div>
        </form>
      </>
    );
  } else {
    return <div>Create Subscription</div>;
  }
};
export default Form;
