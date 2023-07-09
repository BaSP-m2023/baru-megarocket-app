import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './profile.module.css';

import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import { getAdmins, editAdmin } from 'Redux/Admins/thunks';
import adminUpdate from 'Validations/adminUpdate';

import { Input } from 'Components/Shared/Inputs';
import Button from 'Components/Shared/Button';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ResponseModal from 'Components/Shared/ResponseModal';
import { updateUser } from 'Redux/Auth/actions';
import { useHistory } from 'react-router-dom';

function AdminProfile({ match }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [disableEdit, setDisableEdit] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [updated, setUpdated] = useState(false);
  const AdminId = match.params.id;
  const redirect = useSelector((state) => state.admins.redirect);
  const { show, message, state } = useSelector((state) => state.toast);
  const defaultAdmin = useSelector((state) => state.auth.user || '');
  const { data: admins } = useSelector((state) => state.admins);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(adminUpdate),
    mode: 'onChange',
    defaultValues: {
      firstName: defaultAdmin.firstName,
      lastName: defaultAdmin.lastName,
      dni: defaultAdmin.dni,
      phone: defaultAdmin.phone,
      city: defaultAdmin.city
    }
  });

  useEffect(() => {
    dispatch(getAdmins());
  }, [dispatch]);

  useEffect(() => {
    if (redirect) {
      history.push('/user/admin/home');
    }
  }, [redirect]);

  useEffect(() => {
    const adminUpdated = admins && admins?.find((ad) => ad._id === defaultAdmin._id);
    setValue('firstName', adminUpdated ? adminUpdated.firstName : defaultAdmin.firstName);
    setValue('lastName', adminUpdated ? adminUpdated.lastName : defaultAdmin.lastName);
    setValue('dni', adminUpdated ? adminUpdated.dni : defaultAdmin.dni);
    setValue('phone', adminUpdated ? adminUpdated.phone : defaultAdmin.phone);
    setValue('city', adminUpdated ? adminUpdated.city : defaultAdmin.city);
  }, [updated, defaultAdmin]);

  const onSubmit = (data) => {
    if (AdminId) {
      setShowConfirmModal(false);
      dispatch(editAdmin(AdminId, data))
        .then(() => {
          resetData();
          dispatch(updateUser({ firstName: data.firstName, lastName: data.lastName }));
          setUpdated(!updated);
          setDisableEdit(true);
        })
        .catch((error) => {
          dispatch(setContentToast({ message: error.message, state: 'fail' }));
          dispatch(handleDisplayToast(true));
        });
    }
  };

  const resetData = () => {
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

  const handleReset = (e) => {
    e.preventDefault();

    if (defaultAdmin) {
      // eslint-disable-next-line no-unused-vars
      const { _id, firebaseUid, email, __v, dob, ...resDefaultAdmin } = defaultAdmin;
      Object.entries(resDefaultAdmin).every(([key, value]) => {
        setValue(key, value);
        return true;
      });
    }
  };

  /*   const handleClose = () => {
    setDisableEdit(true);
    clearErrors();
  }; */

  const onConfirm = () => {
    setShowConfirmModal(true);
  };

  console.log(showConfirmModal);

  const formFields = [
    { labelText: 'Name', type: 'text', name: 'firstName' },
    { labelText: 'Last Name', type: 'text', name: 'lastName' },
    { labelText: 'DNI', type: 'number', name: 'dni' },
    { labelText: 'Phone', type: 'text', name: 'phone' },
    { labelText: 'City', type: 'text', name: 'city' }
  ];

  return (
    <div className={styles.form}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>
            {disableEdit
              ? `${defaultAdmin?.firstName} ${defaultAdmin?.lastName} Profile`
              : 'Edit Profile'}
          </h2>
          {disableEdit && (
            <Button
              classNameButton="addButton"
              action={() => setDisableEdit(false)}
              img={`${process.env.PUBLIC_URL}/assets/images/edit-icon-white.png`}
            />
          )}
          {!disableEdit && (
            <button className={styles.close_button} onClick={() => setDisableEdit(true)}>
              &times;
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit(onConfirm)} className={styles.body}>
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
          {!disableEdit && (
            <div className={styles.buttons}>
              <Button
                classNameButton="addButton"
                text={'Confirm'}
                action={() => setShowConfirmModal(true)}
              />
              <Button
                classNameButton="cancelButton"
                action={() => setDisableEdit(true)}
                text="Cancel"
              />
              <Button classNameButton="deleteButton" action={handleReset} text={'Reset'} />
            </div>
          )}
        </form>
        {disableEdit && (
          <div className={styles.buttons}>
            <Button classNameButton="addButton" action={() => setDisableEdit(false)} text="Edit" />
          </div>
        )}
      </div>
      {showConfirmModal && (
        <ConfirmModal
          title={'Edit my Profile'}
          handler={() => setShowConfirmModal(false)}
          onAction={handleSubmit(onSubmit)}
          reason={'submit'}
        >
          {`Are you sure you wanna edit?`}
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
