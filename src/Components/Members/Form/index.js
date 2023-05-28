import React, { useState } from 'react';
import styles from './form.module.css';

const memberModal = ({ openAdd, onClose, addMember }) => {
  if (!openAdd) return null;

  const [name, setName] = useState('');
  const [lastName, setLastname] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [dob, setDob] = useState('');
  const [zip, setZip] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [membership, setMembership] = useState('');
  const [password, setPassword] = useState('');

  if (openAdd) {
    const onSubmit = (e) => {
      e.preventDefault();

      addMember({
        name,
        lastName,
        dni,
        phone,
        email,
        city,
        dob,
        zip,
        isActive,
        membership,
        password
      });

      setName('');
      setLastname('');
      setDni('');
      setPhone('');
      setEmail('');
      setCity('');
      setDob('');
      setZip('');
      setIsActive('');
      setMembership('');
      setPassword('');
    };
    return (
      <div className={styles.form_modal} onSubmit={onSubmit}>
        <div className={styles.modal_content}>
          <div className={styles.modal_header}>
            <h2>Create a new member</h2>
            <span className={styles.close_button} onClick={onClose}>
              &times;
            </span>
          </div>
          <form className={styles.modal_body}>
            <div className={styles.label_container}>
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className={styles.label_container}>
              <label>LastName</label>
              <input type="text" value={lastName} onChange={(e) => setLastname(e.target.value)} />
            </div>
            <div className={styles.label_container}>
              <label>DNI</label>
              <input type="number" value={dni} onChange={(e) => setDni(e.target.value)} />
            </div>
            <div className={styles.label_container}>
              <label>Phone</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className={styles.label_container}>
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles.label_container}>
              <label>City</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className={styles.label_container}>
              <label>Date of birth</label>
              <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>
            <div className={styles.label_container}>
              <label>Zip Code</label>
              <input type="number" value={zip} onChange={(e) => setZip(e.target.value)} />
            </div>
            <div className={styles.label_container}>
              <label>Membership</label>
              <input
                type="text"
                value={membership}
                onChange={(e) => setMembership(e.target.value)}
              />
            </div>
            <div className={styles.label_container}>
              <label>Password</label>
              <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={styles.label_container}>
              <label>Is member active?</label>
              <input
                type="checkbox"
                value={isActive}
                onChange={(e) => setIsActive(e.currentTarget.checked)}
              />
            </div>
            <input className={styles.save_input} type="submit" value="Add Member" />
          </form>
        </div>
      </div>
    );
  }
};

export default memberModal;
