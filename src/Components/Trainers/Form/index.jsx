import React, { useState } from 'react';
import styles from './form.module.css';

const Form = ({ add }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [salary, setSalary] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    add({ firstName, lastName, dni, phone, email, password, salary });
  };

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <div className={styles.flex}>
        <label htmlFor="firstName" className={styles.label}>
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.flex}>
        <label htmlFor="lastName" className={styles.label}>
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.flex}>
        <label htmlFor="dni" className={styles.label}>
          ID
        </label>
        <input
          type="text"
          id="dni"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.flex}>
        <label htmlFor="phone" className={styles.label}>
          Phone Number
        </label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.flex}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.flex}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.flex}>
        <label htmlFor="salary" className={styles.label}>
          Salary
        </label>
        <input
          type="text"
          id="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className={styles.input}
        />
      </div>
      <div>
        <button type="submit" className={styles.save}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
