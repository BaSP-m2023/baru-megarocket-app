import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import { Input } from '../../Shared/Inputs';
import ConfirmModal from '../../Shared/ConfirmModal';
import ResponseModal from '../../Shared/ResponseModal';
import { useDispatch, useSelector } from 'react-redux';
import { addSuperadmin, editSuperadmin, getSuperadmins } from '../../../Redux/SuperAdmins/thunks';
import { handleDisplayToast } from '../../../Redux/Shared/ResponseToast/actions';
import { useForm } from 'react-hook-form';
import superAdminSchema from 'Validations/superAdmin';
import { joiResolver } from '@hookform/resolvers/joi';

const SuperAdminsForm = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { show, message, state } = useSelector((state) => state.toast);
  const superadmins = useSelector((state) => state.superadmins.superadmins);
  const dispatch = useDispatch();

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getSuperadmins(dispatch);
    const findById = async () => {
      const superadmin = superadmins?.find((superadmin) => superadmin._id === id);
      const { name, lastName, email, password } = superadmin;
      setValue('name', name);
      setValue('lastName', lastName);
      setValue('email', email);
      setValue('password', password);
    };
    if (id) {
      findById();
    }
  }, [dispatch, superadmins]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(superAdminSchema),
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      password: ''
    }
  });

  const goBack = () => {
    history.push('/super-admins');
  };

  const onSubmit = (data) => {
    if (id) {
      dispatch(editSuperadmin(id, data, goBack));
      setShowConfirm(false);
    } else {
      dispatch(addSuperadmin(data, goBack));
      setShowConfirm(false);
    }
  };

  return (
    <>
      {show && (
        <ResponseModal
          state={state}
          message={message}
          handler={() => dispatch(handleDisplayToast(false))}
        />
      )}
      {showConfirm && (
        <ConfirmModal
          title={id ? 'Edit superadmin' : 'New superadmin'}
          reason={'submit'}
          handler={() => setShowConfirm(false)}
          onAction={handleSubmit(onSubmit)}
        >
          {id
            ? 'Are you sure you want to edit this superadmin?'
            : 'Are you sure you want to add this superadmin?'}
        </ConfirmModal>
      )}
      <div className={styles.formBackground}>
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>{id ? 'Edit superadmin' : 'Create superadmin'}</h3>
            <button className={styles.close} onClick={goBack}>
              X
            </button>
          </div>
          <div>
            <form className={styles.form}>
              <Input
                labelText={'Name'}
                name={'name'}
                error={errors.name?.message}
                register={register}
              />
              <Input
                labelText={'Last name'}
                name={'lastName'}
                error={errors.lastName?.message}
                register={register}
              />
              <Input
                labelText={'Email'}
                name={'email'}
                error={errors.email?.message}
                register={register}
              />
              <Input
                labelText={'Password'}
                type={'password'}
                name={'password'}
                error={errors.password?.message}
                register={register}
              />
              <Button classNameButton="deleteButton" action={reset} text="Reset" />
            </form>
            <Button
              text={'Submit'}
              action={() => setShowConfirm(true)}
              classNameButton={'submitButton'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminsForm;
