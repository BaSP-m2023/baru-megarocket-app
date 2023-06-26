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
import { useForm } from 'react-hook-form';
import adminSchema from 'Validations/admin';
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

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
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
    setValue('firstName', defaultAdmin.firstName);
    setValue('lastName', defaultAdmin.lastName);
    setValue('dni', defaultAdmin.dni);
    setValue('phone', defaultAdmin.phone);
    setValue('email', defaultAdmin.email);
    setValue('city', defaultAdmin.city);
    setValue('password', defaultAdmin.password);
  }, [defaultAdmin]);

  const onSubmit = (data) => {
    editAdmin(dispatch, defaultAdmin._id, data);
    setShowConfirmModal(false);
  };

  const handleDeleteAdmin = () => {
    deleteAdmin(dispatch, defaultAdmin._id);
    setShowConfirmModal(false);
    history.push('/');
  };
  const handleAction = (action) => {
    setShowConfirmModal(true);
    setAction(action);
  };

  const handleClose = () => {
    setDisableEdit(true);
    setValue('firstName', defaultAdmin.firstName);
    setValue('lastName', defaultAdmin.lastName);
    setValue('dni', defaultAdmin.dni);
    setValue('phone', defaultAdmin.phone);
    setValue('email', defaultAdmin.email);
    setValue('city', defaultAdmin.city);
    setValue('password', defaultAdmin.password);
    clearErrors();
  };

  return (
    <div className={styles.form}>
      {Object.keys(defaultAdmin).length === 0 && (
        <p className={styles.p}>There are no admins to show</p>
      )}
      {Object.keys(defaultAdmin).length > 0 && (
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>{disableEdit ? 'Profile information' : 'Edit profile'}</h2>
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
          {loading && (
            <div className={styles.loader_container}>
              <Loader />
            </div>
          )}
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
              </div>
            </form>
          )}
          <div className={styles.confirm_button}>
            <Button
              action={() => handleAction('delete')}
              classNameButton="deleteButton"
              text="Delete account"
            ></Button>

            <Button
              action={() => handleAction('edit')}
              classNameButton="addButton"
              text="Edit"
              disabled={disableEdit}
            ></Button>
          </div>
        </div>
      )}
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
          onAction={
            action === 'delete'
              ? handleSubmit(handleDeleteAdmin)
              : action === 'edit'
              ? handleSubmit(onSubmit)
              : ''
          }
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
