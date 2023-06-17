import styles from './profile.module.css';
import Button from '../../Shared/Button';
import { Input } from '../../Shared/Inputs';
import ConfirmModal from '../../Shared/ConfirmModal';
import ResponseModal from '../../Shared/ResponseModal';
import { updateMember } from '../../../Redux/Members/thunks';
import { handleDisplayToast } from '../../../Redux/Shared/ResponseToast/actions';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AdminProfile() {
  useEffect(() => {
    setDisplayUpdate(true);
  }, []);
  const dispatch = useDispatch();

  const [displayUpdate, setDisplayUpdate] = useState(true);
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const { show, message, state } = useSelector((state) => state.toast);

  const [member, setMember] = useState({
    id: '123',
    name: 'Manny',
    lastName: 'Popocho',
    dni: '41602875',
    phone: '3413742102',
    email: 'manny69@gmail.com',
    city: 'Rosario',
    dob: '13/12/2013',
    zip: '2102',
    membership: 'Black',
    password: 'cucucacainsahno'
  });

  const onChangeInput = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
      isActive: e.currentTarget.checked
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setDisplayUpdate(true);
    updateMember(dispatch, member.id, member);
    setModalMessageOpen(false);
  };

  return (
    <div className={styles.form}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Profile information</h2>
          <Button
            classNameButton="addButton"
            action={() => setDisplayUpdate(false)}
            img={`${process.env.PUBLIC_URL}/assets/images/edit-icon.png`}
          />
        </div>
        <form className={styles.body}>
          <div className={styles.label_container}>
            <Input
              labelText="Name"
              type="text"
              name="name"
              value={member.name}
              change={onChangeInput}
              disabled={displayUpdate}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="LastName"
              type="text"
              name="lastName"
              value={member.lastName}
              change={onChangeInput}
              disabled={displayUpdate}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="DNI"
              type="number"
              name="dni"
              value={member.dni}
              change={onChangeInput}
              disabled={displayUpdate}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Phone"
              type="text"
              name="phone"
              value={member.phone}
              change={onChangeInput}
              disabled={displayUpdate}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Email"
              type="email"
              name="email"
              value={member.email}
              change={onChangeInput}
              disabled={displayUpdate}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="City"
              type="text"
              name="city"
              value={member.city}
              change={onChangeInput}
              disabled={displayUpdate}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Date of birth"
              type="text"
              name="dob"
              value={member.dob}
              change={onChangeInput}
              disabled={displayUpdate}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Zip code"
              type="number"
              name="zip"
              value={member.zip}
              change={onChangeInput}
              disabled={displayUpdate}
            />
          </div>
          <div className={styles.label_container}>
            <label className={styles.label}>Membership</label>
            <select
              className={styles.input}
              name="membership"
              value={member.membership}
              onChange={onChangeInput}
              disabled={displayUpdate}
            >
              <option value="placeholder">Select category</option>
              <option value="classic">Classic</option>
              <option value="only_classes">Only Classes</option>
              <option value="black">Black</option>
            </select>
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Password"
              type="password"
              name="password"
              value={member.password}
              change={onChangeInput}
              disabled={displayUpdate}
            />
          </div>
        </form>
        <div className={styles.confirm_button}>
          <Button
            classNameButton="addButton"
            action={() => setModalMessageOpen(true)}
            disabled={displayUpdate}
            text={'Update'}
          />
        </div>
      </div>
      {modalMessageOpen && (
        <ConfirmModal
          title={'Update your information'}
          handler={() => setModalMessageOpen(false)}
          onAction={onSubmit}
          reason={'submit'}
        >
          Are you sure you want to update your information?
        </ConfirmModal>
      )}
      {show && (
        <ResponseModal
          handler={() => dispatch(handleDisplayToast(false))}
          state={state}
          message={message}
        />
      )}
    </div>
  );
}
export default AdminProfile;
