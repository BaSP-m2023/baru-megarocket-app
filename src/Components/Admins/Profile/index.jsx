import styles from './profile.module.css';
import Loader from 'Components/Shared/Loader';
import Button from '../../Shared/Button';
import { Input } from '../../Shared/Inputs';
import ConfirmModal from '../../Shared/ConfirmModal';
import ResponseModal from '../../Shared/ResponseModal';
import { getAdminsById, editAdmin, deleteAdmin } from '../../../Redux/Admins/thunks';
import { handleDisplayToast } from '../../../Redux/Shared/ResponseToast/actions';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AdminProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [disableEdit, setDisableEdit] = useState(true);
  const [action, setAction] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { show, message, state } = useSelector((state) => state.toast);
  const loading = useSelector((state) => state.admins.isPending);
  const myadmin = useSelector((state) => state.admins.data);
  const [admin, setAdmin] = useState(myadmin);

  const id = '64879731d981ecbc196e83b5';
  useEffect(() => {
    getAdminsById(dispatch, id);
    setAdmin(myadmin);
  }, []);

  useEffect(() => {
    setAdmin({
      firstName: myadmin.firstName,
      lastName: myadmin.lastName,
      dni: myadmin.dni,
      phone: myadmin.phone,
      email: myadmin.email,
      city: myadmin.city,
      password: myadmin.password
    });
  }, [myadmin, loading]);

  const onChangeInput = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setDisableEdit(true);
    editAdmin(dispatch, id, admin);
    setShowConfirmModal(false);
  };

  const handleDeleteAdmin = () => {
    deleteAdmin(dispatch, id);
    setShowConfirmModal(false);
    history.push('/');
  };

  const handleAction = (action) => {
    setShowConfirmModal(true);
    setAction(action);
  };

  return (
    <div className={styles.form}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Profile information</h2>
          <Button
            classNameButton="addButton"
            action={() => setDisableEdit(false)}
            img={`${process.env.PUBLIC_URL}/assets/images/edit-icon-white.png`}
          />
        </div>
        {loading && <Loader />}
        {!loading && (
          <form className={styles.body}>
            <div className={styles.label_container}>
              <Input
                labelText="First name"
                type="text"
                name="firstName"
                value={admin.firstName}
                change={onChangeInput}
                disabled={disableEdit}
              />
            </div>
            <div className={styles.label_container}>
              <Input
                labelText="Last name"
                type="text"
                name="lastName"
                value={admin.lastName}
                change={onChangeInput}
                disabled={disableEdit}
              />
            </div>
            <div className={styles.label_container}>
              <Input
                labelText="DNI"
                type="number"
                name="dni"
                value={admin.dni}
                change={onChangeInput}
                disabled={disableEdit}
              />
            </div>
            <div className={styles.label_container}>
              <Input
                labelText="Phone"
                type="text"
                name="phone"
                value={admin.phone}
                change={onChangeInput}
                disabled={disableEdit}
              />
            </div>
            <div className={styles.label_container}>
              <Input
                labelText="Email"
                type="email"
                name="email"
                value={admin.email}
                change={onChangeInput}
                disabled={disableEdit}
              />
            </div>
            <div className={styles.label_container}>
              <Input
                labelText="City"
                type="text"
                name="city"
                value={admin.city}
                change={onChangeInput}
                disabled={disableEdit}
              />
            </div>
            <div className={styles.label_container}>
              <Input
                labelText="Password"
                type="password"
                name="password"
                value={admin.password}
                change={onChangeInput}
                disabled={disableEdit}
              />
            </div>
          </form>
        )}
        <div className={styles.confirm_button}>
          <Button
            classNameButton="deleteButton"
            action={() => handleAction('delete')}
            text={'Delete my account'}
          />
          <Button
            classNameButton="addButton"
            action={() => handleAction('edit')}
            disabled={disableEdit}
            text={'Edit'}
          />
        </div>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          handler={() => setShowConfirmModal(false)}
          title={
            action === 'delete'
              ? 'Delete your profile'
              : action === 'edit'
              ? 'Edit your profile'
              : ''
          }
          reason={action === 'delete' ? 'delete' : action === 'edit' ? 'submit' : ''}
          onAction={(e) => {
            if (action === 'delete') {
              handleDeleteAdmin();
            } else if (action === 'edit') {
              onSubmit(e);
            }
          }}
        >
          Are you sure you want to{' '}
          {action === 'delete' ? 'delete' : action === 'edit' ? 'edit' : ''} your profile?
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
