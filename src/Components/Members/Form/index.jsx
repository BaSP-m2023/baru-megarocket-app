import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from 'Components/Members/Form/form.module.css';
import ConfirmModal from 'Components/Shared/ConfirmModal';
import ResponseModal from 'Components/Shared/ResponseModal';
import Button from 'Components/Shared/Button';
import { Input } from 'Components/Shared/Inputs';
import { addMember, updateMember } from 'Redux/Members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { handleDisplayToast, setContentToast } from 'Redux/Shared/ResponseToast/actions';
import { useForm } from 'react-hook-form';
import memberSchema from 'Validations/member';
import { joiResolver } from '@hookform/resolvers/joi';

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
    const getMember = async (id) => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`);
        const { data } = await res.json();
        setValue('name', data.name);
        setValue('lastName', data.lastName);
        setValue('dni', data.dni);
        setValue('phone', data.phone);
        setValue('email', data.email);
        setValue('city', data.city);
        setValue('dob', data.dob);
        setValue('zip', data.zip);
        setValue('isActive', data.isActive);
        setValue('membership', data.membership);
        setValue('password', data.password);
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
      history.push('/members');
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
        <div className={styles.header}>
          <h2>{memberId ? 'Edit a member' : 'Create a new member'}</h2>
          <span className={styles.close_button} onClick={() => history.push('/members')}>
            &times;
          </span>
        </div>
        <form className={styles.body}>
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
              type="text"
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
            <Button action={reset} text="Reset" />
          </div>
        </form>
        <div className={styles.container_button}>
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
