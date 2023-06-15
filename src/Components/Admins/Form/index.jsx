import styles from './form.module.css';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import Button from '../../Shared/Button';
import ConfirmModal from '../../Shared/ConfirmModal';
import ResponseModal from '../../Shared/ResponseModal';
import { Input } from '../../Shared/Inputs';
import { addAdmin, getAdminsById, editAdmin } from '../../../Redux/Admins/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { handleDisplayToast } from '../../../Redux/Shared/ResponseToast/actions';
import { resetState } from '../../../Redux/Admins/actions';

function Form() {
  const dispatch = useDispatch();
  const adminToUpdate = useSelector((state) => state.admins.data);
  const params = useParams();
  const history = useHistory();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { show, message, state } = useSelector((state) => state.toast);
  const success = useSelector((state) => state.admins.success);
  const [admin, setAdmin] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    password: ''
  });

  useEffect(() => {
    if (params.id) {
      getAdminsById(dispatch, params.id);
    }
  }, []);

  useEffect(() => {
    setAdmin({
      firstName: adminToUpdate.firstName,
      lastName: adminToUpdate.lastName,
      dni: adminToUpdate.dni,
      phone: adminToUpdate.phone,
      email: adminToUpdate.email,
      city: adminToUpdate.city,
      password: adminToUpdate.password
    });
  }, [adminToUpdate]);

  useEffect(() => {
    if (success) {
      history.push('/admins');
      dispatch(resetState());
    }
  }, [success]);

  const onChangeInput = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      editAdmin(dispatch, params.id, admin);
    } else {
      addAdmin(dispatch, admin);
    }
  };

  const handleButton = () => {
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const closeResponseModal = () => {
    dispatch(handleDisplayToast(false));
  };

  const handleSubmit = (e) => {
    onSubmit(e);
    setShowConfirmModal(false);
  };

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>{params.id ? 'Edit Admin' : 'Add admin'}</h2>
        </div>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.labelInput}>
            <Input
              labelText="First Name"
              name="firstName"
              type="text"
              value={admin.firstName}
              change={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="Last Name"
              name="lastName"
              type="text"
              value={admin.lastName}
              change={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="DNI"
              name="dni"
              type="text"
              value={admin.dni}
              change={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="Phone"
              name="phone"
              type="text"
              value={admin.phone}
              change={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="City"
              name="city"
              type="text"
              value={admin.city}
              change={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="Email"
              name="email"
              type="text"
              value={admin.email}
              change={onChangeInput}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="Password"
              name="password"
              type="password"
              value={admin.password}
              change={onChangeInput}
            />
          </div>
        </form>
        <div className={styles.buttonContainer}>
          <div>
            <Link to="/admins">
              <Button
                action={() => dispatch(resetState())}
                classNameButton="cancelButton"
                text="Cancel"
              ></Button>
            </Link>
          </div>
          <div>
            <Button action={handleButton} classNameButton="submitButton" text="Submit"></Button>
          </div>
        </div>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          handler={() => closeConfirmModal()}
          title={params.id ? 'Update Admin' : 'Add admin'}
          reason="submit"
          onAction={handleSubmit}
        >
          Are you sure you want to {params.id ? 'update' : 'add'} admin?
        </ConfirmModal>
      )}
      {show && (
        <ResponseModal handler={() => closeResponseModal()} state={state} message={message} />
      )}
    </>
  );
}

export default Form;
