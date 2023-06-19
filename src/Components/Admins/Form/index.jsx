import styles from 'Components/Admins/Form/form.module.css';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import Button from 'Components/Shared/Button';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ResponseModal from 'Components/Shared/ResponseModal';
import { Input } from 'Components/Shared/Inputs';
import { addAdmin, getAdminsById, editAdmin } from 'Redux/Admins/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { handleDisplayToast } from '../../../Redux/Shared/ResponseToast/actions';
import { resetState } from '../../../Redux/Admins/actions';
import { useForm } from 'react-hook-form';
import adminSchema from '../../../Validations/admin';
import { joiResolver } from '@hookform/resolvers/joi';

function AdminsForm() {
  const dispatch = useDispatch();
  const adminToUpdate = useSelector((state) => state.admins.data);
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
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(adminSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dni: '',
      phone: '',
      email: '',
      city: '',
      password: ''
    }
  });

  useEffect(() => {
    if (params.id) {
      getAdminsById(dispatch, params.id);
    }
  }, []);

  useEffect(() => {
    if (params.id) {
      setValue('firstName', adminToUpdate.firstName);
      setValue('lastName', adminToUpdate.lastName);
      setValue('dni', adminToUpdate.dni);
      setValue('phone', adminToUpdate.phone);
      setValue('email', adminToUpdate.email);
      setValue('city', adminToUpdate.city);
      setValue('password', adminToUpdate.password);
    }
  }, [adminToUpdate]);

  useEffect(() => {
    if (success) {
      history.push('/admins');
      dispatch(resetState());
    }
  }, [success]);

  const onSubmit = (data) => {
    if (params.id) {
      editAdmin(dispatch, params.id, data);
      setShowConfirmModal(false);
    } else {
      addAdmin(dispatch, data);
      setShowConfirmModal(false);
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

  console.log('error first name', errors.firstName);
  console.log('error last name', errors.lastName);

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>{params.id ? 'Edit Admin' : 'Add admin'}</h2>
        </div>
        <form className={styles.form}>
          <div className={styles.labelInput}>
            <Input
              labelText="First Name"
              name="firstName"
              type="text"
              error={errors.firstName?.message}
              register={register}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="Last Name"
              name="lastName"
              type="text"
              error={errors.lastName?.message}
              register={register}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="DNI"
              name="dni"
              type="text"
              error={errors.dni?.message}
              register={register}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="Phone"
              name="phone"
              type="text"
              error={errors.phone?.message}
              register={register}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="City"
              name="city"
              type="text"
              error={errors.city?.message}
              register={register}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="Email"
              name="email"
              type="text"
              error={errors.email?.message}
              register={register}
            />
          </div>
          <div className={styles.labelInput}>
            <Input
              labelText="Password"
              name="password"
              type="password"
              error={errors.password?.message}
              register={register}
            />
          </div>
          <Button classNameButton="deleteButton" action={reset} text="Reset" />
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
