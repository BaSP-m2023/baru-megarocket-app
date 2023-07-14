import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './form.module.css';

import { updateMember } from 'Redux/Members/thunks';
import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';
import { getMembers } from 'Redux/Members/thunks';
import memberSchema from 'Validations/member';
import memberUpdate from 'Validations/memberUpdate';

import { Input } from 'Components/Shared/Inputs';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ResponseModal from 'Components/Shared/ResponseModal';
import { Button, Reset } from 'Components/Shared/Button';

const MemberForm = ({ match }) => {
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState([]);
  const history = useHistory();
  let memberId = match.params.id;
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.members.redirect);
  const { show, message, state } = useSelector((state) => state.toast);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = !memberId
    ? useForm({
        mode: 'onChange',
        resolver: joiResolver(memberSchema)
      })
    : useForm({
        mode: 'onChange',
        resolver: joiResolver(memberUpdate)
      });
  const handleReset = () => {
    const defaultValues = !memberId
      ? {
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
      : {
          name: memberToEdit ? memberToEdit.name : '',
          lastName: memberToEdit ? memberToEdit.lastName : '',
          dni: memberToEdit ? memberToEdit.dni : '',
          phone: memberToEdit ? memberToEdit.phone : '',
          city: memberToEdit ? memberToEdit.city : '',
          dob: memberToEdit ? memberToEdit.dob : '',
          zip: memberToEdit ? memberToEdit.zip : '',
          isActive: memberToEdit ? memberToEdit.isActive : '',
          membership: memberToEdit ? memberToEdit.membership : 'default'
        };

    reset(defaultValues);
  };

  useEffect(() => {
    if (memberId) {
      dispatch(getMembers()).then((data) => {
        const member = data.find((item) => item._id === memberId);
        // eslint-disable-next-line no-unused-vars
        const { _id, firebaseUid, email, __v, dob, password, ...resMember } = member;
        setMemberToEdit({ ...resMember, dob: dob.slice(0, 10) });
        Object.entries(resMember).every(([key, value]) => {
          setValue(key, value);
          return true;
        });
        setValue('dob', dob.slice(0, 10));
      });
    }
  }, []);

  useEffect(() => {
    if (redirect) {
      history.push('/user/admin/members');
    }
  }, [redirect]);

  const onSubmit = (data) => {
    dispatch(updateMember(memberId, data));
    setModalMessageOpen(false);
  };

  const handleModal = () => {
    setModalMessageOpen(true);
  };

  const formEdit = [
    { labelText: 'First Name', name: 'name', type: 'text' },
    { labelText: 'Last Name', name: 'lastName', type: 'text' },
    { labelText: 'ID', name: 'dni', type: 'number' },
    { labelText: 'Phone', name: 'phone', type: 'text' },
    { labelText: 'City', name: 'city', type: 'text' },
    { labelText: 'Zip', name: 'zip', type: 'number' },
    { labelText: 'Date of birth', name: 'dob', type: 'date' }
  ];

  return (
    <div className={styles.formContainer}>
      <div className={styles.formTitle} data-testid="members-form-title-container">
        <h2>{memberId ? 'Edit a member' : 'Create a new member'}</h2>
        <span className={styles.closeButton} onClick={() => history.push('/user/admin/members')}>
          &times;
        </span>
      </div>
      <div className={styles.content}>
        <div className={styles.title} data-testid="members-form-title-container">
          <h2>Edit a member</h2>
          <span className={styles.closeButton} onClick={() => history.push('/user/admin/members')}>
            &times;
          </span>
        </div>
        <form className={styles.form} data-testid="members-form-container">
          {formEdit.map((field) => (
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
        </form>
        <div className={styles.container_button} data-testid="members-form-button">
          <Button
            action={() => history.push('/user/admin/members')}
            text={'Cancel'}
            classNameButton={'cancelButton'}
          />
          <Button classNameButton="addButton" action={handleSubmit(handleModal)} text={'Edit'} />
        </div>
        <Reset action={handleReset} />
      </div>
      {modalMessageOpen && (
        <ConfirmModal
          title={'Edit member'}
          handler={() => setModalMessageOpen(false)}
          onAction={handleSubmit(onSubmit)}
          reason={'submit'}
        >
          Are you sure you wanna edit this data?
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
};

export default MemberForm;
