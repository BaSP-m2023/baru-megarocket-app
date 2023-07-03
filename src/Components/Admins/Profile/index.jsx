import styles from 'Components/Admins/Profile/profile.module.css';
import Loader from 'Components/Shared/Loader';
import Button from 'Components/Shared/Button';
import { Input } from 'Components/Shared/Inputs';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ResponseModal from 'Components/Shared/ResponseModal';
import { getAdmins, editAdmin, deleteAdmin } from 'Redux/Admins/thunks';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import adminUpdate from 'Validations/adminUpdate';
import { joiResolver } from '@hookform/resolvers/joi';
import { getAuth } from 'Redux/Auth/thunks';
function AdminProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [disableEdit, setDisableEdit] = useState(true);
  const [action, setAction] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { show, message, state } = useSelector((state) => state.toast);
  const loading = useSelector((state) => state.admins.isPending);
  const defaultAdmin = useSelector((state) => state.auth.user || '');
  const token = sessionStorage.getItem('token');

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(adminUpdate),
    defaultValues: {
      firstName: defaultAdmin.firstName,
      lastName: defaultAdmin.lastName,
      dni: defaultAdmin.dni,
      phone: defaultAdmin.phone,
      city: defaultAdmin.city
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
    setValue('city', defaultAdmin.city);
  }, [defaultAdmin]);

  const onSubmit = (data) => {
    setShowConfirmModal(false);
    editAdmin(dispatch, defaultAdmin._id, data, history)
      .then(() => {
        resetData();
      })
      .catch((error) => {
        dispatch(setContentToast({ message: error.message, state: 'fail' }));
        dispatch(handleDisplayToast(true));
      });
  };

  const resetData = () => {
    dispatch(getAuth(token));
    reset();
    if (defaultAdmin) {
      // eslint-disable-next-line no-unused-vars
      const { _id, firebaseUid, email, __v, ...resAdmin } = defaultAdmin;
      Object.entries(resAdmin).every(([key, value]) => {
        setValue(key, value);
        return true;
      });
    }
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
    setValue('city', defaultAdmin.city);
    clearErrors();
  };
  const formFields = [
    { labelText: 'Name', type: 'text', name: 'firstName' },
    { labelText: 'Last Name', type: 'text', name: 'lastName' },
    { labelText: 'DNI', type: 'number', name: 'dni' },
    { labelText: 'Phone', type: 'text', name: 'phone' },
    { labelText: 'City', type: 'text', name: 'city' }
  ];
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
              <div>
                {formFields.map((inputData, index) => (
                  <div className={styles.label_container} key={index}>
                    <Input
                      labelText={inputData.labelText}
                      type={inputData.type}
                      name={inputData.name}
                      disabled={disableEdit}
                      register={register}
                      error={errors[inputData.name]?.message}
                    />
                  </div>
                ))}
              </div>
            </form>
          )}
          {!disableEdit ? (
            <div className={styles.confirm_button}>
              <Button
                action={() => handleAction('Delete')}
                classNameButton="deleteButton"
                text="Delete account"
              ></Button>
              <Button
                classNameButton="cancelButton"
                action={() => setDisableEdit(true)}
                text="Cancel"
              />
              <Button
                action={() => handleAction('Edit')}
                classNameButton="addButton"
                text="Confirm"
                disabled={disableEdit}
              ></Button>
            </div>
          ) : (
            <div className={styles.confirm_button}>
              <Button
                classNameButton="addButton"
                action={() => setDisableEdit(false)}
                text="Edit"
              />
            </div>
          )}
        </div>
      )}
      {showConfirmModal && (
        <ConfirmModal
          handler={() => setShowConfirmModal(false)}
          title={`${action} Your Profile`}
          reason={action === 'Delete' ? 'delete' : action === 'Edit' ? 'submit' : ''}
          onAction={
            action === 'delete'
              ? handleSubmit(handleDeleteAdmin)
              : action === 'Edit'
              ? handleSubmit(onSubmit)
              : ''
          }
        >
          Are you sure you want to {action} your profile?
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
