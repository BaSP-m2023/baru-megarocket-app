import styles from 'Components/Admins/Profile/profile.module.css';
import Loader from 'Components/Shared/Loader';
import Button from 'Components/Shared/Button';
import { Input } from 'Components/Shared/Inputs';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ResponseModal from 'Components/Shared/ResponseModal';
import { getAdmins, editAdmin, deleteAdmin } from 'Redux/Admins/thunks';
import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//import { resetState } from '../../../Redux/Admins/actions';
import { useForm } from 'react-hook-form';
import adminSchema from '../../../Validations/admin';
import { joiResolver } from '@hookform/resolvers/joi';

function AdminProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [disableEdit, setDisableEdit] = useState(true);
  const [action, setAction] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { show, message, state } = useSelector((state) => state.toast);
  const loading = useSelector((state) => state.admins.isPending);
  const defaultAdmin = useSelector((state) => state.admins.defaultAdmin);
  const [admin, setAdmin] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(adminSchema),
    defaultValues: {
      firstName: defaultAdmin.firstName,
      lastName: defaultAdmin.lastName,
      dni: defaultAdmin.dni,
      phone: defaultAdmin.phone,
      email: defaultAdmin.email,
      city: defaultAdmin.city,
      password: defaultAdmin.password
    }
  });

  useEffect(() => {
    getAdmins(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setAdmin(defaultAdmin);
  }, [defaultAdmin]);

  useEffect(() => {
    setValue('firstName', admin.firstName);
    setValue('lastName', admin.lastName);
    setValue('dni', admin.dni);
    setValue('phone', admin.phone);
    setValue('email', admin.email);
    setValue('city', admin.city);
    setValue('password', admin.password);
  }, [admin]);

  // const onChangeInput = (e) => {
  //   setAdmin({
  //     ...admin,
  //     [e.target.name]: e.target.value
  //   });
  // };

  const onSubmit = (data) => {
    editAdmin(dispatch, defaultAdmin._id, data);
    setShowConfirmModal(false);
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const adminInfo = {
  //     firstName: admin.firstName || '',
  //     lastName: admin.lastName || '',
  //     dni: admin.dni || '',
  //     phone: admin.phone || '',
  //     email: admin.email || '',
  //     city: admin.city || '',
  //     password: admin.password || ''
  //   };
  //   editAdmin(dispatch, admin._id, adminInfo);
  //   setShowConfirmModal(false);
  // };

  const handleDeleteAdmin = () => {
    deleteAdmin(dispatch, admin._id);
    setShowConfirmModal(false);
    history.push('/');
  };

  const handleAction = (action) => {
    setShowConfirmModal(true);
    setAction(action);
  };

  const handleClose = () => {
    setDisableEdit(true);
    setAdmin(defaultAdmin);
  };

  return (
    <div className={styles.form}>
      {defaultAdmin == {} && <p>There are no admins</p>}
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Profile information</h2>
          {disableEdit && (
            <Button
              classNameButton="addButton"
              action={() => setDisableEdit(false)}
              img={`${process.env.PUBLIC_URL}/assets/images/edit-icon-white.png`}
            />
          )}
          {!disableEdit && (
            <button className={styles.close} onClick={() => handleClose()}>
              X
            </button>
          )}
        </div>
        {loading && <Loader />}
        {!loading && (
          <form className={styles.body}>
            <div className={styles.label_container}>
              <Input
                labelText="First Name"
                name="firstName"
                type="text"
                error={errors.firstName?.message}
                register={register}
                disabled={disableEdit}
              />
              {/* <Input
                labelText="First name"
                type="text"
                name="firstName"
                value={admin.firstName || ''}
                change={onChangeInput}
                disabled={disableEdit}
              /> */}
            </div>
            <div className={styles.label_container}>
              <Input
                labelText="Last Name"
                name="lastName"
                type="text"
                error={errors.lastName?.message}
                register={register}
                disabled={disableEdit}
              />
              {/* <Input
                labelText="Last name"
                type="text"
                name="lastName"
                value={admin.lastName || ''}
                change={onChangeInput}
                disabled={disableEdit}
              /> */}
            </div>
            <div className={styles.label_container}>
              <Input
                labelText="DNI"
                name="dni"
                type="text"
                error={errors.dni?.message}
                register={register}
                disabled={disableEdit}
              />
              {/* <Input
                labelText="DNI"
                type="number"
                name="dni"
                value={admin.dni || ''}
                change={onChangeInput}
                disabled={disableEdit}
              /> */}
            </div>
            <div className={styles.label_container}>
              <Input
                labelText="Phone"
                name="phone"
                type="text"
                error={errors.phone?.message}
                register={register}
                disabled={disableEdit}
              />
              {/* <Input
                labelText="Phone"
                type="text"
                name="phone"
                value={admin.phone || ''}
                change={onChangeInput}
                disabled={disableEdit}
              /> */}
            </div>
            <div className={styles.label_container}>
              <Input
                labelText="Email"
                name="email"
                type="text"
                error={errors.email?.message}
                register={register}
                disabled={disableEdit}
              />
              {/* <Input
                labelText="Email"
                type="email"
                name="email"
                value={admin.email || ''}
                change={onChangeInput}
                disabled={disableEdit}
              /> */}
            </div>
            <div className={styles.label_container}>
              <Input
                labelText="City"
                name="city"
                type="text"
                error={errors.city?.message}
                register={register}
                disabled={disableEdit}
              />
              {/* <Input
                labelText="City"
                type="text"
                name="city"
                value={admin.city || ''}
                change={onChangeInput}
                disabled={disableEdit}
              /> */}
            </div>
            <div className={styles.label_container}>
              <Input
                labelText="Password"
                name="password"
                type="password"
                error={errors.password?.message}
                register={register}
                disabled={disableEdit}
              />
              {/* <Input
                labelText="Password"
                type="password"
                name="password"
                value={admin.password || ''}
                change={onChangeInput}
                disabled={disableEdit}
              /> */}
            </div>
          </form>
        )}
        <div className={styles.confirm_button}>
          <Button
            action={() => handleAction('delete')}
            classNameButton="deleteButton"
            text="Delete account"
          ></Button>

          {/* <Button
            classNameButton="deleteButton"
            action={() => handleAction('delete')}
            text={'Delete my account'}
          /> */}
          <Button
            action={() => handleAction('edit')}
            classNameButton="addButton"
            text="Edit"
          ></Button>
          {/* <Button
            classNameButton="addButton"
            action={() => handleAction('edit')}
            disabled={disableEdit}
            text={'Edit'}
          /> */}
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
          onAction={() => {
            if (action === 'delete') {
              handleSubmit(handleDeleteAdmin);
            } else if (action === 'edit') {
              handleSubmit(onSubmit);
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
