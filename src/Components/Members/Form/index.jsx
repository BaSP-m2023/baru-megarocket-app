import React, { useEffect, useState } from 'react';
import styles from './form.module.css';

const memberModal = ({ modalOpen, onClose, addMember, data, memberId, updMember }) => {
  if (!modalOpen) return null;

  const [member, setMember] = useState({
    name: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    dob: '',
    zip: '',
    isActive: false,
    membership: '',
    password: ''
  });

  useEffect(() => {
    if (memberId !== null) {
      let editMember = data.filter((member) => {
        return member._id === memberId;
      });
      editMember = editMember[0];
      const newEdit = {
        name: editMember.name,
        lastName: editMember.lastName,
        dni: editMember.dni,
        phone: editMember.phone,
        email: editMember.email,
        city: editMember.city,
        dob: editMember.dob,
        zip: editMember.zip,
        isActive: false,
        membership: editMember.membership,
        password: editMember.password
      };
      setMember(newEdit);
      editMember = null;
      memberId = null;
    }
  }, []);

  const onChangeInput = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
      isActive: e.target.checked
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (memberId) {
      updMember(memberId, member);
    } else {
      addMember(member);
      setMember({
        name: '',
        lastName: '',
        dni: '',
        phone: '',
        email: '',
        city: '',
        dob: '',
        zip: '',
        isActive: false,
        membership: '',
        password: ''
      });
    }
  };
  return (
    <div className={styles.form_modal} onSubmit={onSubmit}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h2>{memberId ? 'Edit a member' : 'Create a new member'}</h2>
          <span className={styles.close_button} onClick={onClose}>
            &times;
          </span>
        </div>
        <form className={styles.modal_body}>
          <div className={styles.label_container}>
            <label>Name</label>
            <input type="text" name="name" value={member.name} onChange={onChangeInput} />
          </div>
          <div className={styles.label_container}>
            <label>LastName</label>
            <input type="text" name="lastName" value={member.lastName} onChange={onChangeInput} />
          </div>
          <div className={styles.label_container}>
            <label>DNI</label>
            <input type="number" name="dni" value={member.dni} onChange={onChangeInput} />
          </div>
          <div className={styles.label_container}>
            <label>Phone</label>
            <input type="text" name="phone" value={member.phone} onChange={onChangeInput} />
          </div>
          <div className={styles.label_container}>
            <label>Email</label>
            <input type="email" name="email" value={member.email} onChange={onChangeInput} />
          </div>
          <div className={styles.label_container}>
            <label>City</label>
            <input type="text" name="city" value={member.city} onChange={onChangeInput} />
          </div>
          <div className={styles.label_container}>
            <label>Date of birth</label>
            <input type="text" name="dob" value={member.dob} onChange={onChangeInput} />
          </div>
          <div className={styles.label_container}>
            <label>Zip Code</label>
            <input type="number" name="zip" value={member.zip} onChange={onChangeInput} />
          </div>
          <div className={styles.label_container}>
            <label>Membership</label>
            <select name="membership" value={member.membership} onChange={onChangeInput}>
              <option value="placeholder">Select category</option>
              <option value="classic">Classic</option>
              <option value="only_classes">Only Classes</option>
              <option value="black">Black</option>
            </select>
          </div>
          <div className={styles.label_container}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={member.password}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.label_container}>
            <label>Is member active?</label>
            <input
              type="checkbox"
              name="isActive"
              value={member.isActive}
              onChange={onChangeInput}
            />
          </div>
          <button className={styles.save_input} type="submit">
            {memberId ? 'Update' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default memberModal;
