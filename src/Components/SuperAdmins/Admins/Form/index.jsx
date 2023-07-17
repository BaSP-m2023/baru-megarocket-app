import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './form.module.css';

import { resetState } from 'Redux/Admins/actions';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import { addAdmin, getAdmins, editAdmin } from 'Redux/Admins/thunks';
import adminSchema from 'Validations/admin';
import adminUpdate from 'Validations/adminUpdate';

import { Input } from 'Components/Shared/Inputs';
import { Button, Reset } from 'Components/Shared/Button';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ResponseModal from 'Components/Shared/ResponseModal';

function AdminsForm({ match }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const adminId = match.params.id;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [updated, setUpdated] = useState(false);
  const { show, message, state } = useSelector((state) => state.toast);
  const success = useSelector((state) => state.admins.success);
  const { data: admins } = useSelector((state) => state.admins);
  const { dark } = useSelector((state) => state.darkmode);
  const adminToUpdate = admins.find((ad) => ad._id === adminId);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = !adminId
    ? useForm({
        mode: 'onChange',
        resolver: joiResolver(adminSchema)
      })
    : useForm({
        mode: 'onChange',
        resolver: joiResolver(adminUpdate)
      });

  const handleReset = () => {
    const defaultValues = !adminId
      ? {
          firstName: '',
          lastName: '',
          dni: '',
          phone: '',
          city: '',
          email: '',
          password: ''
        }
      : {
          firstName: adminToUpdate ? adminToUpdate.firstName : '',
          lastName: adminToUpdate ? adminToUpdate.lastName : '',
          dni: adminToUpdate ? adminToUpdate.dni : '',
          phone: adminToUpdate ? adminToUpdate.phone : '',
          city: adminToUpdate ? adminToUpdate.city : ''
        };

    reset(defaultValues);
  };

  useEffect(() => {
    if (adminId) {
      dispatch(getAdmins()).then((data) => {
        const admin = data.find((item) => item._id === adminId);
        // eslint-disable-next-line no-unused-vars
        const { _id, firebaseUid, email, __v, createdAt, updatedAt, ...resAdmin } = admin;
        Object.entries(resAdmin).every(([key, value]) => {
          setValue(key, value);
          return true;
        });
      });
    }
  }, []);

  useEffect(() => {
    if (success) {
      history.push('/user/super-admin/admins');
      dispatch(resetState());
    }
  }, [success]);

  useEffect(() => {
    if (adminToUpdate) {
      const adminUpdated = admins && admins?.find((ad) => ad._id === adminToUpdate._id);
      setValue('firstName', adminUpdated ? adminUpdated.firstName : adminToUpdate.firstName);
      setValue('lastName', adminUpdated ? adminUpdated.lastName : adminToUpdate.lastName);
      setValue('dni', adminUpdated ? adminUpdated.dni : adminToUpdate.dni);
      setValue('phone', adminUpdated ? adminUpdated.phone : adminToUpdate.phone);
      setValue('city', adminUpdated ? adminUpdated.city : adminToUpdate.city);
    }
  }, [updated, adminToUpdate]);

  const onSubmit = (data) => {
    if (adminId) {
      setShowConfirmModal(false);
      dispatch(editAdmin(adminId, data))
        .then(() => {
          resetData();
          setUpdated(!updated);
        })
        .catch((error) => {
          dispatch(setContentToast({ message: error.message, state: 'fail' }));
          dispatch(handleDisplayToast(true));
        });
    } else {
      dispatch(addAdmin(data));
      setShowConfirmModal(false);
    }
  };

  const resetData = () => {
    reset();
    if (adminToUpdate) {
      // eslint-disable-next-line no-unused-vars
      const { _id, firebaseUid, email, __v, updatedAt, createdAt, ...resAdminUpdate } =
        adminToUpdate;
      Object.entries(resAdminUpdate).every(([key, value]) => {
        setValue(key, value);
        return true;
      });
    }
  };

  const onConfirm = () => {
    setShowConfirmModal(true);
  };

  const closeResponseModal = () => {
    dispatch(handleDisplayToast(false));
  };

  const firstFormFieldsUpdate = [
    { labelText: 'First Name', name: 'firstName', type: 'text' },
    { labelText: 'Last Name', name: 'lastName', type: 'text' },
    { labelText: 'DNI', name: 'dni', type: 'text' }
  ];

  const secondFormFieldsUpdate = [
    { labelText: 'Phone', name: 'phone', type: 'text' },
    { labelText: 'City', name: 'city', type: 'text' }
  ];

  const firstFormFieldsCreate = [
    { labelText: 'First Name', name: 'firstName', type: 'text' },
    { labelText: 'Last Name', name: 'lastName', type: 'text' },
    { labelText: 'DNI', name: 'dni', type: 'text' },
    { labelText: 'Phone', name: 'phone', type: 'text' }
  ];

  const secondFormFieldsCreate = [
    { labelText: 'City', name: 'city', type: 'text' },
    { labelText: 'Email', name: 'email', type: 'email' },
    { labelText: 'Password', name: 'password', type: 'password' }
  ];

  return (
    <>
      <div className={!dark ? styles.formContainer : styles.darkFormContainer}>
        <div className={styles.formTitle} data-testid="admins-form-title-container">
          <h2 className={styles.title}>{adminId ? 'Edit Admin' : 'Add admin'}</h2>
          <span className={styles.closeButton} onClick={history.goBack}>
            &times;
          </span>
        </div>
        <div className={styles.content}>
          <div className={styles.formTitle} data-testid="admins-form-title-container">
            <h2 className={styles.title}>{adminId ? 'Edit Admin' : 'Add admin'}</h2>
            <span className={styles.closeButton} onClick={history.goBack}>
              &times;
            </span>
          </div>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onConfirm)}
            data-testid="admins-form-container"
          >
            <div>
              {adminId && (
                <div className={styles.inputContainer}>
                  <div>
                    {firstFormFieldsUpdate.map((field) => (
                      <div key={field.name} className={styles.fieldContainer}>
                        <Input
                          labelText={field.labelText}
                          name={field.name}
                          type={field.type}
                          register={register}
                          error={errors[field.name]?.message}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    {secondFormFieldsUpdate.map((field) => (
                      <div key={field.name} className={styles.fieldContainer}>
                        <Input
                          labelText={field.labelText}
                          name={field.name}
                          type={field.type}
                          register={register}
                          error={errors[field.name]?.message}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {!adminId && (
              <div className={styles.inputContainer}>
                <div>
                  {firstFormFieldsCreate.map((field) => (
                    <div key={field.name} className={styles.fieldContainer}>
                      <Input
                        labelText={field.labelText}
                        name={field.name}
                        type={field.type}
                        register={register}
                        error={errors[field.name]?.message}
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.inputForm}>
                  {secondFormFieldsCreate.map((field) => (
                    <div key={field.name} className={styles.fieldContainer}>
                      <Input
                        labelText={field.labelText}
                        name={field.name}
                        type={field.type}
                        register={register}
                        error={errors[field.name]?.message}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.formButtons} data-testid="admin-form-buttons">
              <div>
                <Link to="/user/super-admin/admins">
                  <Button
                    action={() => dispatch(resetState())}
                    classNameButton="cancelButton"
                    text="Cancel"
                  ></Button>
                </Link>
              </div>
              <div>
                <Button text={'Confirm'} action={onConfirm} classNameButton="submitButton" />
              </div>
            </div>
            <div className={styles.resetContainer}>
              <Reset action={handleReset} />
            </div>
          </form>
        </div>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          handler={() => setShowConfirmModal(false)}
          title={adminId ? 'Update Admin' : 'Add admin'}
          reason="submit"
          onAction={handleSubmit(onSubmit)}
        >
          Are you sure you want to {adminId ? 'update' : 'add'} admin?
        </ConfirmModal>
      )}
      {show && (
        <ResponseModal handler={() => closeResponseModal()} state={state} message={message} />
      )}
    </>
  );
}

export default AdminsForm;
