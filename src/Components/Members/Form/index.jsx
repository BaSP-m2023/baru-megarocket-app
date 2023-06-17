import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './form.module.css';
import ConfirmModal from '../../Shared/ConfirmModal';
import ResponseModal from '../../Shared/ResponseModal';
import Button from '../../Shared/Button';
import { Input } from '../../Shared/Inputs';
import { addMember, updateMember, getMembers } from '../../../Redux/Members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { handleDisplayToast, setContentToast } from '../../../Redux/Shared/ResponseToast/actions';
import { useForm } from 'react-hook-form';

const MemberForm = ({ match }) => {
  const [fetchedMember, setFetchedMember] = useState({});
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const history = useHistory();
  let memberId = match.params.id;
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.members.redirect);
  const { show, message, state } = useSelector((state) => state.toast);

  useEffect(() => {
    getMembers(dispatch);
  }, [dispatch]);

  const {
    register,
    handleSubmit
    // watch,
    // formState: { errors }
  } = useForm({
    defaultValues: fetchedMember
  });

  useEffect(() => {
    const getMember = async (id) => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`);
        const { data } = await res.json();
        setFetchedMember({
          name: data.name,
          lastName: data.lastName,
          dni: data.dni,
          phone: data.phone,
          email: data.email,
          city: data.city,
          dob: data.dob,
          zip: data.zip,
          isActive: data.isActive,
          membership: data.membership,
          password: data.password
        });
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
    console.log(data);
    if (memberId) {
      updateMember(dispatch, memberId, data);
      setModalMessageOpen(false);
    } else {
      addMember(dispatch, data);
      setModalMessageOpen(false);
    }
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
            <Input labelText="Name" type="text" name="name" register={register} />
          </div>
          <div className={styles.label_container}>
            <Input labelText="Last Name" type="text" name="lastName" register={register} />
          </div>
          <div className={styles.label_container}>
            <Input labelText="DNI" type="number" name="dni" register={register} />
          </div>
          <div className={styles.label_container}>
            <Input labelText="Phone" type="text" name="phone" register={register} />
          </div>
          <div className={styles.label_container}>
            <Input labelText="Email" type="email" name="email" register={register} />
          </div>
          <div className={styles.label_container}>
            <Input labelText="City" type="text" name="city" register={register} />
          </div>
          <div className={styles.label_container}>
            <Input labelText="Date of birth" type="text" name="dob" register={register} />
          </div>
          <div className={styles.label_container}>
            <Input labelText="Zip code" type="number" name="zip" register={register} />
          </div>
          <div className={styles.label_container}>
            <label className={styles.label}>Membership</label>
            <select className={styles.input} name="membership" {...register('membership')}>
              <option value="placeholder">Select category</option>
              <option value="classic">Classic</option>
              <option value="only_classes">Only Classes</option>
              <option value="black">Black</option>
            </select>
          </div>
          <div className={styles.label_container}>
            <Input labelText="Password" type="password" name="password" register={register} />
          </div>
          <div className={`${styles.label_container} ${styles.checkbox}`}>
            <Input
              labelText="Is member active?"
              type="checkbox"
              name="isActive"
              register={register}
            />
          </div>
        </form>
        <div className={styles.confirm_button}>
          <Button
            classNameButton="addButton"
            action={() => setModalMessageOpen(true)}
            text={memberId ? 'Update' : 'Submit'}
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
            ? `Are you sure you wanna change this data?`
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
