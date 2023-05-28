import React, { useState } from 'react';
import styles from './form.module.css';

const AddMemberModal = ({ open, onClose, addMember }) => {
  if (!open) return null;

  const [name, setName] = useState('');
  const [lastName, setLastname] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [status, setStatus] = useState(true);
  const [membership, setMembership] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    addMember({ name, lastName });

    // setName('');
    // setLastname('');
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
            <label>Zip Code</label>
            <input type="number" value={zip} onChange={(e) => setZip(e.target.value)} />
          </div>
          <div className={styles.label_container}>
            <label>Membership</label>
            <input type="text" value={membership} onChange={(e) => setMembership(e.target.value)} />
          </div>
          <div className={styles.label_container}>
            <label>Password</label>
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className={styles.label_container}>
            <label>Status</label>
            <input
              type="checkbox"
              value={status}
              onChange={(e) => setStatus(e.currentTarget.checked)}
            />
          </div>
          <input className={styles.save_input} type="submit" value="Add Member" />
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
