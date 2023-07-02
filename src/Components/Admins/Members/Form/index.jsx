import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './form.module.css';

import { addMember, updateMember } from 'Redux/Members/thunks';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import memberSchema from 'Validations/member';

import { Input } from 'Components/Shared/Inputs';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ResponseModal from 'Components/Shared/ResponseModal';
import Button from 'Components/Shared/Button';

const MemberForm = ({ match }) => {
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const history = useHistory();
  let memberId = match.params.id;
  const members = useSelector((state) => state.members.data);

  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.members.redirect);
  const { show, message, state } = useSelector((state) => state.toast);
  const memberToEdit = members.find((member) => member._id === memberId);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
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
  });

  useEffect(() => {
    const getMember = async () => {
      try {
        setValue('name', memberToEdit.name);
        setValue('lastName', memberToEdit.lastName);
        setValue('dni', memberToEdit.dni);
        setValue('phone', memberToEdit.phone);
        setValue('email', memberToEdit.email);
        setValue('city', memberToEdit.city);
        setValue('dob', memberToEdit.dob.slice(0, 10));
        setValue('zip', memberToEdit.zip);
        setValue('isActive', memberToEdit.isActive);
        setValue('membership', memberToEdit.membership);
        setValue('password', memberToEdit.password);
      } catch (error) {
        dispatch(setContentToast({ message: error.message, state: 'fail' }));
        dispatch(handleDisplayToast(true));
      }
    };
    if (memberId) {
      getMember(memberId);
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
          <div className={styles.label_container}>
            <Input
              labelText="Name"
              type="text"
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Last Name"
              type="text"
              name="lastName"
              error={errors.lastName?.message}
              register={register}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="DNI"
              type="number"
              name="dni"
              error={errors.dni?.message}
              register={register}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Phone"
              type="text"
              name="phone"
              error={errors.phone?.message}
              register={register}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Email"
              type="string"
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="City"
              type="text"
              name="city"
              error={errors.city?.message}
              register={register}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Date of birth"
              type="date"
              name="dob"
              error={errors.dob?.message}
              register={register}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Zip code"
              type="number"
              name="zip"
              error={errors.zip?.message}
              register={register}
            />
          </div>
          <div className={styles.label_container}>
            <label className={styles.label}>Membership</label>
            <select className={styles.input} name="membership" {...register('membership')}>
              <option value="default">Choose your membership</option>
              <option value="classic">Classic</option>
              <option value="only_classes">Only Classes</option>
              <option value="black">Black</option>
            </select>
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Password"
              type="password"
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>
          <div className={`${styles.label_container} ${styles.checkbox}`}>
            <Input
              labelText="Is member active?"
              type="checkbox"
              name="isActive"
              register={register}
            />
          </div>
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
