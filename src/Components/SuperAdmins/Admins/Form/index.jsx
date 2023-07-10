import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './form.module.css';

import { resetState } from 'Redux/Admins/actions';
import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';
import { addAdmin, getAdminsById, editAdmin } from 'Redux/Admins/thunks';
import adminSchema from 'Validations/admin';
import adminUpdate from 'Validations/adminUpdate';

import { Input } from 'Components/Shared/Inputs';
import { Button, Reset } from 'Components/Shared/Button';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ResponseModal from 'Components/Shared/ResponseModal';

function AdminsForm() {
  const dispatch = useDispatch();
  const adminToUpdate = useSelector((state) => state.admins.data);
  const redirect = useSelector((state) => state.admins.redirect);
  const params = useParams();
  const history = useHistory();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { show, message, state } = useSelector((state) => state.toast);
  const success = useSelector((state) => state.admins.success);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = !params.id
    ? useForm({
        mode: 'onChange',
        resolver: joiResolver(adminSchema)
      })
    : useForm({
        mode: 'onChange',
        resolver: joiResolver(adminUpdate)
      });

  const handleReset = () => {
    const defaultValues = !params.id
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
    if (params.id) {
      dispatch(getAdminsById(params.id));
    }
  }, []);

  useEffect(() => {
    if (params.id) {
      setValue('firstName', adminToUpdate.firstName);
      setValue('lastName', adminToUpdate.lastName);
      setValue('dni', adminToUpdate.dni);
      setValue('phone', adminToUpdate.phone);
      setValue('city', adminToUpdate.city);
    }
  }, [adminToUpdate]);

  useEffect(() => {
    if (success) {
      history.push('/user/super-admin/admins');
      dispatch(resetState());
    }
  }, [success]);

  const onSubmit = (data) => {
    if (params.id) {
      dispatch(editAdmin(params.id, data));
      setShowConfirmModal(false);
    } else {
      dispatch(addAdmin(data));
      setShowConfirmModal(false);
    }
  };

  useEffect(() => {
    if (redirect) {
      history.push('/user/super-admin/admins');
    }
  }, [redirect]);

  const handleButton = () => {
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const closeResponseModal = () => {
    dispatch(handleDisplayToast(false));
  };

  const formFields = [
    { labelText: 'First name', name: 'firstName', type: 'text' },
    { labelText: 'Last name', name: 'lastName', type: 'text' },
    { labelText: 'DNI', name: 'dni', type: 'text' },
    { labelText: 'Phone', name: 'phone', type: 'text' },
    { labelText: 'City', name: 'city', type: 'text' }
  ];

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.formTitle} data-testid="admins-form-title-container">
          <h2>{params.id ? 'Edit Admin' : 'Add admin'}</h2>
          <span className={styles.closeButton} onClick={() => history.goBack()}>
            &times;
          </span>
        </div>
        <div className={styles.content}>
          <form className={styles.form} data-testid="admins-form-container">
            {formFields.map((field) => (
              <div className={styles.formGroup} key={field.name}>
                <Input
                  labelText={field.labelText}
                  name={field.name}
                  type={field.type}
                  register={register}
                  error={errors[field.name]?.message}
                />
              </div>
            ))}
            {!params.id && (
              <>
                <div className={styles.formGroup}>
                  <Input
                    labelText="Email"
                    name="email"
                    type="email"
                    register={register}
                    error={errors.email?.message}
                  />
                </div>
                <div className={styles.formGroup}>
                  <Input
                    labelText="Password"
                    name="password"
                    type="password"
                    register={register}
                    error={errors.password?.message}
                  />
                </div>
              </>
            )}
          </form>
          <div className={styles.formButtons}>
            <Button action={reset} text="Reset" classNameButton="deleteButton" />
            <Link to="/user/super-admin/admins">
              <Button
                action={() => dispatch(resetState())}
                classNameButton="cancelButton"
                text="Cancel"
              ></Button>
            </Link>
            <Button
              action={handleSubmit(handleButton)}
              classNameButton="submitButton"
              text="Submit"
            />
          </div>
        </div>
        <Reset action={handleReset} />
      </div>
      {showConfirmModal && (
        <ConfirmModal
          handler={() => closeConfirmModal()}
          title={params.id ? 'Update Admin' : 'Add admin'}
          reason="submit"
          onAction={handleSubmit(onSubmit)}
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

export default AdminsForm;
