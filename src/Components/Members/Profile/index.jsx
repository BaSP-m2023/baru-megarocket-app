import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, useController } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './profile.module.css';

import { updateMember, getMembers } from 'Redux/Members/thunks';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import memberUpdate from 'Validations/memberUpdate';
import { updateUser } from 'Redux/Auth/actions';

import { Input } from 'Components/Shared/Inputs';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ResponseModal from 'Components/Shared/ResponseModal';
import { Button, Reset } from 'Components/Shared/Button';

function MemberProfile({ match }) {
  const dispatch = useDispatch();
  const [disableEdit, setDisableEdit] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [updated, setUpdated] = useState(false);
  const history = useHistory();
  const memberId = match.params.id;
  const redirect = useSelector((state) => state.members.redirect);
  const { show, message, state } = useSelector((state) => state.toast);
  const memberLogged = useSelector((state) => state.auth.user || '');
  const { data: members } = useSelector((state) => state.members);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(memberUpdate),
    mode: 'onChange',
    defaultValues: {
      name: memberLogged?.name,
      lastName: memberLogged?.lastName,
      dni: memberLogged?.dni,
      phone: memberLogged?.phone,
      city: memberLogged?.city,
      avatar: memberLogged?.avatar,
      dob: memberLogged?.dob,
      zip: memberLogged?.zip,
      membership: memberLogged?.membership,
      isActive: memberLogged?.isActive
    }
  });

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  useEffect(() => {
    if (redirect) {
      history.push('/user/member/activities');
    }
  }, []);

  useEffect(() => {
    const memberUpdated = members && members?.find((mem) => mem._id === memberLogged._id);
    setValue('name', memberUpdated ? memberUpdated.name : memberLogged.name);
    setValue('lastName', memberUpdated ? memberUpdated.lastName : memberLogged.lastName);
    setValue('dni', memberUpdated ? memberUpdated.dni : memberLogged.dni);
    setValue('avatar', memberUpdated ? memberUpdated.avatar : memberLogged.avatar);
    setValue('phone', memberUpdated ? memberUpdated.phone : memberLogged.phone);
    setValue('city', memberUpdated ? memberUpdated.city : memberLogged.city);
    setValue(
      'dob',
      memberUpdated ? memberUpdated?.dob?.slice(0, 10) : memberLogged?.dob?.slice(0, 10)
    );
    setValue('zip', memberUpdated ? memberUpdated.zip : memberLogged.zip);
  }, [updated, memberLogged]);

  useEffect(() => {
    if (memberLogged) {
      // eslint-disable-next-line no-unused-vars
      const { _id, firebaseUid, email, __v, dob, ...resMemberLogged } = memberLogged;
      Object.entries(resMemberLogged).every(([key, value]) => {
        setValue(key, value);
        return true;
      });
      setValue('dob', dob.slice(0, 10));
    }
  }, [memberLogged, handleSubmit]);

  const onSubmit = (data) => {
    if (memberId) {
      setShowConfirmModal(false);
      dispatch(updateMember(memberId, data))
        .then(() => {
          resetData();
          dispatch(updateUser({ avatar: data.avatar, name: data.name, lastName: data.lastName }));
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
    if (memberLogged) {
      // eslint-disable-next-line no-unused-vars
      const { _id, firebaseUid, email, __v, dob, ...resMemberLogged } = memberLogged;
      Object.entries(resMemberLogged).every(([key, value]) => {
        setValue(key, value);
        return true;
      });
      setValue('dob', dob.slice(0, 10));
    }
  };
  const handleReset = () => {
    reset();
    if (memberLogged) {
      // eslint-disable-next-line no-unused-vars
      const { _id, firebaseUid, email, __v, dob, ...resMemberLogged } = memberLogged;
      Object.entries(resMemberLogged).every(([key, value]) => {
        setValue(key, value);
        return true;
      });
      setValue('dob', dob.slice(0, 10));
    }
  };

  const onConfirm = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  const handleClose = () => {
    setDisableEdit(true);
    clearErrors();
  };
  const avatars = [
    { value: 'alien-bug' },
    { value: 'alien-kid' },
    { value: 'astrocat' },
    { value: 'astrodog' },
    { value: 'martian' },
    { value: 'giraffe' },
    { value: 'astrodog2' }
  ];
  const options = avatars.map((avatar) => ({
    value: avatar.value,
    label: (
      <div className={styles.formSelect}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/avatars/${avatar.value}.jpg`}
          className={styles.avatar}
        />
      </div>
    )
  }));
  const {
    field: { value: avatar, onChange: avatarsOnChange }
  } = useController({ name: 'avatar', control });

  const formFields = [
    { labelText: 'Name', type: 'text', name: 'name' },
    { labelText: 'Last name', type: 'text', name: 'lastName' },
    { labelText: 'DNI', type: 'number', name: 'dni' },
    { labelText: 'Phone', type: 'text', name: 'phone' },
    { labelText: 'City', type: 'text', name: 'city' },
    { labelText: 'Date of birth', type: 'date', name: 'dob' },
    { labelText: 'Zip code', type: 'number', name: 'zip' }
  ];
  return (
    <section className={styles.section}>
      <div className={styles.formContainer}>
        <div className={styles.content}>
          <div className={styles.formTitle}>
            <h2>
              {disableEdit
                ? `${memberLogged?.name} ${memberLogged?.lastName} Profile`
                : 'Edit Profile'}
            </h2>
            <div className={styles.editButton}>
              {disableEdit && (
                <Button
                  classNameButton="addButton"
                  action={() => setDisableEdit(false)}
                  img={`${process.env.PUBLIC_URL}/assets/images/edit-icon-white.png`}
                />
              )}
            </div>
            {!disableEdit && (
              <span className={styles.closeButton} onClick={handleClose}>
                &times;
              </span>
            )}
          </div>
          <form onSubmit={handleSubmit(onConfirm)} className={styles.form}>
            <div>
              <div className={styles.formGroup}>
                {!disableEdit ? (
                  <Select
                    defaultValue={memberLogged?.avatar ? memberLogged?.avatar : ''}
                    className={styles.options}
                    placeholder="Select an avatar"
                    value={avatar ? options.find((t) => t.value === avatar) : avatar}
                    options={options}
                    onChange={(e) => avatarsOnChange(e.value)}
                  />
                ) : (
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/avatars/${avatar}.jpg`}
                    className={styles.avatar}
                  />
                )}
              </div>
              {formFields.map((inputData, index) => (
                <div className={styles.formGroup} key={index}>
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
                <Button classNameButton="addButton" text={'Confirm'} disabled={disableEdit} />
                <Button
                  classNameButton="cancelButton"
                  action={() => setDisableEdit(true)}
                  text="Cancel"
                />
                <Reset action={handleReset} />
              </div>
            )}
          </form>
          {disableEdit && (
            <div className={styles.buttons}>
              <Button
                classNameButton="addButton"
                action={() => setDisableEdit(false)}
                text="Edit"
              />
            </div>
          )}
        </div>
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
    </section>
  );
}

export default MemberProfile;
