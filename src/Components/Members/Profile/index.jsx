import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from 'Components/Members/Profile/profile.module.css';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ResponseModal from 'Components/Shared/ResponseModal';
import Button from 'Components/Shared/Button';
import { Input } from 'Components/Shared/Inputs';
import { updateMember, getMembers } from 'Redux/Members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import memberSchema from 'Validations/member';

function MemberProfile({ match }) {
  const [disableEdit, setDisableEdit] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const history = useHistory();
  const memberId = match.params.id;
  const dispatch = useDispatch();
  const { show, message, state } = useSelector((state) => state.toast);
  const memberData = useSelector((state) => state.members.data);
  const memberLogged = memberData.find((item) => item._id === memberId);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(memberSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      lastName: '',
      dni: '',
      phone: '',
      email: '',
      city: '',
      dob: '',
      zip: '',
      isActive: '',
      membership: 'default',
      password: ''
    }
  });

  useEffect(() => {
    if (errors) {
      setShowConfirmModal(false);
    }
  }, [errors]);

  useEffect(() => {
    getMembers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (memberLogged) {
      // eslint-disable-next-line no-unused-vars
      const { _id, __v, ...resMemberLogged } = memberLogged;
      Object.entries(resMemberLogged).every(([key, value]) => {
        setValue(key, value);
        return true;
      });
    }
  }, [memberLogged]);

  const onSubmit = (data) => {
    if (memberId) {
      setShowConfirmModal(false);
      updateMember(dispatch, memberId, data, history)
        .then((data) => {
          if (data) {
            Object.entries(data).every(([key, value]) => {
              localStorage.setItem(key, value);
              return true;
            });
          }
        })
        .catch((error) => {
          dispatch(setContentToast({ message: error.message, state: 'fail' }));
          dispatch(handleDisplayToast(true));
        });
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    reset();
  };

  const handleEnableEdit = () => {
    setDisableEdit(false);
  };

  const handleDisableEdit = () => {
    setDisableEdit(true);
  };

  const formFields = [
    { labelText: 'Name', type: 'text', name: 'name' },
    { labelText: 'LastName', type: 'text', name: 'lastName' },
    { labelText: 'DNI', type: 'number', name: 'dni' },
    { labelText: 'Phone', type: 'text', name: 'phone' },
    { labelText: 'Email', type: 'email', name: 'email' },
    { labelText: 'City', type: 'text', name: 'city' },
    { labelText: 'Date of birth', type: 'text', name: 'dob' },
    { labelText: 'Zip code', type: 'number', name: 'zip' },
    { labelText: 'Password', type: 'password', name: 'password' }
  ];

  return (
    <div className={styles.form}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>
            {disableEdit
              ? `${memberLogged?.name} ${memberLogged?.lastName} Profile`
              : 'Edit Profile'}
          </h2>
          {disableEdit && (
            <Button
              classNameButton="addButton"
              action={handleEnableEdit}
              img={`${process.env.PUBLIC_URL}/assets/images/edit-icon-white.png`}
            />
          )}
          {!disableEdit && (
            <button className={styles.close_button} onClick={handleDisableEdit}>
              &times;
            </button>
          )}
        </div>
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
        <div className={styles.buttons}>
          <Button
            classNameButton="addButton"
            action={() => setShowConfirmModal(true)}
            text={'Edit'}
            disabled={disableEdit}
          />
          <Button
            classNameButton="deleteButton"
            action={handleReset}
            text={'Reset'}
            disabled={disableEdit}
          >
            Reset
          </Button>
        </div>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          title={memberId ? 'Edit member' : 'Add Member'}
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

export default MemberProfile;
