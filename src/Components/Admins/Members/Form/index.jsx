import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './form.module.css';

import { addMember, updateMember } from 'Redux/Members/thunks';
import { handleDisplayToast } from 'Redux/Shared/ResponseToast/actions';
import { getMembers } from 'Redux/Members/thunks';
import memberSchema from 'Validations/member';
import memberUpdate from 'Validations/memberUpdate';

import { Input } from 'Components/Shared/Inputs';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ResponseModal from 'Components/Shared/ResponseModal';
import Button from 'Components/Shared/Button';

const MemberForm = ({ match }) => {
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
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
        resolver: joiResolver(memberSchema),
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
      })
    : useForm({
        mode: 'onChange',
        resolver: joiResolver(memberUpdate),
        defaultValues: {
          name: '',
          lastName: '',
          dni: '',
          phone: '',
          city: '',
          dob: '',
          zip: '',
          isActive: '',
          membership: 'default'
        }
      });

  useEffect(() => {
    if (memberId) {
      getMembers(dispatch).then((data) => {
        const member = data.find((item) => item._id === memberId);
        // eslint-disable-next-line no-unused-vars
        const { _id, firebaseUid, email, __v, dob, ...resMember } = member;
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
    if (memberId) {
      updateMember(dispatch, memberId, data);
      setModalMessageOpen(false);
    } else {
      addMember(dispatch, data);
      setModalMessageOpen(false);
    }
  };

  const handleModal = () => {
    setModalMessageOpen(true);
  };

  const formCreate = [
    { labelText: 'First Name', name: 'name', type: 'text' },
    { labelText: 'Last Name', name: 'lastName', type: 'text' },
    { labelText: 'ID', name: 'dni', type: 'number' },
    { labelText: 'Phone', name: 'phone', type: 'text' },
    { labelText: 'City', name: 'city', type: 'text' },
    { labelText: 'Zip', name: 'zip', type: 'number' },
    { labelText: 'Email', name: 'email', type: 'email' },
    { labelText: 'Password', name: 'password', type: 'password' },
    { labelText: 'Date of birth', name: 'dob', type: 'date' },
    { labelText: 'Is member active?', name: 'isActive', type: 'checkbox' }
  ];

  const formEdit = [
    { labelText: 'First Name', name: 'name', type: 'text' },
    { labelText: 'Last Name', name: 'lastName', type: 'text' },
    { labelText: 'ID', name: 'dni', type: 'number' },
    { labelText: 'Phone', name: 'phone', type: 'text' },
    { labelText: 'City', name: 'city', type: 'text' },
    { labelText: 'Zip', name: 'zip', type: 'number' },
    { labelText: 'Date of birth', name: 'dob', type: 'date' },
    { labelText: 'Is member active?', name: 'isActive', type: 'checkbox' }
  ];

  return (
    <div className={styles.form}>
      <div className={styles.content}>
        <div className={styles.header} data-testid="members-form-title-container">
          <h2>{memberId ? 'Edit a member' : 'Create a new member'}</h2>
          <span className={styles.close_button} onClick={() => history.push('/user/admin/members')}>
            &times;
          </span>
        </div>
        <form className={styles.body} data-testid="members-form-container">
          {!memberId
            ? formCreate.map((field) => (
                <div key={field.name}>
                  <Input
                    labelText={field.labelText}
                    name={field.name}
                    type={field.type}
                    register={register}
                    error={errors[field.name]?.message}
                  />
                </div>
              ))
            : formEdit.map((field) => (
                <div className={styles.flex} key={field.name}>
                  <Input
                    labelText={field.labelText}
                    name={field.name}
                    type={field.type}
                    register={register}
                    error={errors[field.name]?.message}
                  />
                </div>
              ))}
          <label className={styles.label}>Membership</label>
          <select className={styles.input} name="membership" {...register('membership')}>
            <option value="default">Choose your membership</option>
            <option value="classic">Classic</option>
            <option value="only_classes">Only Classes</option>
            <option value="black">Black</option>
          </select>
          <div className={styles.reset_button}>
            <Button action={reset} text="Reset" classNameButton="deleteButton" />
          </div>
        </form>
        <div className={styles.container_button} data-testid="members-form-button">
          <Button
            classNameButton="addButton"
            action={handleSubmit(handleModal)}
            text={memberId ? 'Edit' : 'Submit'}
          />
        </div>
      </div>
      {modalMessageOpen && (
        <ConfirmModal
          title={memberId ? 'Edit member' : 'Add Member'}
          handler={() => setModalMessageOpen(false)}
          onAction={handleSubmit(onSubmit)}
          reason={'submit'}
        >
          {memberId
            ? `Are you sure you wanna edit this data?`
            : `Are you sure you wanna add to the members list?`}
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
