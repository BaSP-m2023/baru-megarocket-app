import React, { useState, useEffect } from 'react';
import styles from './form.module.css';

const Form = ({ add, edit, onUpdate }) => {
  const [trainer, setTrainer] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    password: '',
    salary: ''
  });

  useEffect(() => {
    if (edit) {
      setTrainer({
        ...trainer,
        firstName: edit.firstName,
        lastName: edit.lastName,
        dni: edit.dni,
        phone: edit.phone,
        email: edit.email,
        password: edit.password,
        salary: edit.salary
      });
    }
  }, [edit]);

  const onChangeInput = (e) => {
    setTrainer({
      ...trainer,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      onUpdate(edit._id, trainer);
    } else {
      add(trainer);
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <div className={styles.flex}>
        <label htmlFor="firstName" className={styles.label}>
          First Name
        </label>
        <input
          name="firstName"
          type="text"
          id="firstName"
          value={trainer.firstName}
          onChange={onChangeInput}
          className={styles.input}
        />
      </div>
      <div className={styles.flex}>
        <label htmlFor="lastName" className={styles.label}>
          Last Name
        </label>
        <input
          name="lastName"
          type="text"
          id="lastName"
          value={trainer.lastName}
          onChange={onChangeInput}
          className={styles.input}
        />
      </div>
      <div className={styles.flex}>
        <label htmlFor="dni" className={styles.label}>
          ID
        </label>
        <input
          name="dni"
          type="text"
          id="dni"
          value={trainer.dni}
          onChange={onChangeInput}
          className={styles.input}
        />
      </div>
      <div className={styles.flex}>
        <label htmlFor="phone" className={styles.label}>
          Phone Number
        </label>
        <input
          name="phone"
          type="text"
          id="phone"
          value={trainer.phone}
          onChange={onChangeInput}
          className={styles.input}
        />
      </div>
      <div className={styles.flex}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          name="email"
          type="email"
          id="email"
          value={trainer.email}
          onChange={onChangeInput}
          className={styles.input}
        />
      </div>
      <div className={styles.flex}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          name="password"
          type="password"
          id="password"
          value={trainer.password}
          onChange={onChangeInput}
          className={styles.input}
        />
      </div>
      <div className={styles.flex}>
        <label htmlFor="salary" className={styles.label}>
          Salary
        </label>
        <input
          name="salary"
          type="text"
          id="salary"
          value={trainer.salary}
          onChange={onChangeInput}
          className={styles.input}
        />
      </div>
      <div>
        <button type="submit" className={styles.save}>
          {edit ? 'Update' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default Form;
